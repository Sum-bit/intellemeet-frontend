import { apiClient, parseResponse } from "@/api/client";
import { API_BASE_URL } from "@/lib/constants";

import type {
  DeleteMessagesResponse,
  GetMessagesResponse,
  SaveMessageRequest,
  SaveMessageResponse
} from "@/types/message.types";

const CHAT_BASE_URL =
  `${API_BASE_URL}/api/chat`;

export async function getMessages(
  meetingId: string
): Promise<GetMessagesResponse> {
  const response = await apiClient(
    `${CHAT_BASE_URL}/${meetingId}/messages`,
    {
      method: "GET"
    }
  );

  return parseResponse<GetMessagesResponse>(
    response
  );
}

export async function saveMessage(
  meetingId: string,
  payload: SaveMessageRequest
): Promise<SaveMessageResponse> {
  const response = await apiClient(
    `${CHAT_BASE_URL}/${meetingId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<SaveMessageResponse>(
    response
  );
}

export async function clearChat(
  meetingId: string
): Promise<DeleteMessagesResponse> {
  const response = await apiClient(
    `${CHAT_BASE_URL}/${meetingId}/messages`,
    {
      method: "DELETE"
    }
  );

  return parseResponse<DeleteMessagesResponse>(
    response
  );
}