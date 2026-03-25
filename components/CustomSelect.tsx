"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
interface Options {
  _id: string;
  name: string;
}

type Props = {
  param: string;
  options: Options[];
  onChange: (v: string, key: string) => void;
};

export const CustomSelect = ({ options, onChange, param }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.name === o.name);

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
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-[200px] px-4 py-3 rounded-2xl border border-gray-700 bg-black text-white"
      >
        {selected?.name}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-lg max-h-[200px] overflow-y-auto z-50">
          {options.map((o) => (
            <div
              key={o._id}
              onClick={() => {
                onChange(param, o.name);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
            >
              {o.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
