import { DiaryExercise } from "@/lib/shared/types/diary";
import { NextIcon } from "./icons/NextArrowIcon";

interface ExercisesGridProps {
  exercises: DiaryExercise[];
}

const ExercisesGrid = ({ exercises }: ExercisesGridProps) => {
  const hasExercises = exercises.length > 0;

  return (
    <div
      className={`w-full border border-white/20 p-4 rounded-xl mb-10 ${
        hasExercises ? "xl:min-h-50" : ""
      }`}
    >
      <div className="flex justify-between text-white/50 text-[14px]">
        <p>Exercises</p>
        <button className="flex text-[14px] text-orange gap-2">
          Add exercise
          <NextIcon />
        </button>
      </div>
      {!hasExercises && (
        <p className="text-center text-[14px] text-white/30 py-8">
          No exercises found
        </p>
      )}
    </div>
  );
};

export default ExercisesGrid;
