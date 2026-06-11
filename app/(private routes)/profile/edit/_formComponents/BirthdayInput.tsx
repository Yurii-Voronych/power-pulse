"use client";

import { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parse, isValid, format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { MAX_AGE, MIN_AGE } from "@/lib/shared/constants/constants";

type Props = {
  name: string;
  error?: string;
  touched?: boolean;
};

export default function BirthdayInput({ name, error, touched }: Props) {
  const [field, , helpers] = useField<string>(name);
  const { value } = field;
  const { setValue } = helpers;
  const [open, setOpen] = useState(false);
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - MIN_AGE);
  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - MAX_AGE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(false);
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

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && field.value.endsWith(".")) {
      e.preventDefault();
      helpers.setValue(field.value.slice(0, -2));
    }
  };

  const handleSelect = async (date: Date | undefined) => {
    if (!date) return;

    const formatted = format(date, "dd.MM.yyyy");

    await helpers.setValue(formatted, true);
    await helpers.setTouched(true, false);

    setOpen(false);
  };

  const parsedDate = (() => {
    const parsed = parse(value, "dd.MM.yyyy", new Date());
    return isValid(parsed) ? parsed : undefined;
  })();

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        inputMode="numeric"
        maxLength={10}
        placeholder=" "
        value={value}
        name={name}
        id={name}
        autoComplete="bday"
        aria-invalid={Boolean(touched && error)}
        aria-describedby={touched && error ? "birthday-error" : undefined}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={field.onBlur}
        className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
          Boolean(touched && error)
            ? "border-[#d80027] focus:border-[#d80027]"
            : "border-white/30 focus:border-orange"
        }`}
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
      >
        Birthday
      </label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close birthday calendar" : "Open birthday calendar"}
        aria-expanded={open}
        aria-controls={`${name}-calendar`}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Calendar1Icon aria-hidden="true" />
      </button>
      {open && (
        <div
          id={`${name}-calendar`}
          role="dialog"
          aria-label="Choose birthday"
          className="absolute top-full max-md:right-0 mt-2 z-50 md:left-45.5 md:-top-2"
        >
          <div className="w-53.75 h-59 bg-orange-1 rounded-[30px] p-3 text-white flex items-center justify-center">
            <DayPicker
              mode="single"
              selected={parsedDate}
              defaultMonth={parsedDate ?? eighteenYearsAgo}
              onSelect={handleSelect}
              startMonth={hundredYearsAgo}
              endMonth={eighteenYearsAgo}
              showOutsideDays
              weekStartsOn={1}
              disabled={{ after: eighteenYearsAgo }}
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
                nav: "absolute left-0 right-0 top-0 z-10 flex h-[38px] items-start justify-between",
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
                today: "[&>button]:ring-2 [&>button]:ring-red-500 text-red-500",
                outside: "text-white/30",
                disabled: "text-white/20 pointer-events-none",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
