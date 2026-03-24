"use client";

import { useEffect } from "react";
import { useModalStore } from "./modal.store";

export const ModalRoot = () => {
  const { isOpen, content, close } = useModalStore();

  useEffect(() => {
    if (!isOpen) return;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

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
