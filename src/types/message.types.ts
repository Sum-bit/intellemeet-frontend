export interface Message {
  id: string;
  meetingId: string;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
  };
  message: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SaveMessageRequest {
  message: string;
}

export interface SaveMessageResponse {
  success: boolean;
  messageData: Message;
}

export interface GetMessagesResponse {
  success: boolean;
  source: string;
  count: number;
  messages: Message[];
}

export interface DeleteMessagesResponse {
  success: boolean;
  message: string;
}

export interface ReceiveMessageEvent {
  id: string;
  meetingId: string;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
  };
  message: string;
  createdAt: string;
}