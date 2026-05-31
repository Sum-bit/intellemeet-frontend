// File: src/store/meetingStore.ts

import { create } from "zustand";

import type {
  Meeting,
  MeetingParticipant
} from "@/types/meeting.types";
import type { Message } from "@/types/message.types";

interface MeetingState {
  meetingId: string | null;
  activeMeeting: Meeting | null;

  participants: MeetingParticipant[];

  messages: Message[];

  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;

  setMeetingId: (
    meetingId: string | null
  ) => void;

  setActiveMeeting: (
    meeting: Meeting | null
  ) => void;

  setParticipants: (
    participants: MeetingParticipant[]
  ) => void;

  addParticipant: (
    participant: MeetingParticipant
  ) => void;

  removeParticipant: (
    participantId: string
  ) => void;

  setMessages: (
    messages: Message[]
  ) => void;

  addMessage: (
    message: Message
  ) => void;

  clearMessages: () => void;

  setMuted: (
    isMuted: boolean
  ) => void;

  setVideoOn: (
    isVideoOn: boolean
  ) => void;

  setScreenSharing: (
    isScreenSharing: boolean
  ) => void;

  resetMeetingState: () => void;
}

const initialState = {
  meetingId: null,
  activeMeeting: null,
  participants: [],
  messages: [],
  isMuted: false,
  isVideoOn: true,
  isScreenSharing: false
};

export const useMeetingStore =
  create<MeetingState>((set) => ({
    ...initialState,

    setMeetingId: (
      meetingId
    ) =>
      set({
        meetingId
      }),

    setActiveMeeting: (
      activeMeeting
    ) =>
      set({
        activeMeeting
      }),

    setParticipants: (
      participants
    ) =>
      set({
        participants
      }),

    addParticipant: (
      participant
    ) =>
      set((state) => {
        const exists =
          state.participants.some(
            (existingParticipant) =>
              existingParticipant.id ===
              participant.id
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

    removeParticipant: (
      participantId
    ) =>
      set((state) => ({
        participants:
          state.participants.filter(
            (participant) =>
              participant.id !==
              participantId
          )
      })),

    setMessages: (
      messages
    ) =>
      set({
        messages
      }),

    addMessage: (
      message
    ) =>
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

    setMuted: (
      isMuted
    ) =>
      set({
        isMuted
      }),

    setVideoOn: (
      isVideoOn
    ) =>
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