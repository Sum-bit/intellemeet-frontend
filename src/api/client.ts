// File: src/api/client.ts
// Place this file in src/api/

import { refreshToken } from "@/api/auth";
import { ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";

import type { ApiErrorResponse } from "@/types/auth.types";

async function refreshAccessToken() {
  const {
    refreshToken: storedRefreshToken,
    setTokens,
    logout
  } = useAuthStore.getState();

  if (!storedRefreshToken) {
    logout();

    window.location.href =
      ROUTES.AUTH;

    throw new Error(
      "No refresh token available"
    );
  }

  try {
    const response =
      await refreshToken({
        refreshToken:
          storedRefreshToken
      });

    setTokens(
      response.accessToken,
      response.refreshToken
    );

    return response.accessToken;
  } catch {
    logout();

    window.location.href =
      ROUTES.AUTH;

    throw new Error(
      "Session expired. Please log in again."
    );
  }
}

export async function apiClient(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const { accessToken } =
    useAuthStore.getState();

  const response = await fetch(
    input,
    {
      ...init,
      headers: {
        Authorization: accessToken
          ? `Bearer ${accessToken}`
          : "",
        ...(init?.headers ?? {})
      }
    }
  );

  if (response.status !== 401) {
    return response;
  }

  const newAccessToken =
    await refreshAccessToken();

  return fetch(input, {
    ...init,
    headers: {
      Authorization: `Bearer ${newAccessToken}`,
      ...(init?.headers ?? {})
    }
  });
}

export async function parseResponse<T>(
  response: Response
): Promise<T> {
  const data = (await response.json()) as
    | T
    | ApiErrorResponse;

  if (!response.ok) {
    const error = data as ApiErrorResponse;

    throw new Error(
      error.message ||
        "Request failed"
    );
  }

  return data as T;
}