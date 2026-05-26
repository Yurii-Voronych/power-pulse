import { GetProductsResult } from "@/lib/shared/types/types";
import Product from "@/models/Product";
import { connectDB } from "../../db/mongodb";

type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
};
export const getProducts = async ({
  page = 1,
  limit = 12,
  category,
  search,
}: GetProductsParams): Promise<GetProductsResult> => {
  await connectDB();
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  const [products, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products: products.map((p) => {
      return {
        id: p._id.toString(),
        caloriesPer100g: p.caloriesPer100g,
        category: p.category,
        title: p.title,
      };
    }),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
