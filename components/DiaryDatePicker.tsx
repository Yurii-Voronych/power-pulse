"use client";

import "react-day-picker/dist/style.css";
import { useEffect, useRef, useState, useTransition } from "react";
import { CalendarIcon } from "./icons/CalendarIcon";
import { NextIcon } from "./icons/NextArrowIcon";
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
  const nextHref = `/diary/${formatDate(addDays(parsedDate, 1))}`;
  const prevHref = `/diary/${formatDate(addDays(parsedDate, -1))}`;
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

    startTransition(() => {
      router.push(prevHref);
    });
  };

  const handleNext = () => {
    if (!canGoNext || isPending) return;

    startTransition(() => {
      router.push(nextHref);
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

  useEffect(() => {
    if (canGoNext) {
      router.prefetch(nextHref);
    }

    if (canGoPrev) {
      router.prefetch(prevHref);
    }
  }, [router, prevHref, nextHref, canGoPrev, canGoNext]);

  return (
    <div ref={containerRef} className="flex items-center gap-3 relative">
      {open && (
        <div className="absolute top-full right-0 mt-2 z-50 w-53.75 min-h-59 bg-black rounded-[30px] p-3 text-white">
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
                "[&>button:not(:disabled)]: [&>button:not(:disabled)]:text-white [&>button:not(:disabled)]:hover:bg-white/20",
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
                "font-normal text-white [&>button]:ring-2 [&>button]:ring-blue-400/80",
              today: "[&>button]:!bg-blue-400/80",
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
        <NextIcon
          className={`rotate-180 hover:text-orange ${isPending ? "animate-pulse" : ""}`}
        />
      </button>
      <p className="text-2xl text-white/70 font-bold">
        {format(parsedDate, "dd/MM/yyyy")}
      </p>
      <button
        type="button"
        onClick={handleNext}
        disabled={!canGoNext || isPending}
        className={!canGoNext || isPending ? "opacity-30" : undefined}
      >
        <NextIcon
          className={`hover:text-orange ${isPending ? "animate-pulse" : undefined} `}
        />
      </button>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex size-5 items-center justify-center"
      >
        {isPending ? (
          <span
            className="block size-5 animate-spin rounded-full border-2 border-orange border-t-transparent"
            aria-label="Loading diary date"
          />
        ) : (
          <CalendarIcon className="text-white hover:text-orange" />
        )}
      </button>
    </div>
  );
};

export default DiaryDatePicker;
