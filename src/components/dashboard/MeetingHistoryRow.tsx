// File: src/components/dashboard/MeetingHistoryRow.tsx

import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Users,
  Video,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/Badge";

interface MeetingHistoryRowProps {
  title: string;
  date: string;
  duration: string;
  participantCount: number;
  status:
    | "active"
    | "pending"
    | "completed"
    | "in-progress"
    | "cancelled";
  className?: string;
  onClick?: () => void;
}

export function MeetingHistoryRow({
  title,
  date,
  duration,
  participantCount,
  status,
  className,
  onClick,
}: MeetingHistoryRowProps) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/30 hover:shadow-sm lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Video className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold">
            {title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{participantCount} Participants</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:justify-end">
        <Badge status={status} />

        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}