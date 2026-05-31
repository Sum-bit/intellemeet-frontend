export type MeetingStatus =
  | "waiting"
  | "active"
  | "ended";

export interface IceServer {
  urls: string | string[];
  username?: string;
  credential?: string;
}

export interface MeetingHost {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface MeetingParticipant {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  meetingCode: string;
  status: MeetingStatus;
  host: MeetingHost;
  participants: MeetingParticipant[];
  isRecording: boolean;
  maxParticipants: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MeetingListResponse {
  success: boolean;
  count: number;
  meetings: Meeting[];
}

export interface MeetingResponse {
  success: boolean;
  meeting: Meeting;
}

export interface CreateMeetingRequest {
  title: string;
  description: string;
  maxParticipants: number;
}

export interface CreateMeetingResponse {
  success: boolean;
  meeting: Meeting;
  iceServers: IceServer[];
}

export interface JoinMeetingRequest {
  meetingCode: string;
}

export interface JoinMeetingResponse {
  success: boolean;
  meeting: Meeting;
  iceServers: IceServer[];
}

export interface EndMeetingResponse {
  success: boolean;
  duration: number;
}

export interface DeleteMeetingResponse {
  success: boolean;
  message: string;
}

export interface JoinMeetingEvent {
  meetingId: string;
  userId: string;
}

export interface LeaveMeetingEvent {
  meetingId: string;
  userId: string;
}

export interface SendMessageEvent {
  meetingId: string;
  message: string;
  userId: string;
}

export interface ReceiveMessageEvent {
  id: string;
  meetingId: string;
  userId: string;
  message: string;
  timestamp: string;
}

export interface ToggleMuteEvent {
  meetingId: string;
  userId: string;
  muted: boolean;
}

export interface ToggleVideoEvent {
  meetingId: string;
  userId: string;
  videoOn: boolean;
}

export interface TranscriptUpdateEvent {
  text: string;
}

export interface MeetingSummaryEvent {
  summary: string;
  actionItems: {
    title: string;
    assigneeId?: string;
  }[];
}