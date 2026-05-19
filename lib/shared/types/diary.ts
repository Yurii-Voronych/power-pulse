export type DiaryProduct = {
  _id: string;
  productId: string;
  title: string;
  category: string;
  calories: number;
  weight: number;
  recommended: boolean;
};

export type DiaryExercise = {
  _id: string;
  exerciseId: string;
  bodyPart: string;
  equipment: string;
  name: string;
  target: string;
  burnedCalories: number;
  time: number;
};

export type DiaryData = {
  _id: string;
  userId: string;
  date: string;
  products: DiaryProduct[];
  exercises: DiaryExercise[];
  createdAt: string;
  updatedAt: string;
};
