// File: src/hooks/useMeeting.ts

import { create } from "zustand";

import type { AuthUser } from "@/types/auth.types";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (payload: {
    user: AuthUser;
    accessToken: string;
  }) => void;

  logout: () => void;

  setToken: (token: string | null) => void;

  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: true
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false
    }),

  setToken: (token) =>
    set((state) => ({
      accessToken: token,
      isAuthenticated: Boolean(token && state.user)
    })),

  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: Boolean(user && state.accessToken)
    }))
}));