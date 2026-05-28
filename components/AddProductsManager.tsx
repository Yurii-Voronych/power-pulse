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
      <div className="w-full border border-white/20 rounded-xl p-2 mb-5">
        {hasProducts ? (
          <>
            <ProductsGrid products={mealProducts} />

            <p className="text-white/50">
              Calories consumed for{" "}
              <span className="text-orange-1 mr-1">{mealType}</span>
              <span className="text-white">{roundedTotalMealConsumption}</span>
            </p>
            <p className="text-white/50">
              Products added:{" "}
              <span className="text-white">{mealProducts.length}</span>
            </p>
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
