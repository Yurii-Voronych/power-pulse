import { SelectedProduct } from "@/lib/shared/types/types";
import api from "./axios";
interface addProductsToMealProps {
  date: string;
  mealType: string;
  products: SelectedProduct[];
}
export const addProductsToMeal = ({
  date,
  mealType,
  products,
}: addProductsToMealProps) => {
  const items = {
    items: products.map((p) => ({
      productId: p.productId,
      weight: p.weight,
    })),
  };
  const data = api.post(`/diary/${date}/meals/${mealType}/products`, items);
  return data;
};
