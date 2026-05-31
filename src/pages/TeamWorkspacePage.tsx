// File: src/pages/TeamWorkspacePage.tsx
// Place this file in src/pages/

import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function TeamWorkspacePage() {
  return (
    <PageWrapper contentClassName="max-w-none">
      <KanbanBoard />
    </PageWrapper>
  );
}