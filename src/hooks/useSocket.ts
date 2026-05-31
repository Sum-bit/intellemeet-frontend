// File: src/hooks/useSocket.ts

import { useCallback, useEffect } from "react";

import socket, {
  connectSocket,
  disconnectSocket
} from "@/lib/socket";

import type { Message } from "@/types/message.types";
import type {
  MeetingParticipant
} from "@/types/meeting.types";

interface JoinMeetingPayload {
  meetingId: string;
  userId: string;
  userName: string;
}

interface LeaveMeetingPayload {
  meetingId: string;
  userId: string;
  userName: string;
}

interface SendMessagePayload {
  meetingId: string;
  userId: string;
  userName: string;
  message: string;
}

interface TypingPayload {
  meetingId: string;
  userId: string;
  userName: string;
}

interface StopTypingPayload {
  meetingId: string;
  userId: string;
}

interface ToggleMutePayload {
  meetingId: string;
  userId: string;
  isMuted: boolean;
}

interface ToggleVideoPayload {
  meetingId: string;
  userId: string;
  isVideoOff: boolean;
}

interface WebRTCOfferPayload {
  meetingId: string;
  offer: RTCSessionDescriptionInit;
  fromId: string;
}

interface WebRTCAnswerPayload {
  meetingId: string;
  answer: RTCSessionDescriptionInit;
  fromId: string;
}

interface IceCandidatePayload {
  meetingId: string;
  candidate: RTCIceCandidateInit;
  fromId: string;
}

interface UseSocketOptions {
  onUserJoined?: (payload: {
    userId: string;
    userName: string;
    socketId: string;
  }) => void;

  onUserLeft?: (payload: {
    userId: string;
    userName: string;
  }) => void;

  onParticipantsList?: (
    participants: MeetingParticipant[]
  ) => void;

  onMessage?: (
    message: Message
  ) => void;

  onMessagesHistory?: (
    messages: Message[]
  ) => void;

  onUserTyping?: (payload: {
    userId: string;
    userName: string;
  }) => void;

  onUserStopTyping?: (payload: {
    userId: string;
  }) => void;

  onMuteChanged?: (payload: {
    userId: string;
    isMuted: boolean;
  }) => void;

  onVideoChanged?: (payload: {
    userId: string;
    isVideoOff: boolean;
  }) => void;

  onOffer?: (payload: {
    offer: RTCSessionDescriptionInit;
    fromId: string;
  }) => void;

  onAnswer?: (payload: {
    answer: RTCSessionDescriptionInit;
    fromId: string;
  }) => void;

  onIceCandidate?: (payload: {
    candidate: RTCIceCandidateInit;
    fromId: string;
  }) => void;
}

export function useSocket(
  options?: UseSocketOptions
) {
  useEffect(() => {
    connectSocket();

    if (options?.onUserJoined) {
      socket.on(
        "user-joined",
        options.onUserJoined
      );
    }

    if (options?.onUserLeft) {
      socket.on(
        "user-left",
        options.onUserLeft
      );
    }

    if (
      options?.onParticipantsList
    ) {
      socket.on(
        "participants-list",
        options.onParticipantsList
      );
    }

    if (options?.onMessage) {
      socket.on(
        "receive-message",
        options.onMessage
      );
    }

    if (
      options?.onMessagesHistory
    ) {
      socket.on(
        "messages-history",
        options.onMessagesHistory
      );
    }

    if (
      options?.onUserTyping
    ) {
      socket.on(
        "user-typing",
        options.onUserTyping
      );
    }

    if (
      options?.onUserStopTyping
    ) {
      socket.on(
        "user-stop-typing",
        options.onUserStopTyping
      );
    }

    if (
      options?.onMuteChanged
    ) {
      socket.on(
        "user-mute-changed",
        options.onMuteChanged
      );
    }

    if (
      options?.onVideoChanged
    ) {
      socket.on(
        "user-video-changed",
        options.onVideoChanged
      );
    }

    if (options?.onOffer) {
      socket.on(
        "webrtc-offer",
        options.onOffer
      );
    }

    if (options?.onAnswer) {
      socket.on(
        "webrtc-answer",
        options.onAnswer
      );
    }

    if (
      options?.onIceCandidate
    ) {
      socket.on(
        "ice-candidate",
        options.onIceCandidate
      );
    }

    return () => {
      socket.removeAllListeners();
      disconnectSocket();
    };
  }, [options]);

  const joinMeeting =
    useCallback(
      (
        payload: JoinMeetingPayload
      ) => {
        socket.emit(
          "join-meeting",
          payload
        );
      },
      []
    );

  const leaveMeeting =
    useCallback(
      (
        payload: LeaveMeetingPayload
      ) => {
        socket.emit(
          "leave-meeting",
          payload
        );
      },
      []
    );

  const sendMessage =
    useCallback(
      (
        payload: SendMessagePayload
      ) => {
        socket.emit(
          "send-message",
          payload
        );
      },
      []
    );

  const getMessages =
    useCallback(
      (
        meetingId: string
      ) => {
        socket.emit(
          "get-messages",
          {
            meetingId
          }
        );
      },
      []
    );

  const startTyping =
    useCallback(
      (
        payload: TypingPayload
      ) => {
        socket.emit(
          "typing",
          payload
        );
      },
      []
    );

  const stopTyping =
    useCallback(
      (
        payload: StopTypingPayload
      ) => {
        socket.emit(
          "stop-typing",
          payload
        );
      },
      []
    );

  const toggleMute =
    useCallback(
      (
        payload: ToggleMutePayload
      ) => {
        socket.emit(
          "toggle-mute",
          payload
        );
      },
      []
    );

  const toggleVideo =
    useCallback(
      (
        payload: ToggleVideoPayload
      ) => {
        socket.emit(
          "toggle-video",
          payload
        );
      },
      []
    );

  const sendOffer =
    useCallback(
      (
        payload: WebRTCOfferPayload
      ) => {
        socket.emit(
          "webrtc-offer",
          payload
        );
      },
      []
    );

  const sendAnswer =
    useCallback(
      (
        payload: WebRTCAnswerPayload
      ) => {
        socket.emit(
          "webrtc-answer",
          payload
        );
      },
      []
    );

  const sendIceCandidate =
    useCallback(
      (
        payload: IceCandidatePayload
      ) => {
        socket.emit(
          "ice-candidate",
          payload
        );
      },
      []
    );

  return {
    socket,
    isConnected:
      socket.connected,

    joinMeeting,
    leaveMeeting,
    sendMessage,
    getMessages,
    startTyping,
    stopTyping,
    toggleMute,
    toggleVideo,
    sendOffer,
    sendAnswer,
    sendIceCandidate
  };
}