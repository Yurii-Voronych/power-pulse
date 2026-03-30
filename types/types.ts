export interface User {
  _id: string;
  email: string;
  name: string;
  isProfileCompleted: boolean;
  profile?: {
    height: number;
    currentWeight: number;
    desiredWeight: number;
    birthday: Date;
    blood: number;
    sex: string;
    levelActivity: number;
  };
  dailyNorm?: {
    calories: number;
    sportMinutes: number;
  };
  createdAt: string;
  updatedAt: string;
}
export type Product = {
  id: string;
  weight: number;
  calories: number;
  category: string;
  title: string;
  recommended: boolean | null;
};

export type GetProductsResult = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};
