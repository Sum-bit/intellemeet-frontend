// File: src/types/auth.types.ts

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
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

export interface RegisterResponse {
  success: true;
  message: string;
  accessToken: string;
  user: AuthUser;
}

export interface LoginResponse {
  success: true;
  message: string;
  accessToken: string;
  user: AuthUser;
}

export interface RefreshTokenResponse {
  success: true;
  accessToken: string;
}

export interface LogoutResponse {
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type AuthApiResponse =
  | RegisterResponse
  | LoginResponse
  | RefreshTokenResponse
  | LogoutResponse
  | ApiErrorResponse;