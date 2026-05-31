// File: src/components/layout/Navbar.tsx
// Place this file in src/components/layout/

import { Bell, ChevronDown, Video } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface NavbarProps {
  meetingCode?: string;
  userName?: string;
  userEmail?: string;
  avatarUrl?: string | null;
  notificationCount?: number;
  className?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  onNotificationsClick?: () => void;
}

export function Navbar({
  meetingCode = "INT-48291",
  userName = "Sumedh Akula",
  userEmail = "sumedh@intellmeet.ai",
  avatarUrl = null,
  notificationCount = 3,
  className,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  onNotificationsClick,
}: NavbarProps) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Video className="h-5 w-5" />
        </div>

        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold tracking-tight">
            IntellMeet
          </h1>

          <p className="text-xs text-muted-foreground">
            Enterprise Collaboration
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Meeting Code
        </span>

        <div className="rounded-xl border border-border bg-card px-3 py-2">
          <span className="font-mono text-sm font-semibold">
            {meetingCode}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onNotificationsClick}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          {notificationCount > 0 && (
            <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              className="h-auto gap-3 rounded-xl px-2 py-1.5"
            >
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src={avatarUrl ?? undefined} />
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left lg:block">
                <p className="max-w-35 truncate text-sm font-medium">
                  {userName}
                </p>

                <p className="max-w-35 truncate text-xs text-muted-foreground">
                  {userEmail}
                </p>
              </div>

              <ChevronDown className="hidden h-4 w-4 text-muted-foreground lg:block" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64"
          >
            <div className="px-2 py-2">
              <p className="font-medium">
                {userName}
              </p>

              <p className="text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onProfileClick}
            >
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onSettingsClick}
            >
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onLogoutClick}
              className="text-destructive focus:text-destructive"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}