import { Exercise } from "@/lib/shared/types/types";
import ExerciseCard from "./ExercisesCard";
interface exercisesListProps {
  cards: Exercise[];
}
const ExercisesList = ({ cards }: exercisesListProps) => {
  return (
    <ul className="flex gap-5 max-md:flex-col mb-4 md:flex-wrap 2xl:mb-8 max-md:items-center">
      {cards.map((c) => (
        <li key={c._id}>
          <ExerciseCard exercise={c} />
        </li>
      ))}
    </ul>
  );
};

export default ExercisesList;
