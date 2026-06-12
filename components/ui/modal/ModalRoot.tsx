"use client";

import { useEffect, useRef } from "react";
import { useModalStore } from "./modal.store";

export const ModalRoot = () => {
  const { isOpen, content, backdrop, close } = useModalStore();
  const dialogRef = useRef<HTMLDivElement>(null);

  const backdropClassName = backdrop === "orange" ? "bg-orange" : "bg-black/50";

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const dialog = dialogRef.current;
    const getFocusableElements = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    (getFocusableElements()[0] ?? dialog)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (e.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        e.preventDefault();
        dialog?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Dialog"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full ${backdropClassName}`}
        onClick={close}
      />
      {content}
    </div>
  );
};
