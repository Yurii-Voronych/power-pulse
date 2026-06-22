import { useEffect, useState } from "react";
import { NextIcon } from "./icons/NextArrowIcon";
import DrawerPagination from "./DrawerPagination";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { Exercise, SelectedExercise } from "@/lib/shared/types/types";
import { getExercises } from "@/lib/client/api/exercisesApi";
import DrawerExercisesList from "./DrawerExercisesList";
import { addExercisesToDiary } from "@/lib/client/api/diaryApi";
import { DiaryExercise } from "@/lib/shared/types/diary";
import { SelectedExercisesBox } from "./SelectedExercisesBox";
import clsx from "clsx";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";

interface AddExercisesDrawerProps {
  date: string;
  handleClose: () => void;
  userWeight: number | undefined;
  onExercisesAdded: (exercises: DiaryExercise[]) => void;
}
const AddExercisesDrawer = ({
  date,
  handleClose,
  userWeight,
  onExercisesAdded,
}: AddExercisesDrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const debouncedUpdate = useDebouncedCallback((value) => {
    setDebouncedSearch(value);
  }, 400);
  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >([]);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
    setCurrentPage(1);
    debouncedUpdate(value);
  };
  const addExercise = (exercise: Exercise) => {
    const exists = selectedExercises.some((e) => e.exerciseId === exercise.id);

    if (exists) return;

    const caloriesPerHour =
      typeof userWeight === "number" && typeof exercise.met === "number"
        ? Math.ceil(userWeight * exercise.met)
        : exercise.burnedCalories;

    setSelectedExercises((prev) => [
      ...prev,
      {
        exerciseId: exercise.id,
        name: exercise.name,
        caloriesPerHour,
        time: "10",
      },
    ]);
  };
  const removeExercise = (exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.filter((exercise) => exercise.exerciseId !== exerciseId),
    );
  };
  const updateTime = (exerciseId: string, time: string) => {
    setSelectedExercises((prev) =>
      prev.map((exercise) => {
        if (exercise.exerciseId !== exerciseId) {
          return exercise;
        }

        return {
          ...exercise,
          time,
        };
      }),
    );
  };

  const hasInvalidTime = selectedExercises.some((exercise) => {
    return !validateNumberInput(exercise.time, {
      label: "Time",
      min: 1,
      max: 1440,
      integer: true,
    }).isValid;
  });
  const canSave = selectedExercises.length > 0 && !hasInvalidTime && !isSaving;
  const hasSelectedExercises = selectedExercises.length > 0;

  const handleSave = async () => {
    if (!canSave) return;

    try {
      setIsSaving(true);
      const { exercises } = await addExercisesToDiary({
        date,
        exercises: selectedExercises,
      });

      onExercisesAdded(exercises);
      setSelectedExercises([]);
      handleClose();
      toast.success("Exercises added");
    } catch {
      toast.error("Something went wrong, please try again later");
    } finally {
      setIsSaving(false);
    }
  };

  const selectedExercisesIds = selectedExercises.map((e) => e.exerciseId);
  useEffect(() => {
    let ignore = false;
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        const result = await getExercises({
          page: currentPage,
          limit: 10,
          search: debouncedSearch,
        });
        if (ignore) return;
        setCurrentPage(result.page);
        setExercises(result.exercises);
        setTotalPages(result.totalPages);
      } catch {
        if (!ignore) {
          toast.error("Something went wrong, please try again later");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };
    fetchExercises();
    return () => {
      ignore = true;
    };
  }, [currentPage, debouncedSearch]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close add exercises drawer"
        className="absolute inset-0 bg-black/60"
        onClick={() => handleClose()}
      />

      <aside
        className={clsx(
          "absolute right-0 top-0 flex h-full w-full flex-col border-l border-white/15 bg-black px-4 pt-5 shadow-2xl md:px-5",
          hasSelectedExercises ? "md:max-w-194" : "md:max-w-110",
        )}
      >
        <div
          className={clsx(
            "grid min-h-0 flex-1 gap-4",
            hasSelectedExercises &&
              "md:grid-cols-[minmax(280px,320px)_minmax(0,25rem)]",
          )}
        >
          {hasSelectedExercises && (
            <div className="hidden min-h-0 flex-col border-r border-white/10 pr-4 md:flex">
              <SelectedExercisesBox
                selectedExercises={selectedExercises}
                onRemove={removeExercise}
                onTimeChange={updateTime}
                onSave={handleSave}
                canSave={canSave}
                isSaving={isSaving}
                className="flex min-h-0 flex-1 flex-col"
                listClassName="max-h-none min-h-0 flex-1"
              />

              <div className="mt-auto flex gap-3 border-t border-white/10 pt-4 pb-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="h-11 flex-1 rounded-xl border border-white/20 text-[14px] text-white/80"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canSave}
                  className="h-11 flex-1 rounded-xl bg-orange text-[14px] font-semibold text-white disabled:opacity-40"
                  onClick={handleSave}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}

          <div className="flex min-h-0 flex-col">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] text-white/40">{date}</p>
                <h2 className="text-xl font-bold">Add exercises</h2>
              </div>

              <button
                type="button"
                onClick={() => handleClose()}
                className="flex items-center gap-2 text-[14px] text-orange md:hidden"
              >
                Close
                <NextIcon className="rotate-270" />
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={onChangeHandler}
              placeholder="Search exercises"
              className="form-input mb-4 w-full min-w-0"
            />

            <div className="min-h-0 flex-1 overflow-y-auto pr-2 meals-scrollbar">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold">
                    Available exercises
                  </h3>
                  {isLoading && (
                    <span className="text-[12px] text-white/40">
                      Loading...
                    </span>
                  )}
                </div>

                {!isLoading && exercises.length === 0 ? (
                  <p className="rounded-xl border border-white/10 p-6 text-center text-[14px] text-white/40">
                    No exercises found
                  </p>
                ) : (
                  <DrawerExercisesList
                    exercises={exercises}
                    userWeight={userWeight}
                    selectedExercisesIds={selectedExercisesIds}
                    onAddExercise={addExercise}
                  />
                )}
              </div>
            </div>

            <SelectedExercisesBox
              selectedExercises={selectedExercises}
              onRemove={removeExercise}
              onTimeChange={updateTime}
              onSave={handleSave}
              canSave={canSave}
              isSaving={isSaving}
              className="md:hidden"
            />

            <div className="border-t border-white/10">
              <DrawerPagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />

              {!hasSelectedExercises && (
                <div className="flex gap-3 pb-4 max-md:hidden">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-11 flex-1 rounded-xl border border-white/20 text-[14px] text-white/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!canSave}
                    className="h-11 flex-1 rounded-xl bg-orange text-[14px] font-semibold text-white disabled:opacity-40"
                    onClick={handleSave}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AddExercisesDrawer;
