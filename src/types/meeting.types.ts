// File: src/types/meeting.types.ts

import type { MeetingActionItem } from "./task.types";

export type MeetingStatus =
  | "scheduled"
  | "completed";

export interface Meeting {
  id: string;
  title: string;
  hostId: string;
  scheduledAt: string;
  status: MeetingStatus;
}

export interface MeetingListItem {
  id: string;
  title: string;
  scheduledAt: string;
  status: MeetingStatus;
  participantCount: number;
}

export interface MeetingDetails {
  id: string;
  title: string;
  hostId: string;
  participants: string[];
  transcript: string;
  summary: string;
  actionItems: MeetingActionItem[];
  recording: string;
}

export interface CreateMeetingRequest {
  title: string;
  scheduledAt: string;
  participants: string[];
}

export interface CreateMeetingResponse {
  success: true;
  meeting: Meeting;
}

export interface GetMeetingsResponse {
  success: true;
  meetings: MeetingListItem[];
}

export interface GetMeetingResponse {
  success: true;
  meeting: MeetingDetails;
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

export interface NewMessageEvent {
  message: string;
  userId: string;
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