import { apiClient } from './axiosConfig';
import {
  type AuthResponse,
  type LoginCredentials,
  type RegisterCredentials,
  type GoogleAuthRequest,
  type User,
} from './types';
import { tokenManager } from '../utils/tokenManager';

export const authService = {
  // Google OAuth authentication
  googleAuth: async (token: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/google/', {
      token,
    });
    
    // Store tokens
    tokenManager.setTokens(
      response.data.tokens.access,
      response.data.tokens.refresh
    );
    
    return response.data;
  },

  // Email/Password registration
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/register/',
      credentials
    );
    
    // Store tokens
    tokenManager.setTokens(
      response.data.tokens.access,
      response.data.tokens.refresh
    );
    
    return response.data;
  },

  // Email/Password login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/login/',
      credentials
    );
    
    // Store tokens
    tokenManager.setTokens(
      response.data.tokens.access,
      response.data.tokens.refresh
    );
    
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout/');
    } finally {
      // Always clear tokens, even if request fails
      tokenManager.clearTokens();
    }
  },

  // Get current user profile
  getUserProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/user/profile/');
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return tokenManager.hasValidToken();
  },
};