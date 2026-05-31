// File: src/hooks/useWebRTC.ts
// Place this file in src/hooks/

import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

interface UseWebRTCProps {
  iceServers: RTCIceServer[];
  onIceCandidate?: (
    candidate: RTCIceCandidateInit,
    peerSocketId: string
  ) => void;
}

export function useWebRTC({
  iceServers,
  onIceCandidate
}: UseWebRTCProps) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());

  const removePeer = useCallback((socketId: string) => {
    const peerConnection = peerConnectionsRef.current.get(socketId);
    if (peerConnection) {
      peerConnection.close();
      peerConnectionsRef.current.delete(socketId);
    }
    setRemoteStreams((previous) => {
      const next = new Map(previous);
      next.delete(socketId);
      return next;
    });
  }, []);

  const createPeerConnection = useCallback((socketId: string) => {
    const existing = peerConnectionsRef.current.get(socketId);
    if (existing) return existing;

    const peerConnection = new RTCPeerConnection({ iceServers });

    peerConnection.onicecandidate = (event) => {
      if (!event.candidate || !onIceCandidate) return;
      onIceCandidate(event.candidate.toJSON(), socketId);
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    peerConnection.ontrack = (event) => {
      const stream = event.streams[0];
      setRemoteStreams((previous) => {
        const next = new Map(previous);
        next.set(socketId, stream);
        return next;
      });
    };

    peerConnection.onconnectionstatechange = () => {
      const state = peerConnection.connectionState;
      if (state === "failed" || state === "closed" || state === "disconnected") {
        removePeer(socketId);
      }
    };

    peerConnectionsRef.current.set(socketId, peerConnection);
    return peerConnection;
  }, [iceServers, localStream, onIceCandidate, removePeer]);

  const initializeMedia = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    return stream;
  }, []);

  const startCall = useCallback(async (remoteSocketId: string) => {
    let stream = localStream;
    if (!stream) stream = await initializeMedia();

    const peerConnection = createPeerConnection(remoteSocketId);

    stream.getTracks().forEach((track) => {
      const alreadyAdded = peerConnection.getSenders().some((sender) => sender.track === track);
      if (!alreadyAdded) peerConnection.addTrack(track, stream as MediaStream);
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  }, [createPeerConnection, initializeMedia, localStream]);

  const handleOffer = useCallback(async (socketId: string, offer: RTCSessionDescriptionInit) => {
    let stream = localStream;
    if (!stream) stream = await initializeMedia();

    const peerConnection = createPeerConnection(socketId);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    stream.getTracks().forEach((track) => {
      const alreadyAdded = peerConnection.getSenders().some((sender) => sender.track === track);
      if (!alreadyAdded) peerConnection.addTrack(track, stream as MediaStream);
    });

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return answer;
  }, [createPeerConnection, initializeMedia, localStream]);

  const handleAnswer = useCallback(async (socketId: string, answer: RTCSessionDescriptionInit) => {
    const peerConnection = peerConnectionsRef.current.get(socketId);
    if (!peerConnection) return;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }, []);

  const handleIceCandidate = useCallback(async (socketId: string, candidate: RTCIceCandidateInit) => {
    const peerConnection = peerConnectionsRef.current.get(socketId);
    if (!peerConnection) return;
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }, []);

  const getPeerConnection = useCallback((socketId: string) =>
    peerConnectionsRef.current.get(socketId) ?? null, []);

  const toggleMute = useCallback(() => {
    if (!localStream) return false;
    const audioTrack = localStream.getAudioTracks()[0];
    if (!audioTrack) return false;
    audioTrack.enabled = !audioTrack.enabled;
    return !audioTrack.enabled;
  }, [localStream]);

  const toggleVideo = useCallback(() => {
    if (!localStream) return false;
    const videoTrack = localStream.getVideoTracks()[0];
    if (!videoTrack) return false;
    videoTrack.enabled = !videoTrack.enabled;
    return !videoTrack.enabled;
  }, [localStream]);

  const cleanup = useCallback(() => {
    peerConnectionsRef.current.forEach((peerConnection) => peerConnection.close());
    peerConnectionsRef.current.clear();
    setRemoteStreams(new Map());
    if (localStream) localStream.getTracks().forEach((track) => track.stop());
    setLocalStream(null);
  }, [localStream]);

  useEffect(() => {
    return () => { cleanup(); };
  }, [cleanup]);

  return {
    localStream,
    remoteStreams,
    startCall,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
    getPeerConnection,
    removePeer,
    toggleMute,
    toggleVideo,
    cleanup,
    peerConnections: peerConnectionsRef.current
  };
}