import { create } from "zustand";
import { ReactNode } from "react";

export type ModalBackdrop = "dark" | "orange";

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  backdrop: ModalBackdrop;

  open: (content: ReactNode, backdrop?: ModalBackdrop) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  backdrop: "dark",

  open: (content, backdrop = "dark") =>
    set({
      isOpen: true,
      content,
      backdrop,
    }),

  close: () =>
    set({
      isOpen: false,
      content: null,
      backdrop: "dark",
    }),
}));
