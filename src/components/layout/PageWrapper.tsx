// File: src/components/layout/PageWrapper.tsx

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  meetingCode?: string;
  userName?: string;
  userEmail?: string;
  avatarUrl?: string | null;
  notificationCount?: number;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  onNotificationsClick?: () => void;
}

export function PageWrapper({
  children,
  className,
  contentClassName,
  meetingCode,
  userName,
  userEmail,
  avatarUrl,
  notificationCount,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  onNotificationsClick,
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground",
        className
      )}
    >
      <Navbar
        meetingCode={meetingCode}
        userName={userName}
        userEmail={userEmail}
        avatarUrl={avatarUrl}
        notificationCount={notificationCount}
        onProfileClick={onProfileClick}
        onSettingsClick={onSettingsClick}
        onLogoutClick={onLogoutClick}
        onNotificationsClick={onNotificationsClick}
      />

      <div className="flex">
        <Sidebar />

        <main
          className={cn(
            "min-w-0 flex-1",
            "h-[calc(100vh-4rem)]",
            "overflow-y-auto",
            "bg-background"
          )}
        >
          <div
            className={cn(
              "mx-auto w-full max-w-screen-2xl p-4 sm:p-6 lg:p-8",
              contentClassName
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}