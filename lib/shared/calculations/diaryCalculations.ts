import { DiaryExercise, DiaryProduct } from "@/lib/shared/types/diary";
import { SelectedExercise, SelectedProduct } from "@/lib/shared/types/types";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";

export const calculateProductCalories = (
  product: Pick<DiaryProduct, "caloriesPer100g" | "weight">,
) => {
  return (product.caloriesPer100g * product.weight) / 100;
};

export const calculateProductsCalories = (
  products: Pick<DiaryProduct, "caloriesPer100g" | "weight">[],
) => {
  return products.reduce((total, product) => {
    return total + calculateProductCalories(product);
  }, 0);
};

export const calculateSelectedProductCalories = (
  product: Pick<SelectedProduct, "caloriesPer100g" | "weight">,
) => {
  const weightValidation = validateNumberInput(product.weight, {
    label: "Weight",
    min: 1,
    max: 10000,
  });

  if (!weightValidation.isValid || weightValidation.value === null) return 0;

  return (product.caloriesPer100g * weightValidation.value) / 100;
};

export const calculateSelectedProductsCalories = (
  products: Pick<SelectedProduct, "caloriesPer100g" | "weight">[],
) => {
  return products.reduce((total, product) => {
    return total + calculateSelectedProductCalories(product);
  }, 0);
};

export const calculateExercisesCalories = (
  exercises: Pick<DiaryExercise, "burnedCalories">[],
) => {
  return exercises.reduce((total, exercise) => {
    return total + exercise.burnedCalories;
  }, 0);
};

export const calculateExercisesMinutes = (
  exercises: Pick<DiaryExercise, "time">[],
) => {
  return exercises.reduce((total, exercise) => {
    return total + exercise.time;
  }, 0);
};

export const calculateSelectedExerciseCalories = (
  exercise: Pick<SelectedExercise, "caloriesPerHour" | "time">,
) => {
  const timeValidation = validateNumberInput(exercise.time, {
    label: "Time",
    min: 1,
    max: 1440,
    integer: true,
  });

  if (!timeValidation.isValid || timeValidation.value === null) return 0;

  return (exercise.caloriesPerHour * timeValidation.value) / 60;
};

export const calculateSelectedExercisesCalories = (
  exercises: Pick<SelectedExercise, "caloriesPerHour" | "time">[],
) => {
  return exercises.reduce((total, exercise) => {
    return total + calculateSelectedExerciseCalories(exercise);
  }, 0);
};
