// File: src/pages/MeetingLobbyPage.tsx
// Place this file in src/pages/

import { useState } from "react";

import { MeetingLobby } from "@/components/meeting/MeetingLobby";

import type {
  MediaDeviceOption,
  MeetingLobbyDeviceState,
} from "@/types/meeting.types";

export default function MeetingLobbyPage() {
  const [deviceState, setDeviceState] =
    useState<MeetingLobbyDeviceState>({
      audioInputId: "audio-input-1",
      audioOutputId: "audio-output-1",
      videoInputId: "video-input-1",
    });

  const audioInputs: MediaDeviceOption[] = [
    {
      deviceId: "audio-input-1",
      label: "Default Microphone",
    },
    {
      deviceId: "audio-input-2",
      label: "External USB Microphone",
    },
  ];

  const audioOutputs: MediaDeviceOption[] = [
    {
      deviceId: "audio-output-1",
      label: "Default Speakers",
    },
    {
      deviceId: "audio-output-2",
      label: "Headphones",
    },
  ];

  const videoInputs: MediaDeviceOption[] = [
    {
      deviceId: "video-input-1",
      label: "Built-in Camera",
    },
    {
      deviceId: "video-input-2",
      label: "External Webcam",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <MeetingLobby
          localStream={null}
          isMicEnabled
          isCameraEnabled
          audioInputs={audioInputs}
          audioOutputs={audioOutputs}
          videoInputs={videoInputs}
          deviceState={deviceState}
          onAudioInputChange={(deviceId) =>
            setDeviceState((prev) => ({
              ...prev,
              audioInputId: deviceId,
            }))
          }
          onAudioOutputChange={(deviceId) =>
            setDeviceState((prev) => ({
              ...prev,
              audioOutputId: deviceId,
            }))
          }
          onVideoInputChange={(deviceId) =>
            setDeviceState((prev) => ({
              ...prev,
              videoInputId: deviceId,
            }))
          }
          onJoinMeeting={() => {}}
        />
      </div>
    </main>
  );
}