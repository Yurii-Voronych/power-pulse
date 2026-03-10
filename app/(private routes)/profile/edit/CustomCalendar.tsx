"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";

export default function Calendar() {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <div className="w-[215px] h-[236px] bg-orange-1 rounded-[30px] p-3 text-white flex items-center justify-center">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        showOutsideDays
        weekStartsOn={1}
        classNames={{
          root: "w-full h-full",
          today: "text-red-500",
          selected: "bg-black rounded-full grow-1",
          day: "w-7 h-7 p-1 text-[14px] m-0",
        }}
      />
    </div>
  );
}
