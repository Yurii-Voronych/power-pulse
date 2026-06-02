import { Exercise } from "@/lib/shared/types/types";
import ExerciseCard from "./ExercisesCard";
interface exercisesListProps {
  cards: Exercise[];
  userWeight: number | undefined;
}
const ExercisesList = ({ cards, userWeight }: exercisesListProps) => {
  return (
    <ul className="grid grid-cols-1 justify-items-center gap-5 mb-4 md:grid-cols-2 xl:grid-cols-3 2xl:mb-8">
      {cards.map((c) => (
        <li key={c.id} className="w-full max-w-83.75">
          <ExerciseCard exercise={c} userWeight={userWeight} />
        </li>
      ))}
    </ul>
  );
};

export default ExercisesList;
