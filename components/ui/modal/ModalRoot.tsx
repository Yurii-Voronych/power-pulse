"use client";

import { useEffect } from "react";
import { useModalStore } from "./modal.store";

export const ModalRoot = () => {
  const { isOpen, content, backdrop, close } = useModalStore();

  const backdropClassName = backdrop === "orange" ? "bg-orange" : "bg-black/50";

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
        className={`absolute inset-0 w-full h-full ${backdropClassName}`}
        onClick={close}
      />
      {content}
    </div>
  );
};
