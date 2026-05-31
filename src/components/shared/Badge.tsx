// File: src/components/shared/Badge.tsx
// Place this file in src/components/shared/

import { CheckCircle2, Clock3, Loader2, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export type BadgeStatus =
  | "active"
  | "pending"
  | "completed"
  | "in-progress"
  | "cancelled";

interface BadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

const badgeConfig = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  },
  pending: {
    label: "Pending",
    icon: Clock3,
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-500",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-500",
  },
  "in-progress": {
    label: "In Progress",
    icon: Loader2,
    className:
      "border-violet-500/20 bg-violet-500/10 text-violet-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "border-red-500/20 bg-red-500/10 text-red-500",
  },
};

export function Badge({
  status,
  label,
  className,
}: BadgeProps) {
  const config = badgeConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5",
          status === "in-progress" && "animate-spin"
        )}
      />
      {label ?? config.label}
    </span>
  );
}