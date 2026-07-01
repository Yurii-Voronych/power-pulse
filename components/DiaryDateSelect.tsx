"use client";

import "react-day-picker/dist/style.css";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  format,
  isAfter,
  isBefore,
  isValid,
  parse,
  startOfMonth,
} from "date-fns";
import { CalendarIcon } from "./icons/CalendarIcon";

interface DiaryDateSelectProps {
  date: string;
  minDate: string;
  maxDate: string;
  onChange: (date: string) => void;
  className?: string;
  popoutPlacement?: "top" | "bottom";
}

const parsePickerDate = (date: string) => parse(date, "yyyy-MM-dd", new Date());
const formatPickerDate = (date: Date) => format(date, "yyyy-MM-dd");

const DiaryDateSelect = ({
  date,
  minDate,
  maxDate,
  onChange,
  className,
  popoutPlacement = "bottom",
}: DiaryDateSelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const minParsedDate = parsePickerDate(minDate);
  const maxParsedDate = parsePickerDate(maxDate);

  const parsedDate = (() => {
    const parsed = parsePickerDate(date);
    return isValid(parsed) ? parsed : new Date();
  })();

  const [manualMonth, setManualMonth] = useState<{
    date: string;
    month: Date;
  } | null>(null);

  const month =
    manualMonth?.date === date ? manualMonth.month : startOfMonth(parsedDate);

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return;
    if (isBefore(selected, minParsedDate) || isAfter(selected, maxParsedDate)) {
      return;
    }

    onChange(formatPickerDate(selected));
    setOpen(false);
  };

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

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="form-input flex w-full min-w-0 items-center justify-between text-white"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-1 whitespace-nowrap">
          <span className="shrink-0 text-white/60">Date:</span>
          <span className="truncate text-white">{date}</span>
        </span>
        <CalendarIcon className="text-orange" />
      </button>

      {open && (
        <div
          className={`absolute right-0 z-50 w-53.75 min-h-59 rounded-[30px] bg-black p-3 text-white shadow-2xl ${
            popoutPlacement === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <DayPicker
            mode="single"
            selected={parsedDate}
            month={month}
            onMonthChange={(nextMonth) => {
              setManualMonth({ date, month: nextMonth });
            }}
            startMonth={startOfMonth(minParsedDate)}
            endMonth={startOfMonth(maxParsedDate)}
            onSelect={handleSelect}
            showOutsideDays
            weekStartsOn={1}
            disabled={[{ before: minParsedDate }, { after: maxParsedDate }]}
            modifiers={{
              available: [
                {
                  from: minParsedDate,
                  to: maxParsedDate,
                },
              ],
            }}
            modifiersClassNames={{
              available:
                "[&>button:not(:disabled)]:text-white [&>button:not(:disabled)]:hover:bg-white/20",
            }}
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
                "--rdp-disabled-opacity": "0.22",
              } as React.CSSProperties,
            }}
            classNames={{
              root: "relative h-full w-full text-white",
              month: "w-full",
              month_caption:
                "relative mb-3 flex h-[38px] items-center justify-center border-b border-white/20 pb-3 pointer-events-none",
              caption_label: "text-[20px] font-medium leading-none text-white",
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
                "mx-auto flex size-6 items-center justify-center rounded-full text-[14px] font-normal leading-none hover:bg-black/15 disabled:cursor-default",
              selected:
                "font-normal text-white [&>button]:ring-2 [&>button]:ring-blue-400/80",
              today: "[&>button]:!bg-blue-400/80",
              outside: "text-white/30",
              disabled: "text-white/20",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DiaryDateSelect;
