"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Exercise } from "@/lib/shared/types/types";
import { useModalStore } from "./ui/modal/modal.store";
import { addExercisesToDiary } from "@/lib/client/api/diaryApi";
import {
  formatDiaryDate,
  getDiaryDateRange,
} from "@/lib/shared/utils/diaryDate";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";
import DiaryDateSelect from "./DiaryDateSelect";
import useAuthStore from "@/lib/client/store/authStore";

interface ExerciseDetailsProps {
  exercise: Exercise;
  calories: number;
}

const ExerciseDetails = ({ exercise, calories }: ExerciseDetailsProps) => {
  const close = useModalStore((s) => s.close);
  const [draftTime, setDraftTime] = useState("10");
  const [selectedDate, setSelectedDate] = useState(formatDiaryDate(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const diaryDateRange = getDiaryDateRange(
    user?.createdAt ?? new Date().toISOString(),
  );

  const timeValidation = validateNumberInput(draftTime, {
    label: "Duration",
    min: 1,
    max: 1440,
    integer: true,
  });
  const nextTime = timeValidation.value ?? 0;
  const burnedCalories = Math.round((calories / 60) * nextTime);
  const isInvalidTime = !timeValidation.isValid;

  const handleAddExercise = async () => {
    if (isInvalidTime) return;

    try {
      setIsLoading(true);
      await addExercisesToDiary({
        date: selectedDate,
        exercises: [
          {
            exerciseId: exercise.id,
            name: exercise.name,
            caloriesPerHour: calories,
            time: String(nextTime),
          },
        ],
      });
      toast.success("Exercise added");
      close();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-lg overflow-y-auto overflow-x-hidden rounded-xl border border-white/50 bg-[#10100F] p-5 md:p-8 2xl:max-w-xl 2xl:p-10">
      <div className="mb-4">
        <div>
          <p className="mb-1 text-[12px] font-medium uppercase tracking-[0.08em] text-orange">
            Add exercise
          </p>
          <h2 className="line-clamp-2 min-w-0 break-words text-[20px] font-semibold leading-tight text-white 2xl:text-[24px]">
            {exercise.name}
          </h2>
        </div>
      </div>

      <Image
        src={exercise.gifUrl}
        width={270}
        height={226}
        alt=""
        unoptimized
        className="mb-4 h-56.5 w-full object-contain md:h-70"
      />

      <ul className="mb-4 grid w-full grid-cols-2 gap-2">
        <li className="min-w-0 rounded-xl border border-white/20 bg-white/5 p-1.5">
          <p className="text-[12px] text-white/40">Calories / hour:</p>
          <p className="truncate text-[14px] font-semibold text-white">
            {calories}
          </p>
        </li>
        <li className="min-w-0 rounded-xl border border-white/20 bg-white/5 p-1.5">
          <p className="text-[12px] text-white/40">Target:</p>
          <p
            className="truncate text-[14px] font-semibold text-white"
            title={exercise.target}
          >
            {exercise.target}
          </p>
        </li>
        <li className="min-w-0 rounded-xl border border-white/20 bg-white/5 p-1.5">
          <p className="text-[12px] text-white/40">Body part:</p>
          <p
            className="truncate text-[14px] font-semibold text-white"
            title={exercise.bodyPart}
          >
            {exercise.bodyPart}
          </p>
        </li>
        <li className="min-w-0 rounded-xl border border-white/20 bg-white/5 p-1.5">
          <p className="text-[12px] text-white/40">Equipment:</p>
          <p
            className="truncate text-[14px] font-semibold text-white"
            title={exercise.equipment}
          >
            {exercise.equipment}
          </p>
        </li>
      </ul>

      <DiaryDateSelect
        date={selectedDate}
        minDate={diaryDateRange.minDate}
        maxDate={diaryDateRange.maxDate}
        onChange={setSelectedDate}
        className="mb-4 w-full"
        popoutPlacement="top"
      />

      <label className="form-input relative mb-4 flex w-full min-w-0 items-center gap-1 pr-14 text-white 2xl:text-[18px]">
        <span className="shrink-0 whitespace-nowrap text-white/60">
          Duration:
        </span>
        <input
          type="text"
          aria-label="Exercise duration in minutes"
          value={draftTime}
          inputMode="numeric"
          min={1}
          max={1440}
          className="min-w-0 flex-1 bg-transparent text-white outline-none"
          onChange={(e) => setDraftTime(e.currentTarget.value)}
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-white/60">
          min
        </span>
      </label>

      {isInvalidTime ? (
        <p className="mb-4 text-red-500 2xl:text-[18px]">
          {timeValidation.error}
        </p>
      ) : (
        <p className="mb-4 2xl:text-[18px]">Calories: {burnedCalories}</p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="btn-outline min-w-0 w-full disabled:opacity-40"
          onClick={close}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-primary min-w-0 w-full disabled:opacity-40"
          disabled={isInvalidTime || isLoading}
          onClick={handleAddExercise}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetails;
