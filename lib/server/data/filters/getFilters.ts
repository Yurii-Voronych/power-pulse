import Filter from "@/models/Filter";

import { Card } from "@/lib/shared/types/types";
import { connectDB } from "../../db/mongodb";
import { isExerciseFilter } from "@/lib/shared/constants/constants";

export const getFilters = async (
  filter: string,
): Promise<{ cards: Card[] }> => {
  await connectDB();

  const filters = await Filter.find({ filter }).lean();

  return {
    cards: filters.map((card) => ({
      id: card._id.toString(),
      filter: card.filter,
      name: card.name,
      imgURL: card.imgURL,
    })),
  };
};
export const exerciseCategoryExists = async ({
  filter,
  category,
}: {
  filter: string;
  category: string;
}) => {
  const isFilterValid = isExerciseFilter(filter);
  if (!isFilterValid) {
    return false;
  }

  await connectDB();

  return Boolean(
    await Filter.exists({
      filter,
      name: category,
    }),
  );
};
