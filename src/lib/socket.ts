// File: src/lib/socket.ts

import { io } from "socket.io-client";

import { SOCKET_URL } from "@/lib/constants";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket", "polling"]
});

export function connectSocket() {
  if (!socket.connected) {
    socket.connect();
  }

  return socket;
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export default socket;