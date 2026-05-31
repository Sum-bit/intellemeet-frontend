// File: src/components/kanban/KanbanBoard.tsx

import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  KanbanColumn,
  type KanbanTask,
} from "@/components/kanban/KanbanColumn";

export interface KanbanBoardColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

interface KanbanBoardProps {
  columns?: KanbanBoardColumn[];
  className?: string;
  onCreateTask?: () => void;
  onAddTask?: (columnId: string) => void;
  onTaskClick?: (
    columnId: string,
    taskId: string
  ) => void;
}

const defaultColumns: KanbanBoardColumn[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Finalize Q2 roadmap",
        description:
          "Review roadmap priorities and align with stakeholder feedback.",
        assignee: {
          name: "Sarah Chen",
          isOnline: true,
        },
        dueDate: "Jun 12, 2026",
        commentsCount: 4,
        attachmentsCount: 2,
        status: "pending",
      },
      {
        id: "2",
        title: "Prepare sprint planning deck",
        description:
          "Create presentation for upcoming engineering planning session.",
        assignee: {
          name: "David Kim",
        },
        dueDate: "Jun 15, 2026",
        commentsCount: 2,
        attachmentsCount: 1,
        status: "active",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Analytics dashboard redesign",
        description:
          "Implement updated metrics cards and reporting experience.",
        assignee: {
          name: "Olivia Moore",
          isOnline: true,
        },
        dueDate: "Jun 10, 2026",
        commentsCount: 8,
        attachmentsCount: 5,
        status: "in-progress",
      },
      {
        id: "4",
        title: "Meeting AI summary improvements",
        description:
          "Refine summary quality and action item extraction workflow.",
        assignee: {
          name: "Alex Johnson",
        },
        dueDate: "Jun 18, 2026",
        commentsCount: 6,
        attachmentsCount: 3,
        status: "in-progress",
      },
    ],
  },
  {
    id: "done",
    title: "Completed",
    tasks: [
      {
        id: "5",
        title: "Workspace navigation refresh",
        description:
          "Updated sidebar navigation and responsive interactions.",
        assignee: {
          name: "Emma Wilson",
        },
        dueDate: "Jun 05, 2026",
        commentsCount: 3,
        attachmentsCount: 1,
        status: "completed",
      },
    ],
  },
];

export function KanbanBoard({
  columns = defaultColumns,
  className,
  onCreateTask,
  onAddTask,
  onTaskClick,
}: KanbanBoardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-6",
        className
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Team Workspace
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Track meeting action items, project tasks, and team progress.
          </p>
        </div>

        <Button
          onClick={onCreateTask}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-5 pb-2">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              tasks={column.tasks}
              onAddTask={() =>
                onAddTask?.(column.id)
              }
              onTaskClick={(taskId) =>
                onTaskClick?.(
                  column.id,
                  taskId
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}