// File: src/store/uiStore.ts

// File: src/store/uiStore.ts
// Place this file in src/store/

import { create } from "zustand";

export type ActiveModal =
  | "create-meeting"
  | "meeting-settings"
  | "invite-users"
  | "task-details"
  | "profile"
  | null;

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  activeModal: ActiveModal;
  toastMessage: string | null;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  openModal: (modal: Exclude<ActiveModal, null>) => void;
  closeModal: () => void;

  showToast: (message: string) => void;
  clearToast: () => void;

  resetUI: () => void;
}

const initialState = {
  isSidebarOpen: true,
  isModalOpen: false,
  activeModal: null,
  toastMessage: null
};

export const useUIStore = create<UIState>((set) => ({
  ...initialState,

  openSidebar: () =>
    set({
      isSidebarOpen: true
    }),

  closeSidebar: () =>
    set({
      isSidebarOpen: false
    }),

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen
    })),

  openModal: (modal) =>
    set({
      isModalOpen: true,
      activeModal: modal
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      activeModal: null
    }),

  showToast: (message) =>
    set({
      toastMessage: message
    }),

  clearToast: () =>
    set({
      toastMessage: null
    }),

  resetUI: () =>
    set({
      ...initialState
    })
}));