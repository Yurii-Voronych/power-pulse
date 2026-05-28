import { SelectedProduct } from "@/lib/shared/types/types";
import api from "./axios";
import { DiaryProduct } from "@/lib/shared/types/diary";
interface addProductsToMealProps {
  date: string;
  mealType: string;
  products: SelectedProduct[];
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
