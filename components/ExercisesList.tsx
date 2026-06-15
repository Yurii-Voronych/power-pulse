import { Exercise } from "@/lib/shared/types/types";
import ExerciseCard from "./ExercisesCard";
interface exercisesListProps {
  cards: Exercise[];
  userWeight: number | undefined;
}
const ExercisesList = ({ cards, userWeight }: exercisesListProps) => {
  return (
    <ul className="mb-4 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:mb-8">
      {cards.map((c) => (
        <li key={c.id} className="min-w-0 w-full">
          <ExerciseCard exercise={c} userWeight={userWeight} />
        </li>
      ))}
    </ul>
  );
};

export default ExercisesList;
