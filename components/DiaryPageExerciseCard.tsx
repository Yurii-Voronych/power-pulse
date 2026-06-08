import { DiaryExercise } from "@/lib/shared/types/diary";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/Trash";

interface DiaryPageExerciseCardProps {
  exercise: DiaryExercise;
  onExerciseDeleted: (deletedExercise: DiaryExercise) => void;
  deletingExerciseId: null | string;
}
const DiaryPageExerciseCard = ({
  exercise,
  onExerciseDeleted,
  deletingExerciseId,
}: DiaryPageExerciseCardProps) => {
  return (
    <li className="rounded-xl border border-white/10 bg-orange-500/10 px-3 py-2">
      <p className="truncate text-[14px] font-medium text-orange-1">
        {exercise.name}
      </p>

      <div className="text-[14px] text-white/65 flex justify-between items-center">
        <div>
          <span className="text-white">{exercise.burnedCalories}</span> kcal -{" "}
          <span className="text-white">{exercise.time}</span> min
        </div>

        <div className="text-orange flex gap-3">
          <button className="p-1 disabled:opacity-40">
            <EditIcon />
          </button>
          <button
            className="p-1 disabled:opacity-40"
            onClick={() => onExerciseDeleted(exercise)}
            disabled={deletingExerciseId === exercise.id}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
};

export default DiaryPageExerciseCard;
