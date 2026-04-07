import Container from "@/components/Container";
import { BackButton } from "./BackButton";

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  return (
    <Container>
      <BackButton />
    </Container>
  );
};
export default page;
