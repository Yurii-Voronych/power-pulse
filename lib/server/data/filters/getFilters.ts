import Filter from "@/models/Filter";

import { Card } from "@/lib/shared/types/types";
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
        id: card._id.toString(),
        filter: card.filter,
        name: card.name,
        imgURL: card.imgURL,
      })),
  };
};
