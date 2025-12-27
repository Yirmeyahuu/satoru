from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from firebase_config import get_firestore_client, get_storage_bucket
from .huggingface_service import huggingface_service
import uuid
import threading
from datetime import datetime
import os

db = get_firestore_client()
bucket = get_storage_bucket()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_document(request):
    """Upload and process a document"""
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    file = request.FILES['file']
    user = request.user
    
    # Validate file type
    if not file.name.endswith('.pdf'):
        return Response({'error': 'Only PDF files are supported'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Validate file size (10MB max)
    if file.size > 10 * 1024 * 1024:
        return Response({'error': 'File too large (max 10MB)'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Generate document ID
        doc_id = str(uuid.uuid4())
        
        # Upload to Firebase Storage
        blob = bucket.blob(f'documents/{user["uid"]}/{doc_id}/{file.name}')
        blob.upload_from_file(file, content_type='application/pdf')
        blob.make_public()
        
        file_url = blob.public_url
        
        # Create document in Firestore
        doc_data = {
            'id': doc_id,
            'user_id': user['uid'],
            'user_email': user['email'],
            'title': file.name,
            'file_url': file_url,
            'file_name': file.name,
            'file_size': file.size,
            'status': 'processing',
            'pages': 0,
            'created_at': datetime.utcnow(),
            'processed_at': None
        }
        
        db.collection('documents').document(doc_id).set(doc_data)
        
        # Process in background
        thread = threading.Thread(target=process_document_background, args=(doc_id, file_url))
        thread.daemon = True
        thread.start()
        
        return Response({
            'message': 'Document uploaded successfully',
            'document': doc_data
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def process_document_background(doc_id, file_url):
    """Process document in background"""
    try:
        # Download PDF temporarily
        import requests
        temp_file = f'/tmp/{doc_id}.pdf'
        
        response = requests.get(file_url)
        with open(temp_file, 'wb') as f:
            f.write(response.content)
        
        # Extract text
        text, page_count = huggingface_service.extract_text_from_pdf(temp_file)
        
        # Generate summary
        summary_data = huggingface_service.generate_summary(text)
        
        # Generate flashcards
        flashcards_data = huggingface_service.generate_flashcards(text, count=20)
        
        # Update document in Firestore
        doc_ref = db.collection('documents').document(doc_id)
        doc_ref.update({
            'status': 'completed',
            'pages': page_count,
            'processed_at': datetime.utcnow(),
            'extracted_text': text[:5000]  # Store first 5000 chars
        })
        
        # Save summary
        db.collection('summaries').document(doc_id).set({
            'document_id': doc_id,
            'summary': summary_data.get('summary', ''),
            'key_points': summary_data.get('key_points', []),
            'insights': summary_data.get('insights', []),
            'examples': summary_data.get('examples', []),
            'created_at': datetime.utcnow()
        })
        
        # Save flashcards
        batch = db.batch()
        for idx, card in enumerate(flashcards_data):
            card_ref = db.collection('flashcards').document()
            batch.set(card_ref, {
                'document_id': doc_id,
                'question': card['question'],
                'answer': card['answer'],
                'difficulty': card.get('difficulty', 'medium'),
                'order': idx,
                'created_at': datetime.utcnow()
            })
        batch.commit()
        
        # Clean up temp file
        os.remove(temp_file)
        
        print(f"✓ Document {doc_id} processed successfully")
        
    except Exception as e:
        print(f"✗ Error processing document {doc_id}: {str(e)}")
        db.collection('documents').document(doc_id).update({
            'status': 'failed',
            'error': str(e)
        })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_documents(request):
    """Get user's documents"""
    user = request.user
    
    try:
        docs = db.collection('documents')\
            .where('user_id', '==', user['uid'])\
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
        if doc_data['user_id'] != user['uid']:
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
        
        if doc_data['user_id'] != user['uid']:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        
        # Delete from Storage
        file_path = f"documents/{user['uid']}/{doc_id}/"
        blobs = bucket.list_blobs(prefix=file_path)
        for blob in blobs:
            blob.delete()
        
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