"use client";
import { DiaryExercise } from "@/lib/shared/types/diary";
import { NextIcon } from "./icons/NextArrowIcon";
import { Dispatch, SetStateAction, useState } from "react";
import AddExercisesDrawer from "./AddExercisesDrawer";
import DiaryPageExerciseCard from "./DiaryPageExerciseCard";
import { removeExercise, updateExercise } from "@/lib/client/api/diaryApi";
import toast from "react-hot-toast";

interface ExercisesGridProps {
  exercises: DiaryExercise[];
  onExercisesChange: Dispatch<SetStateAction<DiaryExercise[]>>;
  date: string;
  userWeight: number | undefined;
}

const ExercisesGrid = ({
  exercises,
  onExercisesChange,
  date,
  userWeight,
}: ExercisesGridProps) => {
  const hasExercises = exercises.length > 0;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deletingExerciseId, setDeletingExerciseId] = useState<null | string>(
    null,
  );
  const [editingExerciseId, setEditingExerciseId] = useState<null | string>(
    null,
  );
  const [updatingExerciseId, setUpdatingExerciseId] = useState<null | string>(
    null,
  );
  const handleExercisesAdded = (addedExercises: DiaryExercise[]) => {
    onExercisesChange((prev) => [...prev, ...addedExercises]);
  };

  const handleExercisesDeleted = async (deletedExercise: DiaryExercise) => {
    try {
      setDeletingExerciseId(deletedExercise.id);
      const { deletedExerciseId } = await removeExercise({
        date,
        exerciseId: deletedExercise.id,
      });
      onExercisesChange((prev) =>
        prev.filter((e) => deletedExerciseId !== e.id),
      );
      toast.success("Exercise deleted!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingExerciseId(null);
    }
  };
  const handleExerciseTimeUpdated = async (
    exerciseId: string,
    time: number,
  ) => {
    try {
      setUpdatingExerciseId(exerciseId);

      const { exercise } = await updateExercise({
        date,
        exerciseId,
        time,
      });

      onExercisesChange((prev) =>
        prev.map((item) => (item.id === exercise.id ? exercise : item)),
      );

      setEditingExerciseId(null);
      toast.success("Exercise updated!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdatingExerciseId(null);
    }
  };
  return (
    <div className="w-full border border-white/20 p-3 rounded-xl mb-6">
      <div className="mb-3 flex justify-between text-white/50 text-[14px] ">
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
        <ul className="flex flex-col gap-2 max-h-65 overflow-y-auto meals-scrollbar pr-1.5">
          {exercises.map((exercise) => {
            const isEditing = exercise.id === editingExerciseId;
            return (
              <DiaryPageExerciseCard
                exercise={exercise}
                key={exercise.id}
                onExerciseDeleted={handleExercisesDeleted}
                deletingExerciseId={deletingExerciseId}
                isEditing={isEditing}
                setEditingExerciseId={setEditingExerciseId}
                onExerciseTimeUpdated={handleExerciseTimeUpdated}
                updatingExerciseId={updatingExerciseId}
              />
            );
          })}
        </ul>
      ) : (
        <p className="pt-2 pb-6 text-center text-[14px] text-white/30">
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
