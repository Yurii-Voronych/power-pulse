import { SelectedExercise, SelectedProduct } from "@/lib/shared/types/types";
import api from "./axios";
import { DiaryExercise, DiaryProduct } from "@/lib/shared/types/diary";
interface addProductsToMealProps {
  date: string;
  mealType: string;
  products: SelectedProduct[];
}
interface addExercisesToDiaryProps {
  date: string;
  exercises: SelectedExercise[];
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
interface removeExerciseProps {
  date: string;
  exerciseId: string;
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

export const addExercisesToDiary = async ({
  date,
  exercises,
}: addExercisesToDiaryProps): Promise<{
  message: string;
  addedCount: number;
  exercises: DiaryExercise[];
}> => {
  const items = {
    items: exercises.map((exercise) => ({
      exerciseId: exercise.exerciseId,
      time: exercise.time,
    })),
  };
  const { data } = await api.post(`/diary/${date}/exercises`, items);
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
export const removeExercise = async ({
  date,
  exerciseId,
}: removeExerciseProps): Promise<{
  message: string;
  deletedExerciseId: string;
}> => {
  const { data } = await api.delete(`/diary/${date}/exercises/${exerciseId}`);
  return data;
};
