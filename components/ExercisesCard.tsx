"use client";
import { Exercise } from "@/lib/shared/types/types";
import { PersonIcon } from "./icons/PersonIcon";
import { useModalStore } from "./ui/modal/modal.store";
import { NextIcon } from "./icons/NextArrowIcon";
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
  return (
    <div className="h-35.25 w-full rounded-xl border border-white/20 p-4">
      <div className="flex justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-4 items-center">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-1">
            <PersonIcon className="w-4 h-4" />
          </div>
          <span className="min-w-0 truncate" title={exercise.name}>
            {exercise.name}
          </span>
        </div>
        <button
          className="group flex shrink-0 items-center gap-2 text-orange transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-1 active:translate-y-0"
          onClick={() => {
            open(
              <ExerciseDetails
                exercise={exercise}
                calories={countEstimatedBurnedCalories()}
              />,
              "dark",
            );
          }}
        >
          Info{" "}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <NextIcon />
          </span>
        </button>
      </div>

      <div>
        <span className="text-white/40">Est. Burned Calories per hour: </span>
        {countEstimatedBurnedCalories()}
      </div>
      <div className="capitalize">
        <span className="text-white/40">Body Part: </span>
        {exercise.bodyPart}
      </div>
      <div>
        <span className="text-white/40">Target: </span>
        {exercise.target}
      </div>
    </div>
  );
};

export default ExerciseCard;
