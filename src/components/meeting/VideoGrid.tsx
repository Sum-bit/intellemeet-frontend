// File: src/components/meeting/VideoGrid.tsx
// Place this file in src/components/meeting/

import { useEffect, useMemo, useRef } from "react";
import { MicOff, MonitorSmartphone, User } from "lucide-react";

import { cn } from "@/lib/utils";

import type { MeetingParticipant } from "@/types/meeting.types";

interface VideoGridParticipant {
  participant: MeetingParticipant;
  stream: MediaStream | null;
  isLocal?: boolean;
  isActiveSpeaker?: boolean;
  isScreenSharing?: boolean;
}

interface VideoGridProps {
  participants: VideoGridParticipant[];
}

interface VideoTileProps {
  participant: MeetingParticipant;
  stream: MediaStream | null;
  isLocal?: boolean;
  isActiveSpeaker?: boolean;
  isScreenSharing?: boolean;
}

function VideoTile({
  participant,
  stream,
  isLocal = false,
  isActiveSpeaker = false,
  isScreenSharing = false,
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current || !stream) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  const hasVideoTrack =
    stream?.getVideoTracks().some((track) => track.enabled) ??
    false;

  const hasAudioTrack =
    stream?.getAudioTracks().some((track) => track.enabled) ??
    true;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300",
        isActiveSpeaker
          ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary)),0_0_30px_hsl(var(--primary)/0.25)]"
          : "border-border hover:border-border/80"
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {stream && hasVideoTrack ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>

              <span className="text-sm text-muted-foreground">
                Camera Off
              </span>
            </div>
          </div>
        )}

        {isActiveSpeaker && (
          <div className="absolute right-3 top-3 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgb(34_197_94)]" />
        )}

        {isScreenSharing && (
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
            <MonitorSmartphone className="h-3.5 w-3.5" />
            Sharing Screen
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
            {isLocal ? "You" : participant.userName}
          </div>

          {!hasAudioTrack && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-500 backdrop-blur">
              <MicOff className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VideoGrid({
  participants,
}: VideoGridProps) {
  const gridClassName = useMemo(() => {
    const count = participants.length;

    if (count <= 1) {
      return "grid-cols-1";
    }

    if (count === 2) {
      return "grid-cols-1 lg:grid-cols-2";
    }

    if (count <= 4) {
      return "grid-cols-1 md:grid-cols-2";
    }

    if (count <= 6) {
      return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
    }

    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";
  }, [participants.length]);

  return (
    <div
      className={cn(
        "grid auto-rows-fr gap-4 transition-all duration-300",
        gridClassName
      )}
    >
      {participants.map((item) => (
        <VideoTile
          key={item.participant.socketId}
          participant={item.participant}
          stream={item.stream}
          isLocal={item.isLocal}
          isActiveSpeaker={item.isActiveSpeaker}
          isScreenSharing={item.isScreenSharing}
        />
      ))}
    </div>
  );
}