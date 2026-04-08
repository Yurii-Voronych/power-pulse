"use client";

import "react-day-picker/dist/style.css";
import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "./CalendarIcon";
import { NextIcon } from "./NextArrowIcon";
import { DayPicker } from "react-day-picker";
import { parse, isValid, format, addDays } from "date-fns";
import { useRouter } from "next/navigation";

interface DiaryDatePickerProps {
  date: string;
}

const DiaryDatePicker = ({ date }: DiaryDatePickerProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const parsedDate = (() => {
    const parsed = parse(date, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? parsed : new Date();
  })();

  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return;

    const formatted = formatDate(selected);
    router.push(`/diary/${formatted}`);
    setOpen(false);
  };

  const handlePrev = () => {
    const prev = formatDate(addDays(parsedDate, -1));
    router.push(`/diary/${prev}`);
  };

  const handleNext = () => {
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
      <button onClick={handlePrev}>
        <NextIcon className="rotate-180" />
      </button>

      <button onClick={handleNext}>
        <NextIcon />
      </button>
    </div>
  );
};

export default DiaryDatePicker;
