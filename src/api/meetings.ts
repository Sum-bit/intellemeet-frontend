// File: src/api/meetings.ts

import { API_BASE_URL } from "@/lib/constants";
import { apiClient, parseResponse } from "@/api/client";

import type {
  CreateMeetingRequest,
  CreateMeetingResponse,
  DeleteMeetingResponse,
  EndMeetingResponse,
  JoinMeetingRequest,
  JoinMeetingResponse,
  MeetingListResponse,
  MeetingResponse
} from "@/types/meeting.types";

const MEETINGS_BASE_URL =
  `${API_BASE_URL}/api/meetings`;

export async function createMeeting(
  payload: CreateMeetingRequest
): Promise<CreateMeetingResponse> {
  const response = await apiClient(
    `${MEETINGS_BASE_URL}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<CreateMeetingResponse>(
    response
  );
}

export async function joinMeeting(
  payload: JoinMeetingRequest
): Promise<JoinMeetingResponse> {
  const response = await apiClient(
    `${MEETINGS_BASE_URL}/join`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  return parseResponse<JoinMeetingResponse>(
    response
  );
}

export async function getMeetings(): Promise<MeetingListResponse> {
  const response = await apiClient(
    `${MEETINGS_BASE_URL}`,
    {
      method: "GET"
    }
  );

  return parseResponse<MeetingListResponse>(
    response
  );
}

export async function getMeetingById(
  meetingId: string
): Promise<MeetingResponse> {
  const response = await apiClient(
    `${MEETINGS_BASE_URL}/${meetingId}`,
    {
      method: "GET"
    }
  );

  return parseResponse<MeetingResponse>(
    response
  );
}

export async function endMeeting(
  meetingId: string
): Promise<EndMeetingResponse> {
  const response = await apiClient(
    `${MEETINGS_BASE_URL}/${meetingId}/end`,
    {
      method: "PUT"
    }
  );

  return parseResponse<EndMeetingResponse>(
    response
  );
}

export async function deleteMeeting(
  meetingId: string
): Promise<DeleteMeetingResponse> {
  const response = await apiClient(
    `${MEETINGS_BASE_URL}/${meetingId}`,
    {
      method: "DELETE"
    }
  );

  return parseResponse<DeleteMeetingResponse>(
    response
  );
}