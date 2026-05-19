import {
  DiaryData,
  DiaryExercise,
  DiaryProduct,
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
    _id: diary._id.toString(),
    userId: diary.userId.toString(),
    date: diary.date,
    products: diary.products.map((product: DiaryProduct) => ({
      _id: product._id.toString(),
      productId: product.productId.toString(),
      title: product.title,
      category: product.category,
      calories: product.calories,
      weight: product.weight,
      recommended: product.recommended,
    })),
    exercises: diary.exercises.map((exercise: DiaryExercise) => ({
      _id: exercise._id.toString(),
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
