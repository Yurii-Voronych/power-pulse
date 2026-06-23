import CaloriesIntake from "@/components/ui/CaloriesIntake";
import SportMinutes from "@/components/ui/SportMinutes";
import CaloriesConsumed from "./ui/CaloriesConsumed";
import { DiaryExercise, DiaryProduct } from "@/lib/shared/types/diary";
import CaloriesBurned from "./ui/CaloriesBurned";
import CaloriesRest from "./ui/RestOfCalories";
import SportsRest from "./ui/RestOfSports";
import { WarningIcon } from "./icons/WarningIcon";
import {
  calculateExercisesCalories,
  calculateExercisesMinutes,
  calculateProductsCalories,
} from "@/lib/shared/calculations/diaryCalculations";

interface DiaryCaloriesInfoGridProps {
  intake: number;
  sportMinutes: number;
  exercises: DiaryExercise[];
  products: DiaryProduct[];
}
const DiaryCaloriesInfoGrid = ({
  intake,
  sportMinutes,
  exercises,
  products,
}: DiaryCaloriesInfoGridProps) => {
  const consumedCalories = calculateProductsCalories(products);
  const roundedConsumedCalories = Math.ceil(consumedCalories);

  const burnedCalories = calculateExercisesCalories(exercises);
  const spentSportMinutes = calculateExercisesMinutes(exercises);

  const remainingCalories = intake - roundedConsumedCalories;
  const remainingSportMinutes = sportMinutes - spentSportMinutes;

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3.5 mb-5 md:grid-cols-3 xl:grid-cols-2">
        <CaloriesIntake
          value={intake}
          classname="border border-white/20 bg-transparent"
        />
        <SportMinutes
          value={sportMinutes}
          classname="border border-white/20 bg-transparent"
        />
        <CaloriesConsumed value={roundedConsumedCalories} />
        <CaloriesBurned value={burnedCalories} />
        <CaloriesRest value={remainingCalories} />
        <SportsRest value={remainingSportMinutes} />
      </div>

      <p className="text-[14px] text-white/30 mb-10 xl:mb-0">
        Record all your meals in a calorie diary every day. This will help me be
        aware of my nutrition and make me responsible for my choices.
      </p>
    </>
  );
};

export default DiaryCaloriesInfoGrid;
