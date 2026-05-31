import { apiClient, parseResponse } from "@/api/client";
import { API_BASE_URL } from "@/lib/constants";

import type {
  DeleteNotificationResponse,
  MarkAllNotificationsReadResponse,
  MarkNotificationReadResponse,
  NotificationsResponse,
  SendNotificationRequest,
  SendNotificationResponse
} from "@/types/notification.types";

const NOTIFICATIONS_BASE_URL =
  `${API_BASE_URL}/api/notifications`;

export async function getNotifications(): Promise<NotificationsResponse> {
  const response = await apiClient(
    `${NOTIFICATIONS_BASE_URL}`,
    {
      method: "GET"
    }
  );

  return parseResponse<NotificationsResponse>(
    response
  );
}

export async function markAllNotificationsAsRead(): Promise<MarkAllNotificationsReadResponse> {
  const response = await apiClient(
    `${NOTIFICATIONS_BASE_URL}/read-all`,
    {
      method: "PUT"
    }
  );

  return parseResponse<MarkAllNotificationsReadResponse>(
    response
  );
}

export async function markNotificationAsRead(
  notificationId: string
): Promise<MarkNotificationReadResponse> {
  const response = await apiClient(
    `${NOTIFICATIONS_BASE_URL}/${notificationId}/read`,
    {
      method: "PUT"
    }
  );

  return parseResponse<MarkNotificationReadResponse>(
    response
  );
}

export async function deleteNotification(
  notificationId: string
): Promise<DeleteNotificationResponse> {
  const response = await apiClient(
    `${NOTIFICATIONS_BASE_URL}/${notificationId}`,
    {
      method: "DELETE"
    }
  );

  return parseResponse<DeleteNotificationResponse>(
    response
  );
}

export async function sendNotification(
  payload: SendNotificationRequest
): Promise<SendNotificationResponse> {
  const response = await apiClient(
    `${NOTIFICATIONS_BASE_URL}/send`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<SendNotificationResponse>(
    response
  );
}