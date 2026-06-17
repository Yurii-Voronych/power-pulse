import clsx from "clsx";
import { SelectedExercise } from "@/lib/shared/types/types";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";

interface SelectedExercisesBoxProps {
  selectedExercises: SelectedExercise[];
  onTimeChange: (exerciseId: string, time: string) => void;
  onRemove: (exerciseId: string) => void;
  onSave: () => void | Promise<void>;
  canSave: boolean;
  isSaving: boolean;
  className?: string;
  listClassName?: string;
}

export const SelectedExercisesBox = ({
  selectedExercises,
  onRemove,
  onTimeChange,
  onSave,
  canSave,
  isSaving,
  className,
  listClassName,
}: SelectedExercisesBoxProps) => {
  if (selectedExercises.length === 0) return null;

  const totalBurnedCalories = selectedExercises.reduce((total, exercise) => {
    const timeValidation = validateNumberInput(exercise.time, {
      label: "Time",
      min: 1,
      max: 1440,
      integer: true,
    });

    if (!timeValidation.isValid || timeValidation.value === null) {
      return total;
    }

    return total + (exercise.burnedCalories * timeValidation.value) / 60;
  }, 0);

  const validateTime = (time: string) => {
    return validateNumberInput(time, {
      label: "Time",
      min: 1,
      max: 1440,
      integer: true,
    });
  };

  return (
    <div
      className={clsx(
        "mb-3 rounded-xl border border-white/15 bg-white/3 p-1.5",
        className,
      )}
    >
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

      <ul
        className={clsx(
          "flex max-h-40 flex-col gap-2 overflow-y-auto pr-1 meals-scrollbar",
          listClassName,
        )}
      >
        {selectedExercises.map((exercise) => {
          const timeValidation = validateTime(exercise.time);

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
                    !timeValidation.isValid
                      ? "border-red-500"
                      : "border-white/15",
                  )}
                />
                min
                {timeValidation.error && (
                  <p className="text-red-500">{timeValidation.error}</p>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
