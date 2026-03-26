import Product from "@/models/Product";
import { connectDB } from "@/lib/services/mongodb";
type GetProductsParams = {
  page?: number;
  limit?: number;
};
export const getProducts = async ({
  page = 1,
  limit = 12,
}: GetProductsParams) => {
  await connectDB();

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find().skip(skip).limit(limit).lean(),

    Product.countDocuments(),
  ]);

  return {
    products: products.map((p) => ({
      id: p._id.toString(),
      weight: p.weight,
      calories: p.calories,
      category: p.category,
      title: p.title,
      blood: p.groupBloodNotAllowed,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
