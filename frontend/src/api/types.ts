// Legacy types - keeping for backward compatibility during migration
// Most of these are now in firebase/documentService.ts

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

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

export interface ApiError {
  error: string;
  details?: string;
}