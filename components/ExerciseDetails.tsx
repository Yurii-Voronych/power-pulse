"use client";
import { Exercise } from "@/lib/shared/types/types";
import Image from "next/image";
import CloseIcon from "./icons/CloseIcon";
import { useModalStore } from "./ui/modal/modal.store";
import { useState } from "react";
import toast from "react-hot-toast";
import { addExercisesToDiary } from "@/lib/client/api/diaryApi";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";

interface ExerciseDetailsProps {
  exercise: Exercise;
  calories: number;
}
const ExerciseDetails = ({ exercise, calories }: ExerciseDetailsProps) => {
  const close = useModalStore((s) => s.close);
  const [draftTime, setDraftTime] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const timeValidation = validateNumberInput(draftTime, {
    label: "Time",
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
        date: formatDiaryDate(new Date()),
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
    <div className="relative z-10 w-[calc(100%_-_40px)] max-w-83.75 rounded-xl border border-white/35 bg-[#10100f] md:max-w-125 xl:max-w-150">
      <button
        type="button"
        className="ml-auto block mt-2 mr-2 text-orange"
        onClick={close}
      >
        <CloseIcon />
      </button>
      <div className="p-4 flex items-center flex-col ">
        <Image
          src={exercise.gifUrl}
          width={270}
          height={226}
          alt=""
          unoptimized
          className="mb-6 h-56.5 w-full object-contain md:h-75"
        />
        <p className="text-white/40 mb-6">
          Estimated Calories per hour :{" "}
          <span className="text-orange"> {calories}</span>
        </p>
        <ul className="grid w-full grid-cols-2 gap-2 mb-6">
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Name:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.name}
            >
              {exercise.name}
            </p>
          </li>
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Target:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.target}
            >
              {exercise.target}
            </p>
          </li>
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Body part:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.bodyPart}
            >
              {exercise.bodyPart}
            </p>
          </li>
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Equipment:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.equipment}
            >
              {exercise.equipment}
            </p>
          </li>
        </ul>
        <label className="mb-2">
          Duration
            <input
              type="text"
              inputMode="numeric"
              min={1}
              max={1440}
              className="w-15 pl-2 bg-transparent rounded-md border border-white/50 text-white outline-none focus:border focus:border-orange mr-1 ml-1"
              value={draftTime}
              onChange={(e) => setDraftTime(e.currentTarget.value)}
          />{" "}
          min
        </label>
        {isInvalidTime ? (
          <p className="text-red-500 mb-3">{timeValidation.error}</p>
        ) : (
          <p className="mb-3">
            Estimated burned calories{" "}
            <span className="text-orange ">{burnedCalories}</span>
          </p>
        )}

        <button
          type="button"
          className="btn-primary w-full disabled:opacity-40 md:w-auto"
          disabled={isInvalidTime || isLoading}
          onClick={handleAddExercise}
        >
          Add to Diary
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetails;
