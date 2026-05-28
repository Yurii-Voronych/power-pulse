"use client";
import { useState } from "react";
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
  const [mealProducts, setMealProducts] = useState(initialProducts);

  const totalMealConsumption = mealProducts.reduce((total, p) => {
    return total + p.caloriesPer100g * (p.weight / 100);
  }, 0);

  const roundedTotalMealConsumption = Math.ceil(totalMealConsumption);

  const hasProducts = mealProducts.length > 0;

  const handleProductsAdded = (addProducts: DiaryProduct[]) => {
    setMealProducts((prev) => [...prev, ...addProducts]);
  };
  return (
    <>
      <div className="w-full max-h-60 border border-white/20 rounded-xl p-2 flex flex-col gap-2 mb-5">
        {hasProducts ? (
          <>
            <ProductsGrid products={mealProducts} />
            <p>{roundedTotalMealConsumption}</p>
          </>
        ) : (
          <p className="pt-20 pb-20 text-center">No products added yet</p>
        )}
      </div>
      <AddProductsDrawer
        date={date}
        mealType={mealType}
        onProductsAdded={handleProductsAdded}
      />
    </>
  );
};

export default AddProductsManager;
