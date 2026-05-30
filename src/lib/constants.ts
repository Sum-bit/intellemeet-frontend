// File: src/lib/constants.ts

export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const ROUTES = {
  ROOT: "/",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  MEETING_LOBBY: "/meeting/lobby",
  MEETING_ROOM: "/meeting/room",
  MEETING_SUMMARY: "/meeting",
  WORKSPACE: "/workspace",
  ANALYTICS: "/analytics",
  PROFILE: "/profile"
} as const;

export const QUERY_KEYS = {
  AUTH_USER: ["auth-user"],
  MEETINGS: ["meetings"],
  MEETING: ["meeting"],
  TASKS: ["tasks"],
  ANALYTICS: ["analytics"]
} as const;

export const SOCKET_EVENTS = {
  JOIN_MEETING: "join-meeting",
  LEAVE_MEETING: "leave-meeting",
  SEND_MESSAGE: "send-message",
  TOGGLE_MUTE: "toggle-mute",
  TOGGLE_VIDEO: "toggle-video",

  USER_JOINED: "user-joined",
  USER_LEFT: "user-left",
  NEW_MESSAGE: "new-message",
  TRANSCRIPT_UPDATE: "transcript-update",
  MEETING_SUMMARY: "meeting-summary"
} as const;

export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: "access-token"
} as const;