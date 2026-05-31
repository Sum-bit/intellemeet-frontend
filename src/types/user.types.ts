export type UserRole = "admin" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateProfileRequest {
  name: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  user: User;
}

export interface UserProfileResponse {
  success: boolean;
  user: User;
}

export interface UploadAvatarResponse {
  success: boolean;
  avatar: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface DeleteProfileResponse {
  success: boolean;
  message: string;
}