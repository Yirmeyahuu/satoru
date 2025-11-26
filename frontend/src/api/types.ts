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