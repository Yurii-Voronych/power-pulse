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
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null,
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const totalMealConsumption = mealProducts.reduce((total, p) => {
    return total + p.caloriesPer100g * (p.weight / 100);
  }, 0);

  const roundedTotalMealConsumption = Math.ceil(totalMealConsumption);

  const hasProducts = mealProducts.length > 0;

  const handleProductsAdded = (addProducts: DiaryProduct[]) => {
    setMealProducts((prev) => [...prev, ...addProducts]);
  };
  const handleProductRemoved = async (productId: string) => {
    try {
      setDeletingProductId(productId);

      const { deletedProductId } = await removeProductFromMeal({
        date,
        mealType,
        productId,
      });

      setMealProducts((prev) => prev.filter((p) => p.id !== deletedProductId));
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
      setMealProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p)),
      );
    } catch {
      toast.error("Failed to update product weight");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <>
      <div className="w-full border border-white/20 rounded-xl p-2 mb-5">
        {hasProducts ? (
          <>
            <ProductsGrid
              products={mealProducts}
              onRemoveProduct={handleProductRemoved}
              deletingProductId={deletingProductId}
              onWeightUpd={handleWeightChange}
              isUpdating={isUpdating}
            />

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
