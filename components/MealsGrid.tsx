import { DiaryProduct } from "@/lib/shared/types/diary";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import Link from "next/link";
import { NextIcon } from "./icons/NextArrowIcon";

interface ProductsGridProps {
  products: DiaryProduct[];
  date: string;
}

const MealsGrid = ({ products, date }: ProductsGridProps) => {
  const meals = MEAL_TYPES.map((meal) => ({
    ...meal,
    products: products.filter((product) => product.mealType === meal.value),
  }));

  return (
    <div className="border border-white/20 rounded-xl p-3 mb-10 xl:p-3 ">
      <p className="text-[14px] text-white/50 mb-3">Meals</p>
      <ul className="meals-scrollbar flex flex-col gap-2 xl:gap-3">
        {meals.map((meal) => {
          const calories = meal.products.reduce((total, product) => {
            return total + product.caloriesPer100g * (product.weight / 100);
          }, 0);
          const roundedCalories = Math.ceil(calories);

          const hasProducts = meal.products.length > 0;

          return (
            <li
              className="text-[14px] border border-white/10 p-2 rounded-xl bg-orange-500/10 xl:pl-4 xl:pr-2"
              key={meal.value}
            >
              <Link
                href={`/diary/${date}/meals/${meal.value}`}
                className="flex justify-between items-center gap-4"
              >
                <div className="min-w-0">
                  <h2 className="text-orange-1 font-medium">{meal.label}</h2>

                  <span className="mr-2">{roundedCalories}</span>
                  <span className="text-white mr-2">Kcal</span>

                  {hasProducts ? (
                    <>
                      <span className="mr-2">{meal.products.length}</span>
                      <span className="text-white/70">products</span>
                    </>
                  ) : (
                    <p className="text-white/70">
                      Tap to add your {meal.value}
                    </p>
                  )}
                </div>

                {hasProducts ? (
                  <div className="shrink-0 text-orange flex gap-2">
                    Edit <NextIcon />
                  </div>
                ) : (
                  <div className="text-orange flex shrink-0 gap-2">
                    Add <NextIcon />
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MealsGrid;
