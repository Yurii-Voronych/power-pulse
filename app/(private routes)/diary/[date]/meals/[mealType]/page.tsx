import Container from "@/components/Container";
import { NextIcon } from "@/components/icons/NextArrowIcon";
import ProductsGrid from "@/components/ProductsGrid";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { getDiaryData } from "@/lib/server/data/diary/getDiary";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import {
  getDiaryDateRange,
  validateDiaryDate,
} from "@/lib/shared/utils/diaryDate";
import Link from "next/link";

import { notFound, redirect } from "next/navigation";

const MealPage = async ({
  params,
}: {
  params: Promise<{
    date: string;
    mealType: string;
  }>;
}) => {
  const { date, mealType } = await params;
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
    redirect(`/diary/${diaryDateValidation.date}/meals/${mealType}`);
  }
  const meal = MEAL_TYPES.find((meal) => meal.value === mealType);
  if (!meal) {
    notFound();
  }

  const diary = await getDiaryData({
    date,
    userId: user.id,
  });
  const products =
    diary?.products.filter((p) => p.mealType === meal.value) ?? [];
  const totalMealConsumption = products.reduce((total, p) => {
    return total + p.calories * (p.weight / 100);
  }, 0);
  const hasProducts = products.length > 0;
  return (
    <Container>
      <Link
        href={`/diary/${date}`}
        className="text-[14px] text-orange mt-20 mb-2 flex gap-2"
      >
        <NextIcon className="rotate-180" />
        Back to diary
      </Link>
      <div className=" flex justify-between mb-5">
        <h1 className="text-2xl font-bold">{meal.label}</h1>
        <p className="text-[18px] font-semibold">{date}</p>
      </div>
      <div className="w-full max-h-60 border border-white/20 rounded-xl p-2 flex flex-col gap-2 mb-10">
        {hasProducts ? (
          <>
            <ProductsGrid products={products} />
            <p>{totalMealConsumption}</p>
          </>
        ) : (
          <p className="pt-20 pb-20 text-center">No products added yet</p>
        )}
      </div>
      <button>Add products</button>
    </Container>
  );
};

export default MealPage;
