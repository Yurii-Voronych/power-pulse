import { GetProductsResult } from "@/types/types";
import Product from "@/models/Product";
import { connectDB } from "../../db/mongodb";

type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
  recommended?: string;
  search?: string;
  blood?: number;
};
export const getProducts = async ({
  page = 1,
  limit = 12,
  category,
  search,
  recommended,
  blood,
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

  if (recommended && recommended === "true") {
    filter[`groupBloodAllowed.${blood}`] = true;
  }
  if (recommended && recommended === "false") {
    filter[`groupBloodAllowed.${blood}`] = false;
  }
  const [products, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products: products.map((p) => {
      let recommended: boolean | null = null;

      if (blood) {
        recommended = p.groupBloodAllowed?.[blood] ?? null;
      }

      return {
        id: p._id.toString(),
        weight: p.weight,
        calories: p.calories,
        category: p.category,
        title: p.title,
        recommended,
      };
    }),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
