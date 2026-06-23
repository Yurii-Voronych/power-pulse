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
import { useRouter } from "next/navigation";
import { calculateProductsCalories } from "@/lib/shared/calculations/diaryCalculations";

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
  const router = useRouter();

  const mealProducts = products.filter((product) => {
    return product.mealType === mealType;
  });

  const totalMealConsumption = calculateProductsCalories(mealProducts);
  const dailyConsumption = calculateProductsCalories(products);

  const dailyCaloriesNorm = dailyCaloriesConsumption ?? 0;
  const roundedTotalMealConsumption = Math.ceil(totalMealConsumption);
  const hasProducts = mealProducts.length > 0;

  const handleProductsAdded = (addedProducts: DiaryProduct[]) => {
    setProducts((prev) => [...prev, ...addedProducts]);
    router.refresh();
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
      router.refresh();
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
      router.refresh();
      return true;
    } catch {
      toast.error("Failed to update product weight");
      return false;
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
              triggerClassName="inline-flex h-10 items-center justify-center rounded-xl bg-orange px-4 text-[14px] font-semibold text-white shadow-[0_0_0_rgba(230,83,60,0)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_14px_rgba(230,83,60,0.35)] active:translate-y-0 active:shadow-[0_4px_12px_rgba(230,83,60,0.25)]"
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
        <CaloriesIntake
          value={Math.ceil(dailyCaloriesNorm)}
          classname="border border-white/20 bg-transparent"
        />
        <CaloriesConsumed value={Math.ceil(dailyConsumption)} />
        <CaloriesRest value={Math.ceil(dailyCaloriesNorm - dailyConsumption)} />
      </div>
    </div>
  );
};

export default AddProductsManager;
