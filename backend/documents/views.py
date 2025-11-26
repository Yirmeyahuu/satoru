from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import models
import os
import threading
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Document, DocumentSummary, Flashcard, FlashcardSet
from .serializers import (
    DocumentSerializer,
    DocumentListSerializer,
    DocumentUploadSerializer,
    DocumentSummarySerializer,
    FlashcardSerializer,
    FlashcardSetSerializer
)
from .gemini_service import gemini_service


class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for Document CRUD operations"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own documents
        return Document.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return DocumentListSerializer
        elif self.action == 'create':
            return DocumentUploadSerializer
        return DocumentSerializer
    
    def create(self, request, *args, **kwargs):
        """Upload a new document"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save document with processing status
        document = serializer.save(
            user=request.user,
            file_size=serializer.validated_data['file'].size,
            status='processing'
        )
        
        # Process document in background thread (non-blocking)
        thread = threading.Thread(target=self._process_document, args=(document.id,))
        thread.daemon = True
        thread.start()
        
        # Return the created document immediately
        output_serializer = DocumentSerializer(document, context={'request': request})
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
    
    def _process_document(self, document_id):
        """Process the uploaded document (runs in background)"""
        try:
            # Fetch document fresh from database
            document = Document.objects.get(id=document_id)
            
            # Extract text from PDF
            file_path = document.file.path
            extracted_text, page_count = gemini_service.extract_text_from_pdf(file_path)
            
            document.extracted_text = extracted_text
            document.pages = page_count
            document.save()
            
            # Generate summary
            summary_data = gemini_service.generate_summary(extracted_text)
            DocumentSummary.objects.create(
                document=document,
                content=summary_data.get('summary', ''),
                key_points=summary_data.get('key_points', []),
                insights=summary_data.get('insights', []),
                examples=summary_data.get('examples', [])
            )
            
            # Generate default flashcards (20 cards)
            flashcards_data = gemini_service.generate_flashcards(extracted_text, count=20)
            
            # Create flashcards
            flashcards = []
            for idx, card_data in enumerate(flashcards_data):
                flashcards.append(
                    Flashcard(
                        document=document,
                        question=card_data.get('question', ''),
                        answer=card_data.get('answer', ''),
                        difficulty=card_data.get('difficulty', 'medium'),
                        order=idx
                    )
                )
            
            Flashcard.objects.bulk_create(flashcards)
            
            # Create default flashcard set
            FlashcardSet.objects.create(
                document=document,
                name='Default Set',
                card_count=len(flashcards),
                is_active=True
            )
            
            # Mark as completed
            document.status = 'completed'
            document.processed_at = timezone.now()
            document.save()
            
            print(f"Document {document.id} processed successfully!")
            
            # Send WebSocket notification
            self._send_document_update(document)
            
        except Exception as e:
            print(f"Error processing document {document_id}: {str(e)}")
            try:
                document = Document.objects.get(id=document_id)
                document.status = 'failed'
                document.save()
                
                # Send WebSocket notification for failure
                self._send_document_update(document)
            except:
                pass

    def _send_document_update(self, document):
        """Send WebSocket notification to user"""
        try:
            channel_layer = get_channel_layer()
            user_group = f'user_{document.user.id}'
            
            # Serialize document data
            from .serializers import DocumentListSerializer
            serializer = DocumentListSerializer(document)
            
            async_to_sync(channel_layer.group_send)(
                user_group,
                {
                    'type': 'document_update',
                    'document': serializer.data
                }
            )
            print(f"WebSocket update sent for document {document.id}")
        except Exception as e:
            print(f"Error sending WebSocket update: {str(e)}")
    
    @action(detail=True, methods=['post'])
    def regenerate_flashcards(self, request, pk=None):
        """Regenerate flashcards with a different count"""
        document = self.get_object()
        
        if not document.extracted_text:
            return Response(
                {'error': 'Document has not been processed yet'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get card count from request (default: 20, min: 10, max: 40)
        card_count = request.data.get('count', 20)
        try:
            card_count = int(card_count)
            if card_count < 10 or card_count > 40:
                return Response(
                    {'error': 'Card count must be between 10 and 40'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except ValueError:
            return Response(
                {'error': 'Invalid card count'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Generate new flashcards
            flashcards_data = gemini_service.generate_flashcards(
                document.extracted_text, 
                count=card_count
            )
            
            # Delete old flashcards
            document.flashcards.all().delete()
            
            # Create new flashcards
            flashcards = []
            for idx, card_data in enumerate(flashcards_data):
                flashcards.append(
                    Flashcard(
                        document=document,
                        question=card_data.get('question', ''),
                        answer=card_data.get('answer', ''),
                        difficulty=card_data.get('difficulty', 'medium'),
                        order=idx
                    )
                )
            
            Flashcard.objects.bulk_create(flashcards)
            
            # Update flashcard set
            flashcard_set = document.flashcard_sets.first()
            if flashcard_set:
                flashcard_set.card_count = len(flashcards)
                flashcard_set.save()
            
            # Return new flashcards
            serializer = FlashcardSerializer(flashcards, many=True)
            return Response({
                'message': f'Generated {len(flashcards)} flashcards',
                'flashcards': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': f'Failed to regenerate flashcards: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def regenerate_summary(self, request, pk=None):
        """Regenerate document summary"""
        document = self.get_object()
        
        if not document.extracted_text:
            return Response(
                {'error': 'Document has not been processed yet'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Generate new summary
            summary_data = gemini_service.generate_summary(document.extracted_text)
            
            # Update or create summary
            summary, created = DocumentSummary.objects.update_or_create(
                document=document,
                defaults={
                    'content': summary_data.get('summary', ''),
                    'key_points': summary_data.get('key_points', []),
                    'insights': summary_data.get('insights', []),
                    'examples': summary_data.get('examples', [])
                }
            )
            
            serializer = DocumentSummarySerializer(summary)
            return Response({
                'message': 'Summary regenerated successfully',
                'summary': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': f'Failed to regenerate summary: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['get'])
    def summary(self, request, pk=None):
        """Get document summary"""
        document = self.get_object()
        
        if not hasattr(document, 'summary'):
            return Response(
                {'error': 'Summary not available yet'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = DocumentSummarySerializer(document.summary)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def flashcards(self, request, pk=None):
        """Get document flashcards"""
        document = self.get_object()
        flashcards = document.flashcards.all()
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def document_stats(request):
    """Get user's document statistics"""
    user = request.user
    
    total_documents = Document.objects.filter(user=user).count()
    completed_documents = Document.objects.filter(user=user, status='completed').count()
    total_flashcards = Flashcard.objects.filter(document__user=user).count()
    total_pages = Document.objects.filter(user=user, status='completed').aggregate(
        total=models.Sum('pages')
    )['total'] or 0
    
    return Response({
        'total_documents': total_documents,
        'completed_documents': completed_documents,
        'processing_documents': total_documents - completed_documents,
        'total_flashcards': total_flashcards,
        'total_pages_processed': total_pages
    })