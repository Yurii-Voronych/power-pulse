import clsx from "clsx";
import { SelectedExercise } from "@/lib/shared/types/types";

interface SelectedExercisesBoxProps {
  selectedExercises: SelectedExercise[];
  onTimeChange: (exerciseId: string, time: string) => void;
  onRemove: (exerciseId: string) => void;
  onSave: () => void | Promise<void>;
  canSave: boolean;
  isSaving: boolean;
}

export const SelectedExercisesBox = ({
  selectedExercises,
  onRemove,
  onTimeChange,
  onSave,
  canSave,
  isSaving,
}: SelectedExercisesBoxProps) => {
  if (selectedExercises.length === 0) return null;

  const totalBurnedCalories = selectedExercises.reduce((total, exercise) => {
    return total + (exercise.burnedCalories * exercise.time) / 60;
  }, 0);

  const isTimeInvalid = (time: number) => {
    return !Number.isInteger(time) || time <= 0 || time > 1440;
  };

  return (
    <div className="mb-3 rounded-xl border border-white/15 bg-white/3 p-1.5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold">Selected exercises</h3>
          <p className="text-[12px] text-white/40">
            {selectedExercises.length} item
            {selectedExercises.length === 1 ? "" : "s"} -{" "}
            {Math.ceil(totalBurnedCalories)} kcal
          </p>
        </div>

        <button
          type="button"
          className="btn-primary max-w-20 disabled:opacity-40 md:hidden"
          disabled={!canSave}
          onClick={onSave}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      <ul className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-1">
        {selectedExercises.map((exercise) => {
          const invalidTime = isTimeInvalid(exercise.time);

          return (
            <li
              key={exercise.exerciseId}
              className="rounded-lg border border-white/10 bg-black/40 p-2"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium">
                    {exercise.name}
                  </p>
                  <p className="text-[12px] text-white/40">
                    {exercise.burnedCalories} kcal / hour
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onRemove(exercise.exerciseId);
                  }}
                  className="shrink-0 text-[12px] text-orange"
                >
                  Remove
                </button>
              </div>

              <label className="relative flex w-fit items-center gap-2 text-[12px] text-white/50">
                Time
                <input
                  type="text"
                  inputMode="numeric"
                  min={1}
                  max={1440}
                  value={exercise.time}
                  onChange={(e) => {
                    onTimeChange(exercise.exerciseId, e.currentTarget.value);
                  }}
                  className={clsx(
                    "h-9 w-24 rounded-lg border bg-transparent px-3 text-[14px] text-white outline-none focus:border-orange",
                    invalidTime ? "border-red-500" : "border-white/15",
                  )}
                />
                min
                {invalidTime && <p className="text-red-500">Invalid</p>}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
