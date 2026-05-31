import { create } from "zustand";

import type { AuthUser } from "@/types/auth.types";

interface LoginPayload {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  login: (payload: LoginPayload) => void;

  logout: () => void;

  setAccessToken: (
    accessToken: string | null
  ) => void;

  setRefreshToken: (
    refreshToken: string | null
  ) => void;

  setTokens: (
    accessToken: string,
    refreshToken: string
  ) => void;

  setUser: (
    user: AuthUser | null
  ) => void;
}

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false
};

export const useAuthStore =
  create<AuthState>((set) => ({
    ...initialState,

    login: ({
      user,
      accessToken,
      refreshToken
    }) =>
      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true
      }),

    logout: () =>
      set({
        ...initialState
      }),

    setAccessToken: (
      accessToken
    ) =>
      set((state) => ({
        accessToken,
        isAuthenticated:
          Boolean(accessToken) &&
          Boolean(state.user)
      })),

    setRefreshToken: (
      refreshToken
    ) =>
      set({
        refreshToken
      }),

    setTokens: (
      accessToken,
      refreshToken
    ) =>
      set((state) => ({
        accessToken,
        refreshToken,
        isAuthenticated:
          Boolean(accessToken) &&
          Boolean(state.user)
      })),

    setUser: (user) =>
      set((state) => ({
        user,
        isAuthenticated:
          Boolean(user) &&
          Boolean(state.accessToken)
      }))
  }));