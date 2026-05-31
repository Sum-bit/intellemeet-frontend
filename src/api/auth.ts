// File: src/api/auth.ts

import { apiClient, parseResponse } from "@/api/client";
import { API_BASE_URL } from "@/lib/constants";

import type {
  ApiErrorResponse,
  AuthResponse,
  LoginRequest,
  LogoutResponse,
  MeResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest
} from "@/types/auth.types";

const AUTH_BASE_URL =
  `${API_BASE_URL}/api/auth`;

async function handleResponse<T>(
  response: Response
): Promise<T> {
  const data = (await response.json()) as
    | T
    | ApiErrorResponse;

  if (!response.ok) {
    const error = data as ApiErrorResponse;

    throw new Error(
      error.message || "Request failed"
    );
  }

  return data as T;
}

export async function signup(
  payload: RegisterRequest
): Promise<AuthResponse> {
  const response = await fetch(
    `${AUTH_BASE_URL}/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return handleResponse<AuthResponse>(
    response
  );
}

export async function login(
  payload: LoginRequest
): Promise<AuthResponse> {
  const response = await fetch(
    `${AUTH_BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return handleResponse<AuthResponse>(
    response
  );
}

export async function refreshToken(
  payload: RefreshTokenRequest
): Promise<RefreshTokenResponse> {
  const response = await fetch(
    `${AUTH_BASE_URL}/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return handleResponse<RefreshTokenResponse>(
    response
  );
}

export async function getCurrentUser(): Promise<MeResponse> {
  const response = await apiClient(
    `${AUTH_BASE_URL}/me`,
    {
      method: "GET"
    }
  );

  return parseResponse<MeResponse>(
    response
  );
}

export async function logout(): Promise<LogoutResponse> {
  const response = await apiClient(
    `${AUTH_BASE_URL}/logout`,
    {
      method: "POST"
    }
  );

  return parseResponse<LogoutResponse>(
    response
  );
}