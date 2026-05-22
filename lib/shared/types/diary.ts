import type { Types } from "mongoose";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type DiaryProduct = {
  id: string;
  mealType: MealType;
  productId: string;
  title: string;
  category: string;
  caloriesPer100g: number;
  weight: number;
  recommended: boolean;
};

export type DiaryExercise = {
  id: string;
  exerciseId: string;
  bodyPart: string;
  equipment: string;
  name: string;
  target: string;
  burnedCalories: number;
  time: number;
};

export type DiaryData = {
  id: string;
  userId: string;
  date: string;
  products: DiaryProduct[];
  exercises: DiaryExercise[];
  createdAt: string;
  updatedAt: string;
};
export type DBDiaryProduct = {
  _id: Types.ObjectId;
  mealType: MealType;
  productId: Types.ObjectId;
  title: string;
  category: string;
  caloriesPer100g: number;
  weight: number;
  recommended: boolean;
};
export type DBDiaryExercise = {
  _id: Types.ObjectId;
  exerciseId: Types.ObjectId;
  bodyPart: string;
  equipment: string;
  name: string;
  target: string;
  burnedCalories: number;
  time: number;
};
