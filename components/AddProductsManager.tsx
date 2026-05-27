"use client";
import AddProductsDrawer from "./AddProductsDrawer";
import ProductsGrid from "./ProductsGrid";
import { DiaryProduct } from "@/lib/shared/types/diary";
interface addProductManagerProps {
  initialProducts: DiaryProduct[];
  date: string;
  mealType: string;
}
const AddProductsManager = ({
  initialProducts,
  date,
  mealType,
}: addProductManagerProps) => {
  const totalMealConsumption = initialProducts.reduce((total, p) => {
    return total + p.caloriesPer100g * (p.weight / 100);
  }, 0);
  const roundedTotalMealConsumption = Math.ceil(totalMealConsumption);
  const hasProducts = initialProducts.length > 0;
  return (
    <>
      <div className="w-full max-h-60 border border-white/20 rounded-xl p-2 flex flex-col gap-2 mb-5">
        {hasProducts ? (
          <>
            <ProductsGrid products={initialProducts} />
            <p>{roundedTotalMealConsumption}</p>
          </>
        ) : (
          <p className="pt-20 pb-20 text-center">No products added yet</p>
        )}
      </div>
      <AddProductsDrawer date={date} mealType={mealType} />
    </>
  );
};

export default AddProductsManager;
