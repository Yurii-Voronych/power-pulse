import Container from "@/components/Container";
import DiaryPageContent from "@/components/DiaryPageContent";
import DiaryDatePicker from "@/components/DiaryDatePicker";
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
  const userWeight = user.profile?.currentWeight ?? undefined;
  const diary = await getDiaryData({ date, userId: user.id });
  const products = diary?.products ?? [];
  const exercises = diary?.exercises ?? [];
  return (
    <Container>
      <div className="flex max-2xl:justify-between items-end mb-10 2xl:mb-7 2xl:gap-4">
        <h1 className="mt-25 text-2xl font-bold xl:mt-20">Diary</h1>
        <DiaryDatePicker
          date={date}
          minDate={diaryDateRange.minDate}
          maxDate={diaryDateRange.maxDate}
        />
      </div>
      <DiaryPageContent
        date={date}
        intake={normOfCalories}
        sportMinutes={sportMinutes}
        products={products}
        initialExercises={exercises}
        userWeight={userWeight}
      />
    </Container>
  );
};

export default DiaryPage;
