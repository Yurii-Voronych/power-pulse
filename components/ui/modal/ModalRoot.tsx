"use client";

import { useEffect } from "react";
import { useModalStore } from "./modal.store";
import clsx from "clsx";

export const ModalRoot = () => {
  const { isOpen, content, options, close } = useModalStore();

  useEffect(() => {
    if (!isOpen) return;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && options.closeOnEscape) {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, options.closeOnEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={clsx(
          "absolute inset-0 w-full h-full",
          options.backdropClassName,
        )}
        onClick={() => {
          if (options.closeOnBackdrop) {
            close();
          }
        }}
      />

      <div
        className={clsx(
          "relative z-10 flex justify-center items-center",
          options.contentClassName,
        )}
      >
        {content}
      </div>
    </div>
  );
};
