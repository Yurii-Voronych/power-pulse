"use client";
import { Exercise } from "@/lib/shared/types/types";
import { useModalStore } from "./ui/modal/modal.store";
import ExerciseDetails from "./ExerciseDetails";

interface ExerciseCardProp {
  exercise: Exercise;
  userWeight: number | undefined;
}
const ExerciseCard = ({ exercise, userWeight }: ExerciseCardProp) => {
  const countEstimatedBurnedCalories = () => {
    if (typeof userWeight === "number" && typeof exercise.met === "number") {
      return Math.ceil(exercise.met * userWeight);
    }

    return exercise.burnedCalories;
  };
  const { open } = useModalStore();
  const handleOpenDetails = () => {
    open(
      <ExerciseDetails
        exercise={exercise}
        calories={countEstimatedBurnedCalories()}
      />,
      "dark",
    );
  };

  return (
    <button
      type="button"
      onClick={handleOpenDetails}
      className="group relative flex h-35.25 w-full flex-col overflow-hidden rounded-xl border border-white/20 p-4 text-left shadow-[0_0_0_rgba(230,83,60,0)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/40 hover:bg-orange/5 hover:shadow-[0_10px_24px_rgba(230,83,60,0.14)] focus-visible:border-orange focus-visible:outline-none focus-visible:shadow-[0_10px_24px_rgba(230,83,60,0.14)] active:translate-y-0"
    >
      <h3 className="line-clamp-2 min-w-0 break-words text-[20px] leading-tight text-white">
        {exercise.name}
      </h3>

      <div className="mt-auto min-w-0 space-y-1 text-[14px] leading-tight">
        <p className="flex min-w-0 gap-1 text-white/40">
          <span className="shrink-0">Est. burned per hour:</span>
          <span className="truncate font-medium text-white">
            {countEstimatedBurnedCalories()}
          </span>
        </p>
        <p className="flex min-w-0 gap-1 capitalize text-white/40">
          <span className="shrink-0">Body part:</span>
          <span className="truncate font-medium text-white">
            {exercise.bodyPart}
          </span>
        </p>
        <p className="flex min-w-0 gap-1 capitalize text-white/40">
          <span className="shrink-0">Target:</span>
          <span className="truncate font-medium text-white">
            {exercise.target}
          </span>
        </p>
      </div>

      <span className="absolute right-4 bottom-[38px] rounded-xl bg-orange px-4 py-3 text-[14px] font-medium leading-none text-white shadow-[0_10px_22px_rgba(230,83,60,0.24)] transition-all duration-200 md:bottom-4 md:opacity-0 md:shadow-[0_0_0_rgba(230,83,60,0)] md:group-hover:opacity-100 md:group-hover:shadow-[0_10px_22px_rgba(230,83,60,0.36)] md:group-focus-visible:opacity-100 md:group-focus-visible:shadow-[0_10px_22px_rgba(230,83,60,0.36)]">
        Info
      </span>
    </button>
  );
};

export default ExerciseCard;
