import { Card } from "@/types/types";
import Image from "next/image";

interface exercisesListProps {
  cards: Card[];
}
const ExercisesList = ({ cards }: exercisesListProps) => {
  return (
    <ul className="flex gap-5 max-md:flex-col mb-4 md:flex-wrap 2xl:mb-8">
      {cards.map((c) => (
        <li key={c.name}>
          <div className="relative w-83.75 h-51.5 overflow-hidden rounded-xl">
            <Image src={c.imgURL} alt={c.name} fill className="object-cover" />

            <div className="absolute inset-0 bg-[rgba(4,4,4,0.5)]" />
            <p className="absolute top-[40%] left-30 text-white text-[20px] capitalize">
              {c.name}
            </p>
            <p className="absolute top-[55%] left-30 text-[12px] text-white/60">
              {c.filter}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExercisesList;
