import { DiaryExercise } from "@/lib/shared/types/diary";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/Trash";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import CloseIcon from "./icons/CloseIcon";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";

interface DiaryPageExerciseCardProps {
  exercise: DiaryExercise;
  onExerciseDeleted: (deletedExercise: DiaryExercise) => void;
  deletingExerciseId: null | string;
  updatingExerciseId: null | string;
  isEditing: boolean;
  setEditingExerciseId: Dispatch<SetStateAction<string | null>>;
  onExerciseTimeUpdated: (exerciseId: string, time: number) => Promise<void>;
}
const DiaryPageExerciseCard = ({
  exercise,
  onExerciseDeleted,
  deletingExerciseId,
  updatingExerciseId,
  isEditing,
  setEditingExerciseId,
  onExerciseTimeUpdated,
}: DiaryPageExerciseCardProps) => {
  const [draftTime, setDraftTime] = useState(`${exercise.time}`);
  const timeInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!isEditing) return;

    timeInputRef.current?.focus();
  }, [isEditing]);
  const timeValidation = validateNumberInput(draftTime, {
    label: "Time",
    min: 1,
    max: 1440,
    integer: true,
  });
  const nextTime = timeValidation.value ?? 0;
  const isUpdating = updatingExerciseId === exercise.id;
  const isInvalidTime = !timeValidation.isValid;
  return (
    <li className="rounded-xl border border-white/10 bg-orange-500/10 px-3 py-2">
      <p className="truncate text-[14px] font-medium text-orange-1">
        {exercise.name}
      </p>

      <div className="text-[14px] text-white/65 flex justify-between items-center">
        <div>
          <span className="text-white">{exercise.burnedCalories}</span> kcal -{" "}
          {isEditing ? (
            <input
              type="text"
              inputMode="numeric"
              ref={timeInputRef}
              min={1}
              max={10000}
              className="w-10 pl-1 bg-transparent rounded-md border border-white/50 text-white outline-none focus:border focus:border-orange"
              value={draftTime}
              onChange={(e) => setDraftTime(e.currentTarget.value)}
            />
          ) : (
            <span className="text-white">{exercise.time}</span>
          )}{" "}
          min{" "}
          {timeValidation.error && (
            <span className="text-red-500 pl-2">{timeValidation.error}</span>
          )}
        </div>

        <div className="text-orange flex gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                className="text-[14px] text-white p-1 disabled:opacity-40"
                disabled={isInvalidTime || isUpdating}
                onClick={async () => {
                  await onExerciseTimeUpdated(exercise.id, nextTime);
                }}
              >
                <Check className="text-orange w-5 h-5" />
              </button>
              <button
                type="button"
                className="text-[14px] text-white p-1 disabled:opacity-40"
                disabled={isUpdating}
                onClick={() => {
                  setDraftTime(String(exercise.time));
                  setEditingExerciseId(null);
                }}
              >
                <CloseIcon className="text-orange w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="p-1 disabled:opacity-40"
                disabled={deletingExerciseId !== null}
                onClick={() => {
                  setDraftTime(String(exercise.time));
                  setEditingExerciseId(exercise.id);
                }}
              >
                <EditIcon />
              </button>
              <button
                type="button"
                className="p-1 disabled:opacity-40"
                onClick={() => onExerciseDeleted(exercise)}
                disabled={deletingExerciseId === exercise.id}
              >
                <TrashIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default DiaryPageExerciseCard;
