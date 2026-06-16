import Exercise from "@/models/Exercise";
import { connectDB } from "../../db/mongodb";
import {
  EXERCISE_FIELD_BY_FILTER,
  isExerciseFilter,
} from "@/lib/shared/constants/constants";

type GetExercisesByCategoriesParams = {
  page?: number;
  limit?: number;
  category: string;
  filter: string;
};
type GetExercisesParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const getExercisesByCategory = async ({
  page = 1,
  limit = 12,
  category,
  filter,
}: GetExercisesByCategoriesParams) => {
  if (!isExerciseFilter(filter)) {
    return null;
  }
  const field = EXERCISE_FIELD_BY_FILTER[filter];

  await connectDB();

  const skip = (page - 1) * limit;
  const filterQuery = {
    [field]: category,
  };
  const [exercises, total] = await Promise.all([
    Exercise.find(filterQuery)
      .sort({ name: 1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Exercise.countDocuments(filterQuery),
  ]);

  return {
    exercises: exercises.map(({ _id, ...exercise }) => ({
      ...exercise,
      id: _id.toString(),
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
  const filterQuery = search ? { name: { $regex: search, $options: "i" } } : {};

  const [exercises, total] = await Promise.all([
    Exercise.find(filterQuery)
      .sort({ name: 1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Exercise.countDocuments(filterQuery),
  ]);

  return {
    exercises: exercises.map(({ _id, ...exercise }) => ({
      ...exercise,
      id: _id.toString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
