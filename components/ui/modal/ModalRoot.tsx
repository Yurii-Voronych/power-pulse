"use client";

import { useModalStore } from "./modal.store";

export const ModalRoot = () => {
  const { isOpen, content, close } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 w-full h-full bg-orange"
        onClick={close}
      />

      <div className="relative z-10 flex justify-center items-center">
        {content}
      </div>
    </div>
  );
};
