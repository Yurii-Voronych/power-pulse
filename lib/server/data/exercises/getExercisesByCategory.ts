import Exercise from "@/models/Exercise";
import { connectDB } from "../../db/mongodb";

type GetExercisesParams = {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
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
      id: e._id.toString(),
    })),
    total,
    page,
    totalPage: Math.ceil(total / limit),
  };
};
export const getExercises = async ({
  page = 1,
  search,
  limit = 12,
}: GetExercisesParams) => {
  await connectDB();
  const skip = (page - 1) * limit;
  let filterQuery = {};
  if (search)
    filterQuery = {
      name: search,
    };

  const [exercises, total] = await Promise.all([
    Exercise.find(filterQuery).skip(skip).limit(limit).lean(),
    Exercise.countDocuments(filterQuery),
  ]);

  return {
    exercises: exercises.map((e) => ({
      ...e,
      id: e._id.toString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
