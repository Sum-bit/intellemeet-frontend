// File: src/pages/PostMeetingPage.tsx
// Place this file in src/pages/

import {
  CalendarDays,
  Clock3,
  Sparkles,
  Users,
} from "lucide-react";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { ActionItemCard } from "@/components/dashboard/ActionItemCard";

export default function PostMeetingPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI Generated Summary
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Weekly Product Sync
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Jun 01, 2026
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              52 Minutes
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              8 Participants
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Meeting Summary
          </h2>

          <div className="space-y-4 leading-7 text-muted-foreground">
            <p>
              The team reviewed Q2 roadmap priorities,
              discussed engineering velocity, aligned on
              analytics improvements, and finalized
              ownership for upcoming deliverables.
            </p>

            <p>
              Stakeholders approved the revised launch
              timeline. The analytics dashboard redesign
              was prioritized and assigned to the frontend
              team. Infrastructure improvements were
              scheduled for the next sprint cycle.
            </p>

            <p>
              Key risks identified include reporting
              latency and incomplete event tracking.
              Action items were created for each owner.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Action Items
          </h2>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <ActionItemCard
              title="Finalize Analytics Redesign"
              assignee="Sarah Chen"
              dueDate="Jun 08, 2026"
              status="in-progress"
            />

            <ActionItemCard
              title="Prepare Executive Report"
              assignee="David Kim"
              dueDate="Jun 10, 2026"
              status="pending"
            />

            <ActionItemCard
              title="Review Infrastructure Metrics"
              assignee="Alex Johnson"
              dueDate="Jun 12, 2026"
              status="active"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}