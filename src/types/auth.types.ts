// File: src/types/auth.types.ts

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface AuthenticatedUser extends AuthUser {
  createdAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface MeResponse {
  success: boolean;
  user: AuthenticatedUser;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}