import { create } from "zustand";

export type ActiveModal =
  | "create-meeting"
  | "join-meeting"
  | "meeting-settings"
  | "invite-users"
  | "notification-center"
  | "profile"
  | "change-password"
  | null;

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  activeModal: ActiveModal;
  toastMessage: string | null;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  openModal: (
    modal: Exclude<
      ActiveModal,
      null
    >
  ) => void;

  closeModal: () => void;

  showToast: (
    message: string
  ) => void;

  clearToast: () => void;

  resetUI: () => void;
}

const initialState = {
  isSidebarOpen: true,
  isModalOpen: false,
  activeModal: null,
  toastMessage: null
};

export const useUIStore =
  create<UIState>((set) => ({
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
        isSidebarOpen:
          !state.isSidebarOpen
      })),

    openModal: (
      activeModal
    ) =>
      set({
        activeModal,
        isModalOpen: true
      }),

    closeModal: () =>
      set({
        activeModal: null,
        isModalOpen: false
      }),

    showToast: (
      toastMessage
    ) =>
      set({
        toastMessage
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