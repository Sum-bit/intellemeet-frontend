// File: src/components/meeting/MeetingLobby.tsx
// Place this file in src/components/meeting/

import { useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  MediaDeviceOption,
  MeetingLobbyDeviceState,
} from "@/types/meeting.types";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MeetingLobbyProps {
  localStream: MediaStream | null;
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
  audioInputs: MediaDeviceOption[];
  audioOutputs: MediaDeviceOption[];
  videoInputs: MediaDeviceOption[];
  deviceState: MeetingLobbyDeviceState;
  onAudioInputChange: (deviceId: string) => void;
  onAudioOutputChange: (deviceId: string) => void;
  onVideoInputChange: (deviceId: string) => void;
  onJoinMeeting: () => void;
}

export function MeetingLobby({
  localStream,
  isMicEnabled,
  isCameraEnabled,
  audioInputs,
  audioOutputs,
  videoInputs,
  deviceState,
  onAudioInputChange,
  onAudioOutputChange,
  onVideoInputChange,
  onJoinMeeting,
}: MeetingLobbyProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current || !localStream) return;
    videoRef.current.srcObject = localStream;
  }, [localStream]);

  const handleAudioInputChange = (
    value: string | null
  ) => {
    if (!value) return;
    onAudioInputChange(value);
  };

  const handleAudioOutputChange = (
    value: string | null
  ) => {
    if (!value) return;
    onAudioOutputChange(value);
  };

  const handleVideoInputChange = (
    value: string | null
  ) => {
    if (!value) return;
    onVideoInputChange(value);
  };

  const renderOptions = (
    devices: MediaDeviceOption[]
  ) =>
    devices.map((device) => (
      <SelectItem
        key={device.deviceId}
        value={device.deviceId}
      >
        {device.label || "Unknown Device"}
      </SelectItem>
    ));

  return (
    <section className="grid min-h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-[1.5fr_420px]">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        {localStream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full min-h-105 w-full object-cover"
          />
        ) : (
          <div className="flex min-h-105 items-center justify-center bg-muted">
            <p className="text-sm text-muted-foreground">
              Waiting for camera preview...
            </p>
          </div>
        )}

        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors",
              isMicEnabled
                ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                : "border-red-500/30 bg-red-500/15 text-red-400"
            )}
          >
            {isMicEnabled ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </div>

          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors",
              isCameraEnabled
                ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                : "border-red-500/30 bg-red-500/15 text-red-400"
            )}
          >
            {isCameraEnabled ? (
              <Video className="h-5 w-5" />
            ) : (
              <VideoOff className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>

      <aside className="flex flex-col rounded-3xl border border-border bg-card p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">
            Device Setup
          </h2>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <Select
            value={deviceState.audioInputId}
            onValueChange={handleAudioInputChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Audio Input" />
            </SelectTrigger>
            <SelectContent>
              {renderOptions(audioInputs)}
            </SelectContent>
          </Select>

          <Select
            value={deviceState.audioOutputId}
            onValueChange={handleAudioOutputChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Audio Output" />
            </SelectTrigger>
            <SelectContent>
              {renderOptions(audioOutputs)}
            </SelectContent>
          </Select>

          <Select
            value={deviceState.videoInputId}
            onValueChange={handleVideoInputChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Video Input" />
            </SelectTrigger>
            <SelectContent>
              {renderOptions(videoInputs)}
            </SelectContent>
          </Select>
        </div>

        <Button
          size="lg"
          onClick={onJoinMeeting}
          className="mt-8"
        >
          Join Meeting
        </Button>
      </aside>
    </section>
  );
}