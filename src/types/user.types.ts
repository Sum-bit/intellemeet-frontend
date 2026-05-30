export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Participant {
  id: string;
  name: string;
}

export interface UserJoinedEvent {
  userId: string;
  name: string;
}

export interface UserLeftEvent {
  userId: string;
}