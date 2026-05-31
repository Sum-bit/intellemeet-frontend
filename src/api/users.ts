// File: src/api/users.ts

import { API_BASE_URL } from "@/lib/constants";
import { apiClient, parseResponse } from "@/api/client";

import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UploadAvatarResponse,
  UserProfileResponse
} from "@/types/user.types";

const USERS_BASE_URL =
  `${API_BASE_URL}/api/users`;

export async function getUserProfile(): Promise<UserProfileResponse> {
  const response = await apiClient(
    `${USERS_BASE_URL}/profile`,
    {
      method: "GET"
    }
  );

  return parseResponse<UserProfileResponse>(
    response
  );
}

export async function updateUserProfile(
  payload: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  const response = await apiClient(
    `${USERS_BASE_URL}/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<UpdateProfileResponse>(
    response
  );
}

export async function uploadAvatar(
  file: File
): Promise<UploadAvatarResponse> {
  const formData = new FormData();

  formData.append(
    "avatar",
    file
  );

  const response = await apiClient(
    `${USERS_BASE_URL}/avatar`,
    {
      method: "POST",
      body: formData
    }
  );

  return parseResponse<UploadAvatarResponse>(
    response
  );
}

export async function changePassword(
  payload: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  const response = await apiClient(
    `${USERS_BASE_URL}/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<ChangePasswordResponse>(
    response
  );
}

export async function deleteProfile(): Promise<DeleteProfileResponse> {
  const response = await apiClient(
    `${USERS_BASE_URL}/profile`,
    {
      method: "DELETE"
    }
  );

  return parseResponse<DeleteProfileResponse>(
    response
  );
}