// File: src/store/meetingStore.ts

import { create } from "zustand";

import type {
  MeetingListItem,
  NewMessageEvent
} from "@/types/meeting.types";

interface MeetingParticipant {
  userId: string;
  name: string;
}

interface MeetingState {
  meetingId: string | null;

  participants: MeetingParticipant[];

  messages: NewMessageEvent[];

  activeMeeting: MeetingListItem | null;

  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;

  setMeetingId: (meetingId: string | null) => void;

  setActiveMeeting: (
    meeting: MeetingListItem | null
  ) => void;

  setParticipants: (
    participants: MeetingParticipant[]
  ) => void;

  addParticipant: (
    participant: MeetingParticipant
  ) => void;

  removeParticipant: (userId: string) => void;

  addMessage: (
    message: NewMessageEvent
  ) => void;

  clearMessages: () => void;

  setMuted: (muted: boolean) => void;

  setVideoOn: (videoOn: boolean) => void;

  setScreenSharing: (
    screenSharing: boolean
  ) => void;

  resetMeetingState: () => void;
}

const initialState = {
  meetingId: null,
  participants: [],
  messages: [],
  activeMeeting: null,
  isMuted: false,
  isVideoOn: true,
  isScreenSharing: false
};

export const useMeetingStore =
  create<MeetingState>((set) => ({
    ...initialState,

    setMeetingId: (meetingId) =>
      set({
        meetingId
      }),

    setActiveMeeting: (activeMeeting) =>
      set({
        activeMeeting
      }),

    setParticipants: (participants) =>
      set({
        participants
      }),

    addParticipant: (participant) =>
      set((state) => {
        const exists = state.participants.some(
          (existingParticipant) =>
            existingParticipant.userId ===
            participant.userId
        );

        if (exists) {
          return state;
        }

        return {
          participants: [
            ...state.participants,
            participant
          ]
        };
      }),

    removeParticipant: (userId) =>
      set((state) => ({
        participants:
          state.participants.filter(
            (participant) =>
              participant.userId !== userId
          )
      })),

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message
        ]
      })),

    clearMessages: () =>
      set({
        messages: []
      }),

    setMuted: (isMuted) =>
      set({
        isMuted
      }),

    setVideoOn: (isVideoOn) =>
      set({
        isVideoOn
      }),

    setScreenSharing: (
      isScreenSharing
    ) =>
      set({
        isScreenSharing
      }),

    resetMeetingState: () =>
      set({
        ...initialState
      })
  }));