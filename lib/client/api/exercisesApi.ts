import { Exercise } from "@/lib/shared/types/types";
import api from "./axios";
interface getProductsProps {
  page: number;
  limit: number;
  search: string;
}
export const getExercises = async ({
  page,
  limit,
  search,
}: getProductsProps): Promise<{
  exercises: Exercise[];
  totalPages: number;
  total: number;
  page: number;
}> => {
  const { data } = await api.get(`/exercises`, {
    params: {
      page,
      limit,
      search,
    },
  });
  return data;
};
