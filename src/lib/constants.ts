// File: src/lib/constants.ts

export const API_BASE_URL =
  import.meta.env.VITE_API_URL;

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL;

export const ROUTES = {
  ROOT: "/",

  AUTH: "/auth",

  DASHBOARD: "/dashboard",

  MEETING_LOBBY:
    "/meeting/lobby",

  MEETING_ROOM:
    "/meeting/room/:meetingId",

  POST_MEETING:
    "/post-meeting",

  WORKSPACE:
    "/workspace",

  ANALYTICS:
    "/analytics",

  PROFILE:
    "/profile"
} as const;

export const QUERY_KEYS = {
  AUTH_USER: [
    "auth-user"
  ],

  MEETINGS: [
    "meetings"
  ],

  MEETING: [
    "meeting"
  ],

  TASKS: [
    "tasks"
  ],

  ANALYTICS: [
    "analytics"
  ],

  NOTIFICATIONS: [
    "notifications"
  ],

  CHAT_MESSAGES: [
    "chat-messages"
  ]
} as const;

export const SOCKET_EVENTS = {
  JOIN_MEETING:
    "join-meeting",

  LEAVE_MEETING:
    "leave-meeting",

  SEND_MESSAGE:
    "send-message",

  GET_MESSAGES:
    "get-messages",

  TYPING:
    "typing",

  STOP_TYPING:
    "stop-typing",

  TOGGLE_MUTE:
    "toggle-mute",

  TOGGLE_VIDEO:
    "toggle-video",

  WEBRTC_OFFER:
    "webrtc-offer",

  WEBRTC_ANSWER:
    "webrtc-answer",

  ICE_CANDIDATE:
    "ice-candidate",

  USER_JOINED:
    "user-joined",

  USER_LEFT:
    "user-left",

  PARTICIPANTS_LIST:
    "participants-list",

  RECEIVE_MESSAGE:
    "receive-message",

  MESSAGES_HISTORY:
    "messages-history",

  USER_TYPING:
    "user-typing",

  USER_STOP_TYPING:
    "user-stop-typing",

  USER_MUTE_CHANGED:
    "user-mute-changed",

  USER_VIDEO_CHANGED:
    "user-video-changed"
} as const;