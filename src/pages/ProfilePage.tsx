// File: src/pages/ProfilePage.tsx
// Place this file in src/pages/

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";
import { getUserProfile, updateUserProfile } from "@/api/users";
import { PageWrapper } from "@/components/layout/PageWrapper";
import type { User } from "@/types/user.types";

const mockUser: User = {
  id: '1',
  name: 'Sumedh Akula',
  email: 'sumedh@intellmeet.ai',
  role: 'admin',
  avatar: '',
  isActive: true,
  createdAt: '2026-01-01T00:00:00.000Z'
};

export default function ProfilePage() {
  const { accessToken, logout } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile();
        setUser(response.user);
        setName(response.user.name);
      } catch {
        setUser(mockUser);
        setName(mockUser.name);
      } finally {
        setIsLoading(false);
      }
    };
    void loadProfile();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      setError("");
      setSuccess("");
      setIsSaving(true);
      const response = await updateUserProfile({ name });
      setUser(response.user);
      setSuccess("Profile updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    try {
      setError("");
      setSuccess("");
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const response = await fetch(`${API_BASE_URL}/api/users/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData
      });
      const data = (await response.json()) as { success: boolean; avatar: string; message?: string };
      if (!response.ok) throw new Error(data.message ?? "Failed to upload avatar");
      setUser((prev) => prev ? { ...prev, avatar: data.avatar } : prev);
      setSuccess("Avatar updated successfully.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Avatar upload failed");
    }
  };

  const handlePasswordChange = async () => {
    try {
      setError("");
      setSuccess("");
      if (newPassword !== confirmPassword) throw new Error("Passwords do not match.");
      const response = await fetch(`${API_BASE_URL}/api/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = (await response.json()) as { success: boolean; message?: string };
      if (!response.ok) throw new Error(data.message ?? "Failed to change password");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Password changed successfully.");
    } catch (passwordError) {
      setError(passwordError instanceof Error ? passwordError.message : "Password update failed");
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to deactivate your account?");
    if (!confirmed) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = (await response.json()) as { success: boolean; message?: string };
      if (!response.ok) throw new Error(data.message ?? "Failed to deactivate account");
      logout();
    } catch (deactivateError) {
      setError(deactivateError instanceof Error ? deactivateError.message : "Failed to deactivate account");
    }
  };

  if (isLoading) {
    return (
      <PageWrapper userName={mockUser.name} userEmail={mockUser.email}>
        <div className="flex min-h-96 items-center justify-center">
          Loading profile...
        </div>
      </PageWrapper>
    );
  }

  if (!user) return null;

  return (
    <PageWrapper
      userName={user.name}
      userEmail={user.email}
      avatarUrl={user.avatar}
      onLogoutClick={logout}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile & Settings</h1>
        </div>

        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-md border border-green-300 bg-green-50 p-3 text-green-600 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
            {success}
          </div>
        )}

        <section className="rounded-xl border p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Profile</h2>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
            <img
              src={user.avatar || "https://placehold.co/120x120"}
              alt={user.name}
              className="h-28 w-28 rounded-full object-cover"
            />
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                className="dark:text-white"
              />
              <button
                onClick={() => void handleAvatarUpload()}
                className="rounded-md bg-black px-4 py-2 text-white dark:bg-violet-700 dark:hover:bg-violet-800"
              >
                Upload Avatar
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Display Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </label>
            <button
              disabled={isSaving}
              onClick={() => void handleProfileUpdate()}
              className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-violet-700 dark:hover:bg-violet-800"
            >
              Save Changes
            </button>
          </div>
        </section>

        <section className="rounded-xl border p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-md border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={() => void handlePasswordChange()}
              className="rounded-md bg-black px-4 py-2 text-white dark:bg-violet-700 dark:hover:bg-violet-800"
            >
              Change Password
            </button>
          </div>
        </section>

        <section className="rounded-xl border p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Account</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
              <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800 dark:text-gray-200">
                {user.role}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => void handleDeactivateAccount()}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Deactivate Account
            </button>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}