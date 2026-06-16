import Container from "@/components/Container";
import ExercisesList from "@/components/ExercisesList";
import { ExercisesTabs } from "@/components/ExercisesTabs";
import { NextIcon } from "@/components/icons/NextArrowIcon";
import Pagination from "@/components/Pagination";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { getExercisesByCategory } from "@/lib/server/data/exercises/getExercisesByCategory";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Exercises | Power Pulse",
  description: "Training App",
};
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
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  const { category, filter } = await params;
  const searchParam = await searchParams;
  const decoded = decodeURIComponent(category);
  const categoryHref = `/exercises/${filter}/${encodeURIComponent(decoded)}`;
  const requestedPage = searchParam.page ? Number(searchParam.page) : 1;

  if (!Number.isInteger(requestedPage) || requestedPage < 1) {
    redirect(categoryHref);
  }

  const result = await getExercisesByCategory({
    filter,
    category: decoded,
    page: requestedPage,
  });
  if (!result) {
    notFound();
  }
  const { exercises, page, totalPage } = result;

  if (totalPage > 0 && requestedPage > totalPage) {
    redirect(`${categoryHref}?page=${totalPage}`);
  }

  if (totalPage === 0 && requestedPage > 1) {
    redirect(categoryHref);
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
