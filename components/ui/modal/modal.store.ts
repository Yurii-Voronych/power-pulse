import { create } from "zustand";
import { ReactNode } from "react";

type ModalOptions = {
  backdropClassName?: string;
  contentClassName?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
};

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  options: ModalOptions;

  open: (content: ReactNode, options?: ModalOptions) => void;
  close: () => void;
};

const defaultOptions: ModalOptions = {
  backdropClassName: "bg-black/50",
  contentClassName: "",
  closeOnBackdrop: true,
  closeOnEscape: true,
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  options: defaultOptions,

  open: (content, options = {}) =>
    set({
      isOpen: true,
      content,
      options: {
        ...defaultOptions,
        ...options,
      },
    }),

  close: () =>
    set({
      isOpen: false,
      content: null,
      options: defaultOptions,
    }),
}));
