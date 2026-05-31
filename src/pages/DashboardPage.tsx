// File: src/pages/DashboardPage.tsx
// Place this file in src/pages/

import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { ActionItemCard } from "@/components/dashboard/ActionItemCard";
import { MeetingHistoryRow } from "@/components/dashboard/MeetingHistoryRow";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Meeting summaries, action items, and collaboration insights.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Recent Summaries
          </h2>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              title="Weekly Product Sync"
              date="Jun 1, 2026"
              duration="52 min"
              participantCount={8}
              summaryPreview="Team reviewed roadmap priorities, discussed sprint velocity, and aligned on upcoming deliverables."
            />

            <SummaryCard
              title="Engineering Planning"
              date="May 29, 2026"
              duration="1h 12m"
              participantCount={12}
              summaryPreview="Architecture review completed. Action items assigned for analytics redesign and API optimization."
            />

            <SummaryCard
              title="Stakeholder Review"
              date="May 27, 2026"
              duration="44 min"
              participantCount={6}
              summaryPreview="Executive stakeholders approved timeline and requested additional reporting metrics."
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Action Items
          </h2>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <ActionItemCard
              title="Finalize Sprint Roadmap"
              assignee="Sarah Chen"
              dueDate="Jun 10, 2026"
              status="in-progress"
            />

            <ActionItemCard
              title="Prepare Executive Summary"
              assignee="David Kim"
              dueDate="Jun 8, 2026"
              status="pending"
            />

            <ActionItemCard
              title="Analytics Dashboard Review"
              assignee="Alex Johnson"
              dueDate="Jun 6, 2026"
              status="completed"
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            Meeting History
          </h2>

          <div className="space-y-3">
            <MeetingHistoryRow
              title="Weekly Product Sync"
              date="Jun 1, 2026"
              duration="52 min"
              participantCount={8}
              status="completed"
            />

            <MeetingHistoryRow
              title="Engineering Planning"
              date="May 29, 2026"
              duration="1h 12m"
              participantCount={12}
              status="completed"
            />

            <MeetingHistoryRow
              title="Stakeholder Review"
              date="May 27, 2026"
              duration="44 min"
              participantCount={6}
              status="completed"
            />
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}