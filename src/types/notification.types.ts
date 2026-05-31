export type NotificationType =
  | "meeting_invite"
  | "meeting_started"
  | "meeting_ended"
  | "chat_message"
  | "task_assigned"
  | "task_completed"
  | "system";

export interface Notification {
  id: string;
  recipientId: string;
  meetingId?: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface SendNotificationRequest {
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  meetingId?: string;
}

export interface SendNotificationResponse {
  success: boolean;
  notification: Notification;
}

export interface NotificationsResponse {
  success: boolean;
  unreadCount: number;
  count: number;
  notifications: Notification[];
}

export interface MarkNotificationReadResponse {
  success: boolean;
  notification: Notification;
}

export interface MarkAllNotificationsReadResponse {
  success: boolean;
  count: number;
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}

export interface NotificationEvent {
  notification: Notification;
}