import Container from "@/components/Container";
import ExercisesList from "@/components/ExercisesList";
import { NextIcon } from "@/components/icons/NextArrowIcon";
import Pagination from "@/components/Pagination";
import { getExercisesByCategory } from "@/lib/exercises/getExercisesByCategory";
import Link from "next/link";

const ExercisesCategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { category } = await params;
  const { page: currentPage } = await searchParams;
  const decoded = decodeURIComponent(category);
  const { exercises, page, totalPage } = await getExercisesByCategory({
    category: decoded,
    page: Number(currentPage) || 1,
  });

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
          href="/exercises"
          className="mt-25 text-[14px] text-white/40 flex mb-3"
        >
          <NextIcon className="rotate-180" />
          Back
        </Link>
        <p className="text-2xl font-bold capitalize mb-4">{decoded}</p>
        <ExercisesList cards={exercises} />
        <Pagination currentPage={page} totalPages={totalPage} />
      </Container>
    </section>
  );
};
export default ExercisesCategoryPage;
