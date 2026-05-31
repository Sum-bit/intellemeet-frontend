// File: src/components/shared/Avatar.tsx

import { cn } from "@/lib/utils";

import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  isOnline?: boolean;
  className?: string;
}

const avatarSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const indicatorSizes = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
  xl: "h-4 w-4",
};

export function Avatar({
  name,
  src,
  size = "md",
  isOnline = false,
  className,
}: AvatarProps) {
  const initials = name
    .trim()
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-flex">
      <ShadcnAvatar
        className={cn(
          avatarSizes[size],
          "border border-border",
          className
        )}
      >
        <AvatarImage
          src={src ?? undefined}
          alt={name}
        />

        <AvatarFallback className="font-medium">
          {initials}
        </AvatarFallback>
      </ShadcnAvatar>

      {isOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background bg-emerald-500 shadow-sm",
            indicatorSizes[size]
          )}
          aria-label="Online"
        />
      )}
    </div>
  );
}