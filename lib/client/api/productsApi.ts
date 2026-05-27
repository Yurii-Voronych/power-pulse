import { Product } from "@/lib/shared/types/types";
import api from "./axios";
interface getProductsProps {
  page: number;
  limit: number;
  search: string;
}
export const getProducts = async ({
  page,
  limit,
  search,
}: getProductsProps): Promise<{
  products: Product[];
  totalPages: number;
  total: number;
  page: number;
}> => {
  const { data } = await api.get(`/products`, {
    params: {
      page,
      limit,
      search,
    },
  });
  return data;
};
