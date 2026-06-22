"use client";

import "react-day-picker/dist/style.css";
import { useEffect, useRef, useState, useTransition } from "react";
import { CalendarIcon } from "./CalendarIcon";
import { NextIcon } from "./NextArrowIcon";
import { DayPicker } from "react-day-picker";
import {
  parse,
  isValid,
  format,
  addDays,
  isAfter,
  isBefore,
  startOfMonth,
} from "date-fns";
import { useRouter } from "next/navigation";

interface DiaryDatePickerProps {
  date: string;
  minDate: string;
  maxDate: string;
}

const DiaryDatePicker = ({ date, minDate, maxDate }: DiaryDatePickerProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parsePickerDate = (date: string) =>
    parse(date, "yyyy-MM-dd", new Date());
  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  const minParsedDate = parsePickerDate(minDate);
  const maxParsedDate = parsePickerDate(maxDate);

  const parsedDate = (() => {
    const parsed = parsePickerDate(date);
    return isValid(parsed) ? parsed : new Date();
  })();
  const selectedMonth = startOfMonth(parsedDate);

  const [manualMonth, setManualMonth] = useState<{
    date: string;
    month: Date;
  } | null>(null);

  const month = manualMonth?.date === date ? manualMonth.month : selectedMonth;

  const canGoPrev = isAfter(parsedDate, minParsedDate);
  const canGoNext = isBefore(parsedDate, maxParsedDate);

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return;
    if (isBefore(selected, minParsedDate) || isAfter(selected, maxParsedDate)) {
      return;
    }

    const formatted = formatDate(selected);
    startTransition(() => {
      router.push(`/diary/${formatted}`);
    });
    setOpen(false);
  };

  const handlePrev = () => {
    if (!canGoPrev || isPending) return;

    const prev = formatDate(addDays(parsedDate, -1));
    startTransition(() => {
      router.push(`/diary/${prev}`);
    });
  };

  const handleNext = () => {
    if (!canGoNext || isPending) return;

    const next = formatDate(addDays(parsedDate, 1));
    startTransition(() => {
      router.push(`/diary/${next}`);
    });
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  return (
    <div ref={containerRef} className="flex items-center gap-3 relative">
      <p className="text-lg font-semibold">
        {format(parsedDate, "dd/MM/yyyy")}
      </p>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex size-4.5 items-center justify-center"
      >
        {isPending ? (
          <span
            className="block size-4.5 animate-spin rounded-full border-2 border-orange border-t-transparent"
            aria-label="Loading diary date"
          />
        ) : (
          <CalendarIcon className="text-orange" />
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 z-50 w-53.75 min-h-59 bg-orange-1 rounded-[30px] p-3 text-white">
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
                "[&>button:not(:disabled)]:bg-green-400/44 [&>button:not(:disabled)]:text-white [&>button:not(:disabled)]:hover:bg-white/20",
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
              root: "relative w-full h-full text-white",
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
                "font-normal text-white [&>button]:!bg-black [&>button]:text-white",
              today: "[&>button]:ring-2 [&>button]:ring-red-500 text-red-500",
              outside: "text-white/30",
              disabled: "text-white/20",
            }}
          />
        </div>
      )}
      <button
        type="button"
        onClick={handlePrev}
        disabled={!canGoPrev || isPending}
        className={!canGoPrev || isPending ? "opacity-30" : undefined}
      >
        <NextIcon className={`rotate-180 ${isPending ? "animate-pulse" : ""}`} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={!canGoNext || isPending}
        className={!canGoNext || isPending ? "opacity-30" : undefined}
      >
        <NextIcon className={isPending ? "animate-pulse" : undefined} />
      </button>
    </div>
  );
};

export default DiaryDatePicker;
