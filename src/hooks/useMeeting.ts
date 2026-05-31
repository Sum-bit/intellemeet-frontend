import {
  useCallback,
  useMemo
} from "react";

import { useAuthStore } from "@/store/authStore";
import { useMeetingStore } from "@/store/meetingStore";

import { useSocket } from "@/hooks/useSocket";
import { useWebRTC } from "@/hooks/useWebRTC";

import type {
  IceServer,
  MeetingParticipant
} from "@/types/meeting.types";
import type { Message } from "@/types/message.types";

interface UseMeetingProps {
  meetingId: string;
  iceServers: IceServer[];
}

export function useMeeting({
  meetingId,
  iceServers
}: UseMeetingProps) {
  const { user } =
    useAuthStore();

  const {
    participants,
    messages,

    setMeetingId,

    setParticipants,
    addParticipant,
    removeParticipant,

    setMessages,
    addMessage,

    setMuted,
    setVideoOn,

    resetMeetingState
  } = useMeetingStore();

  const webRTC =
  useWebRTC({
    iceServers:
      iceServers as RTCIceServer[],

    onIceCandidate: (
      candidate
    ) => {
      if (
        !socket.socketId
      ) {
        return;
      }

      socket.sendIceCandidate({
        meetingId,
        candidate,
        fromId:
          socket.socketId
      });
    }
  });

  const socket =
    useSocket({
      onUserJoined: async (
        payload
      ) => {
        const participant: MeetingParticipant =
          {
            userId:
              payload.userId,
            userName:
              payload.userName,
            socketId:
              payload.socketId
          };

        addParticipant(
          participant
        );

        if (
          payload.userId ===
          user?.id
        ) {
          return;
        }

        if (
          !socket.socketId
        ) {
          return;
        }

        const offer =
          await webRTC.startCall(
            payload.socketId
          );

        socket.sendOffer({
          meetingId,
          offer,
          fromId:
            socket.socketId
        });
      },

      onUserLeft: (
        payload
      ) => {
        const participant =
          participants.find(
            (item) =>
              item.userId ===
              payload.userId
          );

        if (
          !participant
        ) {
          return;
        }

        removeParticipant(
          participant.socketId
        );

        webRTC.removePeer(
          participant.socketId
        );
      },

      onParticipantsList: (
        participantList
      ) => {
        setParticipants(
          participantList
        );
      },

      onMessage: (
        message
      ) => {
        addMessage(
          message as Message
        );
      },

      onMessagesHistory: (
        history
      ) => {
        setMessages(
          history
        );
      },

      onOffer: async (
        payload
      ) => {
        if (
          payload.fromId ===
          socket.socketId
        ) {
          return;
        }

        const answer =
          await webRTC.handleOffer(
            payload.fromId,
            payload.offer
          );

        socket.sendAnswer({
          meetingId,
          answer,
          fromId:
            socket.socketId
        });
      },

      onAnswer: async (
        payload
      ) => {
        if (
          payload.fromId ===
          socket.socketId
        ) {
          return;
        }

        await webRTC.handleAnswer(
          payload.fromId,
          payload.answer
        );
      },

      onIceCandidate:
        async (
          payload
        ) => {
          if (
            payload.fromId ===
            socket.socketId
          ) {
            return;
          }

          await webRTC.handleIceCandidate(
            payload.fromId,
            payload.candidate
          );
        }
    });

  const joinMeeting =
    useCallback(() => {
      if (!user) {
        return;
      }

      setMeetingId(
        meetingId
      );

      socket.joinMeeting({
        meetingId,
        userId: user.id,
        userName:
          user.name
      });

      socket.getMessages(
        meetingId
      );
    }, [
      meetingId,
      setMeetingId,
      socket,
      user
    ]);

  const leaveMeeting =
    useCallback(() => {
      if (!user) {
        return;
      }

      socket.leaveMeeting({
        meetingId,
        userId: user.id,
        userName:
          user.name
      });

      webRTC.cleanup();

      resetMeetingState();
    }, [
      meetingId,
      resetMeetingState,
      socket,
      user,
      webRTC
    ]);

  const sendChatMessage =
    useCallback(
      (
        message: string
      ) => {
        if (
          !user ||
          !message.trim()
        ) {
          return;
        }

        socket.sendMessage({
          meetingId,
          userId:
            user.id,
          userName:
            user.name,
          message
        });
      },
      [
        meetingId,
        socket,
        user
      ]
    );

  const startTyping =
    useCallback(() => {
      if (!user) {
        return;
      }

      socket.startTyping({
        meetingId,
        userId:
          user.id,
        userName:
          user.name
      });
    }, [
      meetingId,
      socket,
      user
    ]);

  const stopTyping =
    useCallback(() => {
      if (!user) {
        return;
      }

      socket.stopTyping({
        meetingId,
        userId:
          user.id
      });
    }, [
      meetingId,
      socket,
      user
    ]);

  const toggleMute =
    useCallback(() => {
      if (!user) {
        return;
      }

      const isMuted =
        webRTC.toggleMute();

      setMuted(
        isMuted
      );

      socket.toggleMute({
        meetingId,
        userId:
          user.id,
        isMuted
      });
    }, [
      meetingId,
      setMuted,
      socket,
      user,
      webRTC
    ]);

  const toggleVideo =
    useCallback(() => {
      if (!user) {
        return;
      }

      const isVideoOff =
        webRTC.toggleVideo();

      setVideoOn(
        !isVideoOff
      );

      socket.toggleVideo({
        meetingId,
        userId:
          user.id,
        isVideoOff
      });
    }, [
      meetingId,
      setVideoOn,
      socket,
      user,
      webRTC
    ]);

  return useMemo(
    () => ({
      meetingId,

      participants,
      messages,

      localStream:
        webRTC.localStream,

      remoteStreams:
        webRTC.remoteStreams,

      socketId:
        socket.socketId,

      isConnected:
        socket.isConnected,

      joinMeeting,
      leaveMeeting,

      sendChatMessage,

      startTyping,
      stopTyping,

      toggleMute,
      toggleVideo
    }),
    [
      joinMeeting,
      leaveMeeting,

      meetingId,

      messages,
      participants,

      sendChatMessage,

      socket.isConnected,
      socket.socketId,

      startTyping,
      stopTyping,

      toggleMute,
      toggleVideo,

      webRTC.localStream,
      webRTC.remoteStreams
    ]
  );
}