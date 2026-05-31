// File: src/api/tasks.ts
import { apiClient, parseResponse } from "@/api/client";
import { API_BASE_URL } from "@/lib/constants";

import type {
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse
} from "@/types/task.types";

const TASKS_BASE_URL =
  `${API_BASE_URL}/api/tasks`;

export async function createTask(
  payload: CreateTaskRequest
): Promise<CreateTaskResponse> {
  const response = await apiClient(
    `${TASKS_BASE_URL}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<CreateTaskResponse>(
    response
  );
}

export async function updateTask(
  taskId: string,
  payload: UpdateTaskRequest
): Promise<UpdateTaskResponse> {
  const response = await apiClient(
    `${TASKS_BASE_URL}/${taskId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<UpdateTaskResponse>(
    response
  );
}