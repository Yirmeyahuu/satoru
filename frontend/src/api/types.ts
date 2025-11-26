export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  auth_method: 'email' | 'google';
  is_email_verified: boolean;
  date_joined: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}

export interface GoogleAuthRequest {
  token: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

// Document Types
export interface Document {
  id: number;
  title: string;
  file: string;
  file_url: string;
  file_size: number;
  pages: number;
  status: 'processing' | 'completed' | 'failed';
  uploaded_at: string;
  processed_at: string | null;
  updated_at: string;
  summary?: DocumentSummary;
  flashcards?: Flashcard[];
  flashcard_count: number;
}

export interface DocumentListItem {
  id: number;
  title: string;
  pages: number;
  status: 'processing' | 'completed' | 'failed';
  uploaded_at: string;
  flashcard_count: number;
  has_summary: boolean;
}

export interface DocumentSummary {
  id: number;
  content: string;
  key_points: string[];
  insights: string[];
  examples: Example[];
  created_at: string;
  updated_at: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  order: number;
  created_at: string;
}

export interface Example {
  title: string;
  description: string;
  code?: string;
}

export interface DocumentStats {
  total_documents: number;
  completed_documents: number;
  processing_documents: number;
  total_flashcards: number;
  total_pages_processed: number;
}

export interface RegenerateFlashcardsRequest {
  count: number;
}