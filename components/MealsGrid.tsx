import { DiaryProduct } from "@/lib/shared/types/diary";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import Link from "next/link";
import { NextIcon } from "./icons/NextArrowIcon";
import { calculateProductsCalories } from "@/lib/shared/calculations/diaryCalculations";

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
    <div className="border border-white/20 rounded-xl p-3 mb-8 xl:p-3 ">
      <p className="text-[14px] text-white/50 mb-3">Meals</p>
      <ul className="meals-scrollbar flex flex-col gap-2 xl:gap-3">
        {meals.map((meal) => {
          const calories = calculateProductsCalories(meal.products);
          const roundedCalories = Math.ceil(calories);

          const hasProducts = meal.products.length > 0;

          return (
            <li
              className="group text-[14px] rounded-xl border border-white/10 bg-orange-500/10 p-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange/70 hover:bg-orange/15 hover:shadow-[0_12px_30px_rgba(230,83,60,0.18)] xl:pl-4 xl:pr-2"
              key={meal.value}
            >
              <Link
                href={`/diary/${date}/meals/${meal.value}`}
                className="flex justify-between items-center gap-4"
              >
                <div className="min-w-0">
                  <h2 className="text-orange-1 font-medium pb-2 transition-colors duration-300 group-hover:text-orange">
                    {meal.label}
                  </h2>

                  {hasProducts ? (
                    <>
                      <span className="mr-2">{roundedCalories}</span>
                      <span className="text-white mr-2">Kcal</span>
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
                  <div className="flex shrink-0 gap-2 text-orange transition-transform duration-300 group-hover:translate-x-1 mr-2">
                    Edit
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <NextIcon />
                    </span>
                  </div>
                ) : (
                  <div className="flex shrink-0 gap-2 text-orange transition-transform duration-300 group-hover:translate-x-1 mr-2">
                    Add
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <NextIcon />
                    </span>
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
