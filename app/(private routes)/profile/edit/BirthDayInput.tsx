"use client";

import { useState } from "react";
import { useField } from "formik";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parse, isValid, format } from "date-fns";
import { Calendar1Icon } from "lucide-react";

type Props = {
  name: string;
};

export default function BirthdayInput({ name }: Props) {
  const [field, , helpers] = useField<Date | undefined>(name);
  const { value } = field;
  const { setValue } = helpers;

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    value ? format(value, "dd.MM.yyyy") : "",
  );

  const formatDateInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) return numbers;

    if (numbers.length <= 4)
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;

    return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(
      4,
      8,
    )}`;
  };

  const parseInputDate = (value: string) => {
    const parsed = parse(value, "dd.MM.yyyy", new Date());
    return isValid(parsed) ? parsed : undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);

    setInputValue(formatted);

    const parsed = parseInputDate(formatted);

    if (parsed) {
      setValue(parsed);
    }
  };

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    setValue(date);
    setInputValue(format(date, "dd.MM.yyyy"));
    setOpen(false);
  };

  const parsedDate = parseInputDate(inputValue);

  return (
    <div className="relative w-[159px]">
      <input
        type="text"
        placeholder="Birthday"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full h-11.5 p-3.5 border border-white/30 rounded-xl bg-transparent"
      />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Calendar1Icon />
      </button>
      {open && (
        <div className="absolute top-full mt-2 z-50">
          <div className="w-53.75 h-59 bg-orange-1 rounded-[30px] p-3 text-white flex items-center justify-center">
            <DayPicker
              mode="single"
              selected={parsedDate}
              defaultMonth={parsedDate ?? new Date()}
              onSelect={handleSelect}
              showOutsideDays
              weekStartsOn={1}
              classNames={{
                root: "w-full h-full",
                day_selected: "!bg-black !text-white rounded-full",
                day_today: "!text-red-500",
                day: "w-7 h-7 p-1 text-[14px] m-0",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
