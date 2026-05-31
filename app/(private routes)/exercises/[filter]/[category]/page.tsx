import Container from "@/components/Container";
import ExercisesList from "@/components/ExercisesList";
import { ExercisesTabs } from "@/components/ExercisesTabs";
import { NextIcon } from "@/components/icons/NextArrowIcon";
import Pagination from "@/components/Pagination";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { getExercisesByCategory } from "@/lib/server/data/exercises/getExercisesByCategory";
import Link from "next/link";
import { redirect } from "next/navigation";

const ExercisesCategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    category: string;
    filter: string;
  }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { category, filter } = await params;
  const { page: currentPage } = await searchParams;
  const decoded = decodeURIComponent(category);
  const { exercises, page, totalPage } = await getExercisesByCategory({
    category: decoded,
    page: Number(currentPage) || 1,
  });
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  const weight = user.profile?.currentWeight;

  return (
    <section
      className="relative max-w-360 mx-auto min-h-screen 2xl:bg-[url('/womanPonytail_desk.jpg')]
    bg-no-repeat
    bg-contain
     bg-position-[bottom_right]
     overflow-hidden
  "
    >
      <Container>
        <Link
          href={`/exercises/${filter}`}
          className="mt-25 text-[14px] text-white/40 flex mb-3"
        >
          <NextIcon className="rotate-180" />
          Back
        </Link>
        <ExercisesTabs />
        <p className="text-2xl font-bold capitalize mb-4">{decoded}</p>
        <ExercisesList cards={exercises} userWeight={weight} />
        <Pagination currentPage={page} totalPages={totalPage} />
      </Container>
    </section>
  );
};
export default ExercisesCategoryPage;
