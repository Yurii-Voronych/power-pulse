"use client";

import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === chosen);

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
    <div className="relative text-[14px] w-full" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between form-input text-white capitalize w-full"
      >
        {selected?.name || (param === "category" ? "category" : "all")}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute top-full mt-2  bg-[#1c1c1c] rounded-xl max-h-50 overflow-hidden z-50  pr-2">
          <div className="max-h-50 overflow-y-auto custom-scrollbar pt-1 pb-1.5">
            {options.map((o) => (
              <div
                key={o.id}
                onClick={() => {
                  onChange(param, o.value);
                  setOpen(false);
                }}
                className="cursor-pointer capitalize pl-3.5 pt-2 pb-2"
              >
                {o.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
