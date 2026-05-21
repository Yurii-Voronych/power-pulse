"use client";

import "react-day-picker/dist/style.css";
import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "./CalendarIcon";
import { NextIcon } from "./NextArrowIcon";
import { DayPicker } from "react-day-picker";
import { parse, isValid, format, addDays, isAfter, isBefore } from "date-fns";
import { useRouter } from "next/navigation";

interface DiaryDatePickerProps {
  date: string;
  minDate: string;
  maxDate: string;
}

const DiaryDatePicker = ({ date, minDate, maxDate }: DiaryDatePickerProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parsePickerDate = (date: string) => parse(date, "yyyy-MM-dd", new Date());
  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  const minParsedDate = parsePickerDate(minDate);
  const maxParsedDate = parsePickerDate(maxDate);

  const parsedDate = (() => {
    const parsed = parsePickerDate(date);
    return isValid(parsed) ? parsed : new Date();
  })();

  const canGoPrev = isAfter(parsedDate, minParsedDate);
  const canGoNext = isBefore(parsedDate, maxParsedDate);

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return;
    if (isBefore(selected, minParsedDate) || isAfter(selected, maxParsedDate)) {
      return;
    }

    const formatted = formatDate(selected);
    router.push(`/diary/${formatted}`);
    setOpen(false);
  };

  const handlePrev = () => {
    if (!canGoPrev) return;

    const prev = formatDate(addDays(parsedDate, -1));
    router.push(`/diary/${prev}`);
  };

  const handleNext = () => {
    if (!canGoNext) return;

    const next = formatDate(addDays(parsedDate, 1));
    router.push(`/diary/${next}`);
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
    <div className="flex items-center gap-3 relative">
      <p className="text-lg font-semibold">
        {format(parsedDate, "dd/MM/yyyy")}
      </p>

      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        <CalendarIcon className="text-orange" />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <div
            ref={containerRef}
            className="w-53.75 h-59 bg-orange-1 rounded-[30px] p-3 text-white flex items-center justify-center"
          >
            <DayPicker
              mode="single"
              selected={parsedDate}
              defaultMonth={parsedDate}
              onSelect={handleSelect}
              showOutsideDays
              weekStartsOn={1}
              disabled={[{ before: minParsedDate }, { after: maxParsedDate }]}
              classNames={{
                root: "w-full h-full",
                day_selected: "!bg-black !text-white rounded-full",
                day_today: "!text-red-500",
                day: "w-7 h-7 p-1 text-[14px] m-0 align-center",
              }}
            />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={!canGoPrev ? "opacity-30" : undefined}
      >
        <NextIcon className="rotate-180" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={!canGoNext}
        className={!canGoNext ? "opacity-30" : undefined}
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default DiaryDatePicker;
