import { SelectedProduct } from "@/lib/shared/types/types";
import api from "./axios";
import { DiaryProduct } from "@/lib/shared/types/diary";
interface addProductsToMealProps {
  date: string;
  mealType: string;
  products: SelectedProduct[];
}
interface removeProductFromMealProps {
  date: string;
  mealType: string;
  productId: string;
}
interface updateProductWeightFromMealProps {
  date: string;
  mealType: string;
  productId: string;
  weight: number;
}
export const addProductsToMeal = async ({
  date,
  mealType,
  products,
}: addProductsToMealProps): Promise<{
  message: string;
  addedCount: number;
  products: DiaryProduct[];
}> => {
  const items = {
    items: products.map((p) => ({
      productId: p.productId,
      weight: Number(p.weight),
    })),
  };
  const { data } = await api.post(
    `/diary/${date}/meals/${mealType}/products`,
    items,
  );
  return data;
};

export const removeProductFromMeal = async ({
  date,
  mealType,
  productId,
}: removeProductFromMealProps): Promise<{
  message: string;
  deletedProductId: string;
}> => {
  const { data } = await api.delete(
    `/diary/${date}/meals/${mealType}/products/${productId}`,
  );
  return data;
};
export const updateProductWeightFromMeal = async ({
  date,
  mealType,
  productId,
  weight,
}: updateProductWeightFromMealProps): Promise<{
  message: string;
  product: DiaryProduct;
}> => {
  const { data } = await api.patch(
    `/diary/${date}/meals/${mealType}/products/${productId}`,
    { weight },
  );
  return data;
};
