"use client";
import { DiaryExercise } from "@/lib/shared/types/diary";
import { NextIcon } from "./icons/NextArrowIcon";
import { useState } from "react";
import AddExercisesDrawer from "./AddExercisesDrawer";

interface ExercisesGridProps {
  initialExercises: DiaryExercise[];
  date: string;
  userWeight: number | undefined;
}

const ExercisesGrid = ({
  initialExercises,
  date,
  userWeight,
}: ExercisesGridProps) => {
  const [exercises, setExercises] = useState(initialExercises);
  const hasExercises = exercises.length > 0;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleExercisesAdded = (addedExercises: DiaryExercise[]) => {
    setExercises((prev) => [...prev, ...addedExercises]);
  };

  return (
    <div
      className={`w-full border border-white/20 p-4 rounded-xl mb-10 ${
        hasExercises ? "xl:min-h-50" : ""
      }`}
    >
      <div className="mb-3 flex justify-between text-white/50 text-[14px]">
        <p>Exercises</p>
        <button
          type="button"
          className="flex text-[14px] text-orange gap-2"
          onClick={() => setIsDrawerOpen(true)}
        >
          Add exercise
          <NextIcon />
        </button>
      </div>
      {hasExercises ? (
        <ul className="flex flex-col gap-2">
          {exercises.map((exercise) => (
            <li
              key={exercise.id}
              className="rounded-xl border border-white/10 bg-orange-500/10 px-3 py-2"
            >
              <p className="truncate text-[14px] font-medium text-orange-1">
                {exercise.name}
              </p>
              <p className="text-[14px] text-white/65">
                <span className="text-white">{exercise.burnedCalories}</span>{" "}
                kcal - <span className="text-white">{exercise.time}</span> min
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-center text-[14px] text-white/30">
          No exercises added yet
        </p>
      )}
      {isDrawerOpen && (
        <AddExercisesDrawer
          date={date}
          handleClose={() => setIsDrawerOpen(false)}
          userWeight={userWeight}
          onExercisesAdded={handleExercisesAdded}
        />
      )}
    </div>
  );
};

export default ExercisesGrid;
