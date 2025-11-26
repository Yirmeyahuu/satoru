from django.contrib import admin
from .models import Document, DocumentSummary, Flashcard, FlashcardSet


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'status', 'pages', 'uploaded_at']
    list_filter = ['status', 'uploaded_at']
    search_fields = ['title', 'user__email']
    readonly_fields = ['uploaded_at', 'processed_at', 'updated_at']


@admin.register(DocumentSummary)
class DocumentSummaryAdmin(admin.ModelAdmin):
    list_display = ['document', 'created_at']
    search_fields = ['document__title']


@admin.register(Flashcard)
class FlashcardAdmin(admin.ModelAdmin):
    list_display = ['document', 'question', 'difficulty', 'order']
    list_filter = ['difficulty', 'document']
    search_fields = ['question', 'answer', 'document__title']


@admin.register(FlashcardSet)
class FlashcardSetAdmin(admin.ModelAdmin):
    list_display = ['name', 'document', 'card_count', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']