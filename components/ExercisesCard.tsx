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
    <div className="w-full h-35.25 border border-white/20 rounded-xl p-4">
      <div className="flex justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-4 items-center">
          <div className="w-6 h-6 rounded-full bg-orange-1 flex justify-center items-center shrink-0">
            <PersonIcon className="w-4 h-4" />
          </div>
          <span className="min-w-0 truncate" title={exercise.name}>
            {exercise.name}
          </span>
        </div>
        <button
          className="shrink-0 text-orange flex gap-2 items-center"
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
          Info <NextIcon />
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
