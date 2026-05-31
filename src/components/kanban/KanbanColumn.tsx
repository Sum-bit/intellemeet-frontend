// File: src/components/kanban/KanbanColumn.tsx

import { MoreHorizontal, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KanbanCard } from "@/components/kanban/KanbanCard";

export interface KanbanTask {
  id: string;
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
}

interface KanbanColumnProps {
  title: string;
  tasks: KanbanTask[];
  className?: string;
  onAddTask?: () => void;
  onTaskClick?: (taskId: string) => void;
}

export function KanbanColumn({
  title,
  tasks,
  className,
  onAddTask,
  onTaskClick,
}: KanbanColumnProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-175 w-full min-w-[320px] flex-col rounded-3xl border border-border bg-card",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">
            {title}
          </h3>

          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            {tasks.length}
          </span>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-3 p-4">
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              title={task.title}
              description={task.description}
              assignee={task.assignee}
              dueDate={task.dueDate}
              commentsCount={task.commentsCount}
              attachmentsCount={task.attachmentsCount}
              status={task.status}
              onClick={() => onTaskClick?.(task.id)}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
    </div>
  );
}