import Filter from "@/models/Filter";

import { Card } from "@/types/types";
import { connectDB } from "../../db/mongodb";

export const getFilters = async (
  filter: string,
): Promise<{ cards: Card[] }> => {
  await connectDB();

  const filters = await Filter.find().lean();

  return {
    cards: filters
      .filter((f) => f.filter === filter)
      .map((card) => ({
        ...card,
        _id: card._id.toString(),
      })),
  };
};
