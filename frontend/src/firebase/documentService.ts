import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, auth } from './config';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export interface Document {
  id: string;
  user_id: string;
  title: string;
  file_url: string;
  file_name: string;
  file_size: number;
  status: 'processing' | 'completed' | 'failed';
  pages: number;
  created_at: Date;
  processed_at?: Date;
}

export interface Summary {
  summary: string;
  key_points: string[];
  insights: string[];
  examples: any[];
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  order: number;
}

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

      // Upload to backend (which will handle Firebase Storage)
      const response = await axios.post(`${API_URL}/api/documents/upload/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.document.id;
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
        created_at: docSnap.data().created_at?.toDate(),
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

export const documentService = new DocumentService();