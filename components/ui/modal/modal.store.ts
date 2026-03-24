import { create } from "zustand";
import { ReactNode } from "react";

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  open: (content: ReactNode) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,

  open: (content) =>
    set({
      isOpen: true,
      content,
    }),

  close: () =>
    set({
      isOpen: false,
      content: null,
    }),
}));
