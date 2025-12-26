import type { Document, DocumentListItem, DocumentSummary, Flashcard, DocumentStats } from './types';

export const documentService = {
  // Get all user's documents
  getAllDocuments: async (): Promise<DocumentListItem[]> => {
    const response = await apiClient.get<DocumentListItem[]>('/documents/');
    return response.data;
  },

  // Get single document details
  getDocument: async (id: number): Promise<Document> => {
    const response = await apiClient.get<Document>(`/documents/${id}/`);
    return response.data;
  },

  // Upload new document
  uploadDocument: async (file: File, title?: string): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title || file.name.replace('.pdf', ''));

    const response = await apiClient.post<Document>('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete document
  deleteDocument: async (id: number): Promise<void> => {
    await apiClient.delete(`/documents/${id}/`);
  },

  // Get document summary
  getDocumentSummary: async (id: number): Promise<DocumentSummary> => {
    const response = await apiClient.get<DocumentSummary>(`/documents/${id}/summary/`);
    return response.data;
  },

  // Get document flashcards
  getDocumentFlashcards: async (id: number): Promise<Flashcard[]> => {
    const response = await apiClient.get<Flashcard[]>(`/documents/${id}/flashcards/`);
    return response.data;
  },

  // Regenerate flashcards with different count
  regenerateFlashcards: async (id: number, count: number): Promise<{ flashcards: Flashcard[] }> => {
    const response = await apiClient.post(`/documents/${id}/regenerate_flashcards/`, { count });
    return response.data;
  },

  // Regenerate summary
  regenerateSummary: async (id: number): Promise<{ summary: DocumentSummary }> => {
    const response = await apiClient.post(`/documents/${id}/regenerate_summary/`);
    return response.data;
  },

  // Get user statistics
  getStats: async (): Promise<DocumentStats> => {
    const response = await apiClient.get<DocumentStats>('/documents/stats/');
    return response.data;
  },
};