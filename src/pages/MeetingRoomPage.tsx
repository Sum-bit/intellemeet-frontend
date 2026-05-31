// File: src/pages/MeetingRoomPage.tsx
// Place this file in src/pages/

import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessageSquare,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Video,
  VideoOff,
} from "lucide-react";

import { useMeeting } from "@/hooks/useMeeting";

import type {
  IceServer,
  MeetingParticipant,
} from "@/types/meeting.types";

import { VideoGrid } from "@/components/meeting/VideoGrid";
import { MeetingSidebar } from "@/components/meeting/MeetingSidebar";
import { Button } from "@/components/ui/button";

export default function MeetingRoomPage() {
  const { meetingId = "" } = useParams();

  const iceServers: IceServer[] = [];

  const {
    participants,
    messages,
    localStream,
    remoteStreams,
    sendChatMessage,
    startTyping,
    stopTyping,
    toggleMute,
    toggleVideo,
    leaveMeeting,
    socketId,
  } = useMeeting({
    meetingId,
    iceServers,
  });

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [isMuted, setIsMuted] =
    useState(false);

  const [isCameraOff, setIsCameraOff] =
    useState(false);

  const videoParticipants = useMemo(() => {
    const localParticipant: {
      participant: MeetingParticipant;
      stream: MediaStream | null;
      isLocal: boolean;
      isActiveSpeaker: boolean;
      isScreenSharing: boolean;
    } = {
      participant: {
        userId: "local",
        userName: "You",
        socketId: socketId ?? "local",
      },
      stream: localStream,
      isLocal: true,
      isActiveSpeaker: false,
      isScreenSharing: false,
    };

    const remoteParticipants =
      participants.map(
        (participant) => ({
          participant,
          stream:
            remoteStreams.get(
              participant.socketId
            ) ?? null,
          isLocal: false,
          isActiveSpeaker: false,
          isScreenSharing: false,
        })
      );

    return [
      localParticipant,
      ...remoteParticipants,
    ];
  }, [
    participants,
    remoteStreams,
    localStream,
    socketId,
  ]);

  const handleToggleMute = () => {
    toggleMute();
    setIsMuted((prev) => !prev);
  };

  const handleToggleVideo = () => {
    toggleVideo();
    setIsCameraOff((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex-1 overflow-hidden p-4">
        <VideoGrid
          participants={
            videoParticipants
          }
        />
      </div>

      <div className="border-t border-border bg-card">
        <div className="flex items-center justify-center gap-3 p-4">
          <Button
            size="icon"
            variant={
              isMuted
                ? "destructive"
                : "secondary"
            }
            onClick={
              handleToggleMute
            }
          >
            {isMuted ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          <Button
            size="icon"
            variant={
              isCameraOff
                ? "destructive"
                : "secondary"
            }
            onClick={
              handleToggleVideo
            }
          >
            {isCameraOff ? (
              <VideoOff className="h-5 w-5" />
            ) : (
              <Video className="h-5 w-5" />
            )}
          </Button>

          <Button
            size="icon"
            variant="secondary"
          >
            <MonitorUp className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            variant="secondary"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={
              leaveMeeting
            }
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MeetingSidebar
        open={sidebarOpen}
        onOpenChange={
          setSidebarOpen
        }
        messages={messages}
        sendChatMessage={
          sendChatMessage
        }
        startTyping={
          startTyping
        }
        stopTyping={
          stopTyping
        }
      />
    </div>
  );
}