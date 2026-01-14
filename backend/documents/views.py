from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from firebase_config import get_firestore_client
from .huggingface_service import huggingface_service
import uuid
from datetime import datetime
import os
import tempfile
import PyPDF2

db = get_firestore_client()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_document(request):
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    file = request.FILES['file']
    user = request.user

    # Validate file type
    if not file.name.endswith('.pdf'):
        return Response({'error': 'Only PDF files are supported'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate file size (max 10MB)
    if file.size > 10 * 1024 * 1024:
        return Response({'error': 'File size must be less than 10MB'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Save file temporarily
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        for chunk in file.chunks():
            temp_file.write(chunk)
        temp_file.close()
        
        print(f"Saved temporary file: {temp_file.name}")
        
        # Extract text and page count
        text, page_count = huggingface_service.extract_text_from_pdf(temp_file.name)
        
        # Generate summary from FILE (not just text)
        print("Generating summary...")
        summary_data = huggingface_service.generate_summary_from_file(temp_file.name)
        
        # Generate reviewer from FILE (NEW)
        print("Generating reviewer...")
        try:
            reviewer_data = huggingface_service.generate_reviewer(temp_file.name)
        except Exception as reviewer_error:
            print(f"WARNING: Failed to generate reviewer: {str(reviewer_error)}")
            reviewer_data = None
        
        # Generate flashcards from extracted text
        print("Generating flashcards...")
        flashcards_data = huggingface_service.generate_flashcards(text, count=20)

        # Create document data
        doc_id = str(uuid.uuid4())
        doc_data = {
            "id": doc_id,
            "user_id": user.uid,
            "user_email": user.email,
            "title": file.name,
            "file_name": file.name,
            "file_size": file.size,
            "status": "completed",
            "pages": page_count,
            "created_at": datetime.utcnow(),
            "processed_at": datetime.utcnow(),
        }

        # Save document to Firestore
        print(f"Saving document {doc_id} to Firestore...")
        db.collection('documents').document(doc_id).set(doc_data)

        # Save summary to Firestore
        print("Saving summary to Firestore...")
        db.collection('summaries').document(doc_id).set({
            'summary': summary_data.get('summary', ''),
            'key_points': summary_data.get('key_points', []),
            'insights': summary_data.get('insights', []),
            'examples': summary_data.get('examples', []),
            'document_id': doc_id,
            'created_at': datetime.utcnow(),
        })

        # Save reviewer to Firestore (NEW)
        if reviewer_data:
            print("Saving reviewer to Firestore...")
            db.collection('reviewers').document(doc_id).set({
                'title': reviewer_data.get('title', file.name),
                'overview': reviewer_data.get('overview', ''),
                'sections': reviewer_data.get('sections', []),
                'key_takeaways': reviewer_data.get('key_takeaways', []),
                'document_id': doc_id,
                'created_at': datetime.utcnow(),
            })
        else:
            print("Skipping reviewer save (generation failed)")

        # Save flashcards to Firestore
        print(f"Saving {len(flashcards_data)} flashcards to Firestore...")
        for i, card in enumerate(flashcards_data):
            db.collection('flashcards').add({
                'document_id': doc_id,
                'question': card['question'],
                'answer': card['answer'],
                'difficulty': card.get('difficulty', 'medium'),
                'order': i,
                'created_at': datetime.utcnow(),
            })

        # Clean up temp file
        os.unlink(temp_file.name)
        print("Document processing completed successfully!")

        return Response({
            'message': 'Document uploaded and processed successfully',
            'document': doc_data,
            'summary': summary_data,
            'reviewer': reviewer_data if reviewer_data else None,
            'flashcard_count': len(flashcards_data)
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"ERROR in upload_document: {str(e)}")
        import traceback
        traceback.print_exc()
        
        # Clean up temp file on error
        if 'temp_file' in locals():
            try:
                os.unlink(temp_file.name)
            except:
                pass
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_documents(request):
    """Get user's documents"""
    user = request.user
    
    try:
        docs = db.collection('documents')\
            .where('user_id', '==', user.uid)\
            .order_by('created_at', direction='DESCENDING')\
            .stream()
        
        documents = []
        for doc in docs:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id
            documents.append(doc_data)
        
        return Response({'documents': documents}, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_document(request, doc_id):
    """Get single document with summary and flashcards"""
    user = request.user
    
    try:
        # Get document
        doc = db.collection('documents').document(doc_id).get()
        
        if not doc.exists:
            return Response({'error': 'Document not found'}, status=status.HTTP_404_NOT_FOUND)
        
        doc_data = doc.to_dict()
        
        # Check ownership
        if doc_data['user_id'] != user.uid:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        
        # Get summary
        summary_doc = db.collection('summaries').document(doc_id).get()
        summary_data = summary_doc.to_dict() if summary_doc.exists else None
        
        # Get flashcards
        flashcards = db.collection('flashcards')\
            .where('document_id', '==', doc_id)\
            .order_by('order')\
            .stream()
        
        flashcards_data = [f.to_dict() for f in flashcards]
        
        return Response({
            'document': doc_data,
            'summary': summary_data,
            'flashcards': flashcards_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_document(request, doc_id):
    """Delete document and related data"""
    user = request.user
    
    try:
        doc = db.collection('documents').document(doc_id).get()
        
        if not doc.exists:
            return Response({'error': 'Document not found'}, status=status.HTTP_404_NOT_FOUND)
        
        doc_data = doc.to_dict()
        
        if doc_data['user_id'] != user.uid:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        
        # Delete flashcards
        flashcards = db.collection('flashcards').where('document_id', '==', doc_id).stream()
        for card in flashcards:
            card.reference.delete()
        
        # Delete summary
        db.collection('summaries').document(doc_id).delete()
        
        # Delete document
        db.collection('documents').document(doc_id).delete()
        
        return Response({'message': 'Document deleted successfully'}, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)