from rest_framework import serializers
from .models import Document, DocumentSummary, Flashcard, FlashcardSet


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'question', 'answer', 'difficulty', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']


class FlashcardSetSerializer(serializers.ModelSerializer):
    flashcards = FlashcardSerializer(many=True, read_only=True, source='document.flashcards')
    
    class Meta:
        model = FlashcardSet
        fields = ['id', 'name', 'card_count', 'is_active', 'created_at', 'flashcards']
        read_only_fields = ['id', 'created_at']


class DocumentSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentSummary
        fields = [
            'id', 'content', 'key_points', 'insights', 
            'examples', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class DocumentSerializer(serializers.ModelSerializer):
    summary = DocumentSummarySerializer(read_only=True)
    flashcards = FlashcardSerializer(many=True, read_only=True)
    flashcard_count = serializers.SerializerMethodField()
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = [
            'id', 'title', 'file', 'file_url', 'file_size', 'pages',
            'status', 'uploaded_at', 'processed_at', 'updated_at',
            'summary', 'flashcards', 'flashcard_count'
        ]
        read_only_fields = [
            'id', 'file_size', 'pages', 'status', 
            'uploaded_at', 'processed_at', 'updated_at'
        ]
    
    def get_flashcard_count(self, obj):
        return obj.flashcards.count()
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None


class DocumentListSerializer(serializers.ModelSerializer):
    """Lighter serializer for listing documents"""
    flashcard_count = serializers.SerializerMethodField()
    has_summary = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = [
            'id', 'title', 'pages', 'status', 
            'uploaded_at', 'flashcard_count', 'has_summary'
        ]
    
    def get_flashcard_count(self, obj):
        return obj.flashcards.count()
    
    def get_has_summary(self, obj):
        return hasattr(obj, 'summary')


class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['file', 'title']
    
    def validate_file(self, value):
        # Validate file type
        if not value.name.endswith('.pdf'):
            raise serializers.ValidationError('Only PDF files are allowed')
        
        # Validate file size (max 10MB)
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError('File size cannot exceed 10MB')
        
        return value