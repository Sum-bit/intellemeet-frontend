// File: src/components/dashboard/SummaryCard.tsx

import {
  CalendarDays,
  Clock3,
  Users,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SummaryCardProps {
  title: string;
  date: string;
  duration: string;
  participantCount: number;
  summaryPreview: string;
  className?: string;
  onViewSummary?: () => void;
}

export function SummaryCard({
  title,
  date,
  duration,
  participantCount,
  summaryPreview,
  className,
  onViewSummary,
}: SummaryCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-border transition-all duration-200 hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      <CardContent className="p-0">
        <div className="border-b border-border p-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <h3 className="line-clamp-1 text-lg font-semibold">
                {title}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {summaryPreview}
          </p>
        </div>

        <div className="flex items-center justify-between p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Meeting Summary
          </span>

          <Button
            size="sm"
            onClick={onViewSummary}
          >
            View Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}