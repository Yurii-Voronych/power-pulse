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
    <div className="relative text-[14px]" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between form-input text-white capitalize ${className}`}
      >
        {selected?.name || placeholder}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 bg-[#1c1c1c] rounded-xl max-h-50 overflow-hidden z-50 pr-2">
          <div className="max-h-50 overflow-y-auto custom-scrollbar pt-1 pb-1.5">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="block w-full cursor-pointer capitalize pl-3.5 pt-2 pb-2 text-left"
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
