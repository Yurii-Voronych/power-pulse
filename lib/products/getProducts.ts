import { connectDB } from "../services/mongodb";
import Product from "@/models/Product";
export type Product = {
  id: string;
  weight: number;
  calories: number;
  category: string;
  title: string;
  blood: Record<string, boolean>;
  recommended: boolean | null;
};

export type GetProductsResult = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};

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
  recommended,
  search,
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

  let userBlood: number | null = null;

  if (recommended && blood) {
    userBlood = blood ?? null;
  }

  if (userBlood && recommended === "true") {
    filter[`groupBloodNotAllowed.${userBlood}`] = false;
  }

  if (userBlood && recommended === "false") {
    filter[`groupBloodNotAllowed.${userBlood}`] = true;
  }

  const [products, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products: products.map((p) => ({
      id: p._id.toString(),
      weight: p.weight,
      calories: p.calories,
      category: p.category,
      title: p.title,
      blood: p.groupBloodNotAllowed,
      recommended: userBlood ? !p.groupBloodNotAllowed[userBlood] : null,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
