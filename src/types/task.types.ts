export type TaskStatus =
  | "todo"
  | "in-progress"
  | "completed";

export interface Task {
  id: string;
  title: string;
  assigneeId: string;
  status: TaskStatus;
}

export interface CreateTaskRequest {
  title: string;
  assigneeId: string;
  meetingId: string;
  dueDate: string;
  status: TaskStatus;
}

export interface CreateTaskResponse {
  success: true;
  task: Task;
}

export interface UpdateTaskRequest {
  status: TaskStatus;
}

export interface UpdateTaskResponse {
  success: true;
  task: Pick<Task, "id" | "status">;
}