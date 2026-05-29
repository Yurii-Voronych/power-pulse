import CaloriesIntake from "@/components/ui/CaloriesIntake";
import SportMinutes from "@/components/ui/SportMinutes";
import CaloriesConsumed from "./ui/CaloriesConsumed";
import { DiaryExercise, DiaryProduct } from "@/lib/shared/types/diary";
import CaloriesBurned from "./ui/CaloriesBurned";
import CaloriesRest from "./ui/RestOfCalories";
import SportsRest from "./ui/RestOfSports";
import { WarningIcon } from "./icons/WarningIcon";

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
  const consumedCalories = products.reduce((total, product) => {
    return total + (product.caloriesPer100g * product.weight) / 100;
  }, 0);
  const roundedConsumedCalories = Math.ceil(consumedCalories);

  const burnedCalories = exercises.reduce((total, exercise) => {
    return total + exercise.burnedCalories;
  }, 0);

  const spentSportMinutes = exercises.reduce((total, exercise) => {
    return total + exercise.time;
  }, 0);

  const remainingCalories = intake - roundedConsumedCalories;
  const remainingSportMinutes = sportMinutes - spentSportMinutes;

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3.5 mb-5 md:grid-cols-3 xl:grid-cols-2">
        <CaloriesIntake value={intake} />
        <SportMinutes value={sportMinutes} />
        <CaloriesConsumed value={roundedConsumedCalories} />
        <CaloriesBurned value={burnedCalories} />
        <CaloriesRest value={remainingCalories} />
        <SportsRest value={remainingSportMinutes} />
      </div>
      <div className="flex gap-2 mb-10 xl:mb-0">
        <WarningIcon className="shrink-0" />
        <p className="text-[14px] text-white/30">
          Record all your meals in a calorie diary every day. This will help me
          be aware of my nutrition and make me responsible for my choices.
        </p>
      </div>
    </>
  );
};

export default DiaryCaloriesInfoGrid;
