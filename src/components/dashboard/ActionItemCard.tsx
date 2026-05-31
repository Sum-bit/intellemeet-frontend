// File: src/components/dashboard/ActionItemCard.tsx
// Place this file in src/components/dashboard/

import {
  CalendarDays,
  CheckSquare,
  User2,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/Badge";

interface ActionItemCardProps {
  title: string;
  assignee: string;
  dueDate: string;
  status:
    | "active"
    | "pending"
    | "completed"
    | "in-progress"
    | "cancelled";
  className?: string;
  onViewClick?: () => void;
}

export function ActionItemCard({
  title,
  assignee,
  dueDate,
  status,
  className,
  onViewClick,
}: ActionItemCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:border-primary/30 hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckSquare className="h-5 w-5" />
            </div>

            <div>
              <h3 className="line-clamp-2 font-semibold">
                {title}
              </h3>

              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User2 className="h-4 w-4" />
                  <span>{assignee}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          <Badge status={status} />
        </div>

        <div className="flex items-center justify-end border-t border-border pt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={onViewClick}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}