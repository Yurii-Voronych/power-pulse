import Container from "@/components/Container";
import ExercisesCategoriesList from "@/components/ExercisesCategoriesList";

import { ExercisesTabs } from "@/components/ExercisesTabs";

import { getFilters } from "@/lib/server/data/filters/getFilters";

const ExercisesPage = async ({
  params,
}: {
  params: Promise<{ filter: string }>;
}) => {
  const { filter } = await params;
  const { cards } = await getFilters(filter);
  return (
    <Container>
      <h1 className="mt-25 text-2xl font-bold mb-4">Exercises</h1>
      <ExercisesTabs />
      <ExercisesCategoriesList cards={cards} filter={filter} />
    </Container>
  );
};

export default ExercisesPage;
