import Category from "@/models/Category";
import { connectDB } from "../services/mongodb";

export const getCategories = async (): Promise<
  {
    id: string;
    name: string;
    value: string;
  }[]
> => {
  await connectDB();

  const categories = await Category.find().sort({ value: 1 }).lean();
  return categories.map((c) => ({
    id: c._id.toString(),
    name: c.name,
    value: c.value,
  }));
};
