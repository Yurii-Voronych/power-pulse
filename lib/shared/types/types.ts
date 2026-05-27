export type Product = {
  id: string;
  caloriesPer100g: number;
  category: string;
  title: string;
};

export type GetProductsResult = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};
export type Card = {
  id: string;
  filter: string;
  name: string;
  imgURL: string;
};

export type Exercise = {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  target: string;
  burnedCalories: number;
  time: number;
};
export type SelectedProduct = {
  productId: string;
  title: string;
  caloriesPer100g: number;
  weight: number;
};
