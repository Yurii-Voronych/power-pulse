import Container from "@/components/Container";

import DiaryDatePicker from "@/components/icons/DiaryDatePicker";
import CaloriesIntake from "@/components/ui/CaloriesIntake";
import SportMinutes from "@/components/ui/SportMinutes";

const DiaryPage = async ({ params }: { params: Promise<{ date: string }> }) => {
  const { date } = await params;
  return (
    <Container>
      <div className="flex justify-between items-end mb-10">
        <h1 className="mt-25 text-2xl font-bold">Diary</h1>
        <DiaryDatePicker date={date} />
      </div>
      <div className="flex justify-between">
        <CaloriesIntake />
        <SportMinutes />
      </div>
    </Container>
  );
};

export default DiaryPage;
