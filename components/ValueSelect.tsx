"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type SelectOption = {
  id: string;
  value: string;
  name: string;
};

type ValueSelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const ValueSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select",
  className = "w-40",
}: ValueSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <div className="relative w-full min-w-0 text-[14px]" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`form-input flex w-full min-w-0 items-center justify-between capitalize text-white ${className}`}
      >
        {selected?.name || placeholder}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-50 overflow-hidden rounded-xl bg-[#1c1c1c] pr-2">
          <div className="custom-scrollbar max-h-50 w-full overflow-y-auto pt-1 pb-1.5">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
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
