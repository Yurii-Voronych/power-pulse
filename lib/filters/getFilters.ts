import Filter from "@/models/Filter";
import { connectDB } from "../services/mongodb";

export const getFilters = async (filter: string) => {
  await connectDB();

  const filters = await Filter.find().lean();

  return {
    cards: filters.filter((f) => f.filter === filter),
  };
};
