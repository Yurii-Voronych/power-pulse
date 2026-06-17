import { Exercise } from "@/lib/shared/types/types";

interface drawerExercisesListProps {
  exercises: Exercise[];
  userWeight: number | undefined;
  selectedExercisesIds: string[];
  onAddExercise: (exercise: Exercise) => void;
}
const DrawerExercisesList = ({
  exercises,
  userWeight,
  selectedExercisesIds,
  onAddExercise,
}: drawerExercisesListProps) => {
  return (
    <ul className="flex flex-col gap-2 ">
      {exercises.map((e) => {
        const countBurnedCalories = () => {
          if (userWeight !== undefined) return Math.ceil(userWeight * e.met);
          else return e.burnedCalories;
        };
        const isSelected = selectedExercisesIds.includes(e.id);
        return (
          <li
            key={e.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/3 p-1.5"
          >
            <div className="flex justify-between w-full">
              <p className="truncate max-w-50 text-[14px] font-medium">
                {e.name}
              </p>
              <p className="text-[12px] text-white/40">
                {countBurnedCalories()} kcal/h
              </p>
            </div>

            {isSelected ? (
              <button
                type="button"
                className="shrink-0 rounded-xl border border-orange px-3 py-1.5 text-[12px] text-orange"
                disabled
              >
                Added
              </button>
            ) : (
              <button
                type="button"
                className="shrink-0 rounded-xl border border-orange px-3 py-1.5 text-[12px] text-orange"
                onClick={() => onAddExercise(e)}
              >
                Add
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default DrawerExercisesList;
