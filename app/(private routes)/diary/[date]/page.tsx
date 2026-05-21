import Container from "@/components/Container";
import DiaryCaloriesInfoGrid from "@/components/DiaryCaloriesInfoGrid";
import ExercisesGrid from "@/components/ExercisesGrid";
import DiaryDatePicker from "@/components/icons/DiaryDatePicker";
import MealsGrid from "@/components/MealsGrid";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { getDiaryData } from "@/lib/server/data/diary/getDiary";
import {
  getDiaryDateRange,
  validateDiaryDate,
} from "@/lib/shared/utils/diaryDate";
import { notFound, redirect } from "next/navigation";

const DiaryPage = async ({ params }: { params: Promise<{ date: string }> }) => {
  const { date } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }
  if (!user.isProfileCompleted) {
    redirect("/profile/edit");
  }
  const diaryDateRange = getDiaryDateRange(user.createdAt);
  const diaryDateValidation = validateDiaryDate(date, diaryDateRange);

  if (diaryDateValidation.status === "invalid") {
    notFound();
  }

  if (diaryDateValidation.status === "redirect") {
    redirect(`/diary/${diaryDateValidation.date}`);
  }

  const normOfCalories = user.dailyNorm?.calories ?? 0;
  const sportMinutes = user.dailyNorm?.sportMinutes ?? 0;
  const diary = await getDiaryData({ date, userId: user.id });
  const products = diary?.products ?? [];
  const exercises = diary?.exercises ?? [];
  return (
    <Container>
      <div className="flex justify-between items-end mb-10">
        <h1 className="mt-25 text-2xl font-bold">Diary</h1>
        <DiaryDatePicker
          date={date}
          minDate={diaryDateRange.minDate}
          maxDate={diaryDateRange.maxDate}
        />
      </div>
      <DiaryCaloriesInfoGrid
        intake={normOfCalories}
        sportMinutes={sportMinutes}
        products={products}
        exercises={exercises}
      />
      <MealsGrid date={date} products={products} />
      <ExercisesGrid exercises={exercises} />
    </Container>
  );
};

export default DiaryPage;
