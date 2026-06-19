"use client";

import { useState } from "react";
import AddProductsDrawer from "./AddProductsDrawer";
import ProductsGrid from "./ProductsGrid";
import { DiaryProduct } from "@/lib/shared/types/diary";
import {
  removeProductFromMeal,
  updateProductWeightFromMeal,
} from "@/lib/client/api/diaryApi";
import toast from "react-hot-toast";
import CaloriesIntake from "./ui/CaloriesIntake";
import CaloriesConsumed from "./ui/CaloriesConsumed";
import CaloriesRest from "./ui/RestOfCalories";

interface AddProductManagerProps {
  initialProducts: DiaryProduct[];
  date: string;
  mealType: string;
  dailyCaloriesConsumption: number | undefined;
}

const AddProductsManager = ({
  initialProducts,
  date,
  mealType,
  dailyCaloriesConsumption,
}: AddProductManagerProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null,
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const mealProducts = products.filter((product) => {
    return product.mealType === mealType;
  });

  const totalMealConsumption = mealProducts.reduce((total, product) => {
    return total + product.caloriesPer100g * (product.weight / 100);
  }, 0);

  const dailyConsumption = products.reduce((total, product) => {
    return total + product.caloriesPer100g * (product.weight / 100);
  }, 0);

  const dailyCaloriesNorm = dailyCaloriesConsumption ?? 0;
  const roundedTotalMealConsumption = Math.ceil(totalMealConsumption);
  const hasProducts = mealProducts.length > 0;

  const handleProductsAdded = (addedProducts: DiaryProduct[]) => {
    setProducts((prev) => [...prev, ...addedProducts]);
  };

  const handleProductRemoved = async (productId: string) => {
    try {
      setDeletingProductId(productId);

      const { deletedProductId } = await removeProductFromMeal({
        date,
        mealType,
        productId,
      });

      setProducts((prev) => prev.filter((p) => p.id !== deletedProductId));
    } catch {
      toast.error("Failed to remove product");
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleWeightChange = async (productId: string, weight: number) => {
    try {
      setIsUpdating(true);

      const { product } = await updateProductWeightFromMeal({
        date,
        mealType,
        productId,
        weight,
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p)),
      );
    } catch {
      toast.error("Failed to update product weight");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
      <div>
        <div className="mb-5 rounded-xl border border-white/20 p-2">
          <div className="mb-3 flex flex-col gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[16px] font-semibold">Products</h2>
              <p className="text-[13px] text-white/50">
                {mealProducts.length} product
                {mealProducts.length === 1 ? "" : "s"} -{" "}
                {roundedTotalMealConsumption} kcal
              </p>
            </div>

            <AddProductsDrawer
              date={date}
              mealType={mealType}
              onProductsAdded={handleProductsAdded}
              triggerLabel="+ Add product"
              triggerClassName="inline-flex h-10 items-center justify-center rounded-xl bg-orange px-4 text-[14px] font-semibold text-white transition hover:opacity-90"
            />
          </div>

          {hasProducts ? (
            <ProductsGrid
              products={mealProducts}
              onRemoveProduct={handleProductRemoved}
              deletingProductId={deletingProductId}
              onWeightUpd={handleWeightChange}
              isUpdating={isUpdating}
            />
          ) : (
            <p className="pt-20 pb-20 text-center">No products added yet</p>
          )}
        </div>
      </div>

      <div className="grid content-start gap-3 md:grid-cols-3 lg:sticky lg:top-28 lg:grid-cols-1">
        <CaloriesIntake value={Math.ceil(dailyCaloriesNorm)} />
        <CaloriesConsumed value={Math.ceil(dailyConsumption)} />
        <CaloriesRest value={Math.ceil(dailyCaloriesNorm - dailyConsumption)} />
      </div>
    </div>
  );
};

export default AddProductsManager;
