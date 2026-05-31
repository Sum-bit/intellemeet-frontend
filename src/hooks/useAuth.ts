// File: src/hooks/useAuth.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  signup as signupRequest
} from "@/api/auth";

import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from "@/types/auth.types";

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    setUser
  } = useAuthStore();

  const currentUserQuery = useQuery({
    queryKey: QUERY_KEYS.AUTH_USER,
    queryFn: async () => {
      const response = await getCurrentUser();

      setUser(response.user);

      return response.user;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: 1
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginRequest) =>
      loginRequest(payload),

    onSuccess: (response: AuthResponse) => {
      login({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      });

      queryClient.setQueryData(
        QUERY_KEYS.AUTH_USER,
        response.user
      );
    }
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) =>
      signupRequest(payload),

    onSuccess: (response: AuthResponse) => {
      login({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      });

      queryClient.setQueryData(
        QUERY_KEYS.AUTH_USER,
        response.user
      );
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logoutRequest();
    },

    onSettled: () => {
      logout();

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH_USER
      });

      queryClient.clear();
    }
  });

  const refreshCurrentUser =
    async () => {
      const response =
        await getCurrentUser();

      setUser(response.user);

      queryClient.setQueryData(
        QUERY_KEYS.AUTH_USER,
        response.user
      );

      return response.user;
    };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,

    currentUser:
      currentUserQuery.data ?? null,

    isLoadingUser:
      currentUserQuery.isLoading,

    userError:
      currentUserQuery.error,

    login:
      loginMutation.mutateAsync,

    register:
      registerMutation.mutateAsync,

    logout:
      logoutMutation.mutateAsync,

    refreshCurrentUser,

    loginPending:
      loginMutation.isPending,

    registerPending:
      registerMutation.isPending,

    logoutPending:
      logoutMutation.isPending,

    loginError:
      loginMutation.error,

    registerError:
      registerMutation.error,

    logoutError:
      logoutMutation.error
  };
}