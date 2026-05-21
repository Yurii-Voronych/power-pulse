"use client";

import { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parse, isValid, format } from "date-fns";
import { Calendar1Icon } from "lucide-react";

type Props = {
  name: string;
};

export default function BirthdayInput({ name }: Props) {
  const [field, , helpers] = useField<string>(name);
  const { value } = field;
  const { setValue } = helpers;
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "");
    let out = "";
    if (v.length >= 1) out = v.substring(0, 2);
    if (v.length >= 3) out += "." + v.substring(2, 4);
    if (v.length >= 5) out += "." + v.substring(4, 8);
    setValue(out);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && field.value.endsWith(".")) {
      e.preventDefault();
      helpers.setValue(field.value.slice(0, -2));
    }
  };

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    const formatted = format(date, "dd.MM.yyyy");
    setValue(formatted);
    setOpen(false);
  };

  const parsedDate = (() => {
    const parsed = parse(value, "dd.MM.yyyy", new Date());
    return isValid(parsed) ? parsed : undefined;
  })();

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Birthday"
        value={value}
        name={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={field.onBlur}
        className="w-full h-11.5 2xl:h-12 p-3.5 border border-white/30 rounded-xl bg-transparent"
      />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Calendar1Icon />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 z-50 ">
          <div
            ref={containerRef}
            className="w-53.75 h-59 bg-orange-1 rounded-[30px] p-3 text-white flex items-center justify-center"
          >
            <DayPicker
              mode="single"
              selected={parsedDate}
              defaultMonth={parsedDate ?? new Date()}
              onSelect={handleSelect}
              showOutsideDays
              weekStartsOn={1}
              styles={{
                root: {
                  "--rdp-accent-color": "#efede8",
                  "--rdp-day-width": "27px",
                  "--rdp-day-height": "27px",
                  "--rdp-day_button-width": "24px",
                  "--rdp-day_button-height": "24px",
                  "--rdp-day_button-border": "0",
                  "--rdp-nav_button-width": "24px",
                  "--rdp-nav_button-height": "24px",
                  "--rdp-nav-height": "38px",
                  "--rdp-outside-opacity": "0.32",
                } as React.CSSProperties,
              }}
              classNames={{
                root: "relative w-full h-full text-white",
                month: "w-full",
                month_caption:
                  "relative mb-3 flex h-[38px] items-center justify-center border-b border-white/20 pb-3",
                caption_label:
                  "text-[20px] font-medium leading-none text-white",
                nav: "absolute left-0 right-0 top-0 flex h-[38px] items-start justify-between",
                button_previous:
                  "flex size-6 items-center justify-center text-white/70 hover:text-white",
                button_next:
                  "flex size-6 items-center justify-center text-white/70 hover:text-white",
                chevron: "size-4 fill-current",
                month_grid: "w-full border-separate border-spacing-0",
                weekdays: "mb-1",
                weekday:
                  "h-[27px] p-0 text-center text-[14px] font-medium leading-[27px] text-white/55",
                week: "h-[27px]",
                day: "size-[27px] p-0 text-center align-middle text-[14px] font-normal leading-none text-white",
                day_button:
                  "mx-auto flex size-6 items-center justify-center rounded-full text-[14px] font-normal leading-none hover:bg-black/15",
                selected:
                  "font-normal text-white [&>button]:bg-black [&>button]:text-white",
                today: "text-white",
                outside: "text-white/30",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
