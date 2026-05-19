import { Exercise } from "@/lib/shared/types/types";
import { PersonIcon } from "./icons/PersonIcon";

interface ExerciseCardProp {
  exercise: Exercise;
}
const ExerciseCard = async ({ exercise }: ExerciseCardProp) => {
  return (
    <div
      className="w-83.75
  h-35.25 border border-white/20 rounded-xl p-4"
    >
      <button className="text-orange ml-auto block mb-7">start</button>
      <div className="flex gap-4 w-70 mb-2">
        <div className="w-6 h-6 rounded-full bg-orange-1 flex justify-center items-center shrink-0">
          <PersonIcon className="w-4 h-4" />
        </div>
        <span className="truncate">{exercise.name}</span>
      </div>
      <div className="flex text-[12px] justify-between">
        <div>
          <span className="text-white/40">Burned Calories:</span>
          {exercise.burnedCalories}
        </div>
        <div className="capitalize">
          <span className="text-white/40">Body Part:</span>
          {exercise.bodyPart}
        </div>
        <div>
          <span className="text-white/40">Target:</span>
          {exercise.target}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
