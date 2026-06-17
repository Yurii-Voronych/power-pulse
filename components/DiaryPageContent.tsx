"use client";

import { useState } from "react";
import DiaryCaloriesInfoGrid from "./DiaryCaloriesInfoGrid";
import ExercisesGrid from "./ExercisesGrid";
import MealsGrid from "./MealsGrid";
import { DiaryExercise, DiaryProduct } from "@/lib/shared/types/diary";

interface DiaryPageContentProps {
  date: string;
  intake: number;
  sportMinutes: number;
  products: DiaryProduct[];
  initialExercises: DiaryExercise[];
  userWeight: number | undefined;
}

const DiaryPageContent = ({
  date,
  intake,
  sportMinutes,
  products,
  initialExercises,
  userWeight,
}: DiaryPageContentProps) => {
  const [exercises, setExercises] = useState(initialExercises);

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_442px] xl:items-start xl:gap-7">
      <div className="xl:order-2">
        <DiaryCaloriesInfoGrid
          intake={intake}
          sportMinutes={sportMinutes}
          products={products}
          exercises={exercises}
        />
      </div>
      <div className="xl:order-1">
        <MealsGrid date={date} products={products} />
        <ExercisesGrid
          exercises={exercises}
          onExercisesChange={setExercises}
          date={date}
          userWeight={userWeight}
        />
      </div>
    </div>
  );
};

export default DiaryPageContent;
