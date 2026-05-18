import Exercise from "@/models/Exercise";
import { connectDB } from "../db/mongodb";
type GetExercisesParams = {
  page?: number;
  limit?: number;
  category?: string;
};
export const getExercisesByCategory = async ({
  page = 1,
  limit = 12,
  category,
}: GetExercisesParams) => {
  await connectDB();
  const skip = (page - 1) * limit;
  const filterQuery = {
    $or: [
      { bodyPart: category },
      { equipment: category },
      { target: category },
    ],
  };
  const [exercises, total] = await Promise.all([
    Exercise.find(filterQuery).skip(skip).limit(limit).lean(),
    Exercise.countDocuments(filterQuery),
  ]);

  return {
    exercises: exercises.map((e) => ({
      ...e,
      _id: e._id.toString(),
    })),
    total,
    page,
    totalPage: Math.ceil(total / limit),
  };
};
