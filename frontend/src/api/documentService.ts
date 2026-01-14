import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import axios from 'axios';
import type { Document, Summary, Flashcard, Reviewer, ReviewSection } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Re-export types for convenience
export type { Document, Summary, Flashcard, Reviewer, ReviewSection };

// ===== SERVICE CLASS =====

class DocumentService {
  /**
   * Upload document
   */
  async uploadDocument(file: File): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    try {
      // Get auth token
      const token = await user.getIdToken();

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload to backend
      const response = await axios.post(`${API_URL}/api/documents/upload/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.document && response.data.document.id) {
        return response.data.document.id;
      } else {
        throw new Error('Invalid response from server: document ID missing');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      throw new Error(error.response?.data?.error || 'Failed to upload document');
    }
  }

  /**
   * Get all user documents
   */
  async getAllDocuments(): Promise<Document[]> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    try {
      const q = query(
        collection(db, 'documents'),
        where('user_id', '==', user.uid),
        orderBy('created_at', 'desc')
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate(),
        processed_at: doc.data().processed_at?.toDate()
      })) as Document[];
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  /**
   * Get single document
   */
  async getDocument(docId: string): Promise<Document | null> {
    try {
      const docRef = doc(db, 'documents', docId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return null;

      return {
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate(),  // Fixed: docSnap not doc
        processed_at: docSnap.data().processed_at?.toDate()
      } as Document;
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  /**
   * Get document summary
   */
  async getDocumentSummary(docId: string): Promise<Summary | null> {
    try {
      const summaryRef = doc(db, 'summaries', docId);
      const summarySnap = await getDoc(summaryRef);

      if (!summarySnap.exists()) return null;

      return summarySnap.data() as Summary;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }
  }

  /**
   * Get document reviewer
   */
  async getDocumentReviewer(docId: string): Promise<Reviewer | null> {
    try {
      const reviewerRef = doc(db, 'reviewers', docId);
      const reviewerSnap = await getDoc(reviewerRef);

      if (!reviewerSnap.exists()) {
        console.log('No reviewer found for document:', docId);
        return null;
      }

      const data = reviewerSnap.data();
      return {
        title: data.title || '',
        overview: data.overview || '',
        sections: data.sections || [],
        key_takeaways: data.key_takeaways || [],
      } as Reviewer;
    } catch (error) {
      console.error('Error fetching reviewer:', error);
      throw error;
    }
  }

  /**
   * Get document flashcards
   */
  async getDocumentFlashcards(docId: string): Promise<Flashcard[]> {
    try {
      const q = query(
        collection(db, 'flashcards'),
        where('document_id', '==', docId),
        orderBy('order')
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Flashcard[];
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }
  }

  /**
   * Delete document
   */
  async deleteDocument(docId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    try {
      const token = await user.getIdToken();

      await axios.delete(`${API_URL}/api/documents/${docId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Delete error:', error);
      throw new Error(error.response?.data?.error || 'Failed to delete document');
    }
  }

  /**
   * Regenerate flashcards with different count
   */
  async regenerateFlashcards(docId: string, count: number): Promise<Flashcard[]> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    try {
      const token = await user.getIdToken();

      const response = await axios.post(
        `${API_URL}/api/documents/${docId}/regenerate_flashcards/`,
        { count },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.flashcards || [];
    } catch (error: any) {
      console.error('Regenerate flashcards error:', error);
      throw new Error(error.response?.data?.error || 'Failed to regenerate flashcards');
    }
  }

  /**
   * Regenerate summary
   */
  async regenerateSummary(docId: string): Promise<Summary> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    try {
      const token = await user.getIdToken();

      const response = await axios.post(
        `${API_URL}/api/documents/${docId}/regenerate_summary/`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.data.summary;
    } catch (error: any) {
      console.error('Regenerate summary error:', error);
      throw new Error(error.response?.data?.error || 'Failed to regenerate summary');
    }
  }

  /**
   * Listen to document changes (real-time)
   */
  subscribeToDocument(docId: string, callback: (doc: Document) => void) {
    const docRef = doc(db, 'documents', docId);

    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        callback({
          id: snapshot.id,
          ...snapshot.data(),
          created_at: snapshot.data().created_at?.toDate(),
          processed_at: snapshot.data().processed_at?.toDate()
        } as Document);
      }
    });
  }

  /**
   * Listen to user's documents (real-time)
   */
  subscribeToUserDocuments(callback: (docs: Document[]) => void) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const q = query(
      collection(db, 'documents'),
      where('user_id', '==', user.uid),
      orderBy('created_at', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate(),
        processed_at: doc.data().processed_at?.toDate()
      })) as Document[];

      callback(documents);
    });
  }
}

// ===== EXPORT SINGLETON =====
export const documentService = new DocumentService();