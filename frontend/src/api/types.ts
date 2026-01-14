// Consolidated types - single source of truth

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
  file_name: string;
  file_size: number;
  status: 'processing' | 'completed' | 'failed';
  pages?: number;
  created_at: Date;
  processed_at?: Date;
  uploaded_at?: string;
  flashcard_count?: number;
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

export interface ReviewSection {
  title: string;
  content: string;
  order: number;
}

export interface Reviewer {
  title: string;
  overview: string;
  sections: ReviewSection[];
  key_takeaways: string[];
}

export interface ApiError {
  error: string;
  details?: string;
}

// Alias for backward compatibility
export type DocumentListItem = Document;