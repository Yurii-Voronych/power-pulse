import {
  DBDiaryExercise,
  DBDiaryProduct,
  DiaryData,
} from "@/lib/shared/types/diary";
import { connectDB } from "../../db/mongodb";
import Diary from "@/models/Diary";
interface getDiaryDataProps {
  date: string;
  userId: string;
}
export const getDiaryData = async ({
  date,
  userId,
}: getDiaryDataProps): Promise<DiaryData | null> => {
  await connectDB();
  const diary = await Diary.findOne({ userId, date }).lean();

  if (!diary) return null;

  return {
    id: diary._id.toString(),
    userId: diary.userId.toString(),
    date: diary.date,
    products: diary.products.map((product: DBDiaryProduct) => ({
      id: product._id.toString(),
      mealType: product.mealType,
      productId: product.productId.toString(),
      title: product.title,
      category: product.category,
      caloriesPer100g: product.caloriesPer100g,
      weight: product.weight,
    })),
    exercises: diary.exercises.map((exercise: DBDiaryExercise) => ({
      id: exercise._id.toString(),
      exerciseId: exercise.exerciseId.toString(),
      bodyPart: exercise.bodyPart,
      equipment: exercise.equipment,
      name: exercise.name,
      target: exercise.target,
      burnedCalories: exercise.burnedCalories,
      time: exercise.time,
    })),
    createdAt: diary.createdAt.toISOString(),
    updatedAt: diary.updatedAt.toISOString(),
  };
};
