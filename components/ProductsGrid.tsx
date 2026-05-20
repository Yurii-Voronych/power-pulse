import { DiaryProduct } from "@/lib/shared/types/diary";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import Link from "next/link";
import { NextIcon } from "./icons/NextArrowIcon";

interface ProductsGridProps {
  products: DiaryProduct[];
  date: string;
}

const ProductsGrid = ({ products, date }: ProductsGridProps) => {
  const meals = MEAL_TYPES.map((meal) => ({
    ...meal,
    products: products.filter((product) => product.mealType === meal.value),
  }));

  return (
    <ul className="border border-white/20 rounded-xl p-2 flex flex-col gap-2 mb-10">
      {meals.map((meal) => {
        const calories = meal.products.reduce((total, product) => {
          return total + product.calories;
        }, 0);

        const hasProducts = meal.products.length > 0;

        return (
          <li
            className="text-[14px] border border-white/10 p-2 rounded-xl  bg-orange-500/10"
            key={meal.value}
          >
            <Link
              href={`/diary/${date}/meals/${meal.value}`}
              className="flex justify-between items-center"
            >
              <div>
                <h2 className="text-orange-1">{meal.label}</h2>

                <span className="mr-2">{calories}</span>
                <span className="text-white mr-2">Kcal</span>

                {hasProducts ? (
                  <>
                    <span className="mr-2">{meal.products.length}</span>
                    <span className="text-white/70">products</span>
                  </>
                ) : (
                  <p className="text-white/70">Tap to add your {meal.value}</p>
                )}
              </div>

              {hasProducts ? (
                <div className=" text-orange">
                  Edit <NextIcon />
                </div>
              ) : (
                <div className="text-orange flex gap-2 ">
                  Add <NextIcon />
                </div>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsGrid;
