// File: src/components/kanban/KanbanCard.tsx

import {
  CalendarDays,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/shared/Badge";
import { Avatar } from "@/components/shared/Avatar";

interface KanbanCardProps {
  title: string;
  description?: string;
  assignee: {
    name: string;
    avatar?: string | null;
    isOnline?: boolean;
  };
  dueDate?: string;
  commentsCount?: number;
  attachmentsCount?: number;
  status:
    | "active"
    | "pending"
    | "completed"
    | "in-progress"
    | "cancelled";
  className?: string;
  onClick?: () => void;
}

export function KanbanCard({
  title,
  description,
  assignee,
  dueDate,
  commentsCount = 0,
  attachmentsCount = 0,
  status,
  className,
  onClick,
}: KanbanCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200",
        "hover:border-primary/30 hover:bg-muted/30 hover:shadow-md",
        className
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <Badge status={status} />

        <Avatar
          size="sm"
          name={assignee.name}
          src={assignee.avatar}
          isOnline={assignee.isOnline}
        />
      </div>

      <h3 className="mb-2 line-clamp-2 font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>
      )}

      <div className="space-y-3">
        {dueDate && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{dueDate}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">
            {assignee.name}
          </span>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{commentsCount}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3.5 w-3.5" />
              <span>{attachmentsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}