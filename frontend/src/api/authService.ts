import { apiClient } from './axiosConfig';
import {
  type AuthResponse,
  type LoginCredentials,
  type RegisterCredentials,
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
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },

  // Email/Password login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login/', credentials);
    
    // Store tokens
    tokenManager.setTokens(
      response.data.tokens.access,
      response.data.tokens.refresh
    );
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },

  // Email/Password registration
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register/', credentials);
    
    // Store tokens
    tokenManager.setTokens(
      response.data.tokens.access,
      response.data.tokens.refresh
    );
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },

  // Get current user profile
  getUserProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/profile/');
    return response.data;
  },

  // Logout
  logout: () => {
    tokenManager.clearTokens();
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return tokenManager.getAccessToken() !== null;
  },
};