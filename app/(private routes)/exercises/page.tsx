import Container from "@/components/Container";
import ExercisesList from "@/components/ExercisesList";

import { ExercisesTabs } from "@/components/ExercisesTabs";

import { getFilters } from "@/lib/filters/getFilters";

const ExercisesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter = "Body parts" } = await searchParams;
  const { cards } = await getFilters(filter);

  return (
    <Container>
      <h1 className="mt-25 text-2xl font-bold mb-4">Exercises</h1>
      <ExercisesTabs />
      <ExercisesList cards={cards} key={filter} />
    </Container>
  );
};

export default ExercisesPage;
