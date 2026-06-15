"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Options {
  id: string;
  value: string;
  name: string;
}

type Props = {
  param: string;
  options: Options[];
  onChange: (key: string, v: string) => void;
  chosen: string;
};

export const CustomSelect = ({ options, onChange, param, chosen }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listboxId = useId();
  const selected = options.find((option) => option.value === chosen);

  const focusOption = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, options.length - 1));

    setActiveIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  };

  const openAndFocus = (index: number) => {
    setOpen(true);
    setActiveIndex(index);

    requestAnimationFrame(() => {
      optionRefs.current[index]?.focus();
    });
  };

  const closeAndFocusTrigger = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <div className="relative w-full text-[14px]" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={param === "category" ? "Product category" : param}
        aria-expanded={open}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={(event) => {
          const selectedIndex = Math.max(
            0,
            options.findIndex((option) => option.value === chosen),
          );

          if (event.key === "ArrowDown") {
            event.preventDefault();
            openAndFocus(selectedIndex);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openAndFocus(
              selectedIndex === 0 ? options.length - 1 : selectedIndex,
            );
          }
        }}
        className="form-input flex w-full items-center justify-between capitalize text-white"
      >
        {selected?.name || (param === "category" ? "Category" : "All")}
        <ChevronDown aria-hidden="true" size={16} />
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={param === "category" ? "Product categories" : param}
          className="absolute top-full z-50 mt-2 max-h-54 w-full overflow-hidden rounded-xl bg-[#1c1c1c] pr-2 pt-2"
        >
          <div className="custom-scrollbar max-h-50 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={option.id}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={option.value === chosen}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => {
                  onChange(param, option.value);
                  closeAndFocusTrigger();
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    focusOption((index + 1) % options.length);
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    focusOption((index - 1 + options.length) % options.length);
                  } else if (event.key === "Home") {
                    event.preventDefault();
                    focusOption(0);
                  } else if (event.key === "End") {
                    event.preventDefault();
                    focusOption(options.length - 1);
                  } else if (event.key === "Escape") {
                    event.preventDefault();
                    closeAndFocusTrigger();
                  }
                }}
                className="block w-full cursor-pointer px-3.5 py-2 text-left capitalize"
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
