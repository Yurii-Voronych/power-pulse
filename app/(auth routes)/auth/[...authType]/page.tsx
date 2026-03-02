import Container from "@/components/Container";
import LoginForm from "@/components/LoginForm";
import RegistrationForm from "@/components/RegistrationForm";
import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { notFound } from "next/navigation";

type JourneyPageProps = {
  params: Promise<{ authType?: string[] }>;
};

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { authType } = await params;
  const validTypes = ["login", "register"];
  if (!authType || !validTypes.includes(authType[0])) {
    return notFound();
  }
  return (
    <section
      className="
      relative
    max-w-360 mx-auto
    min-h-screen
    pt-31.75 md:pt-47.25 2xl:pt-47.25
    bg-[url('/womanPonytail_mobile.jpg')]
    md:bg-[url('/womanPonytail_tablet.jpg')]
     2xl:bg-[url('/womanPonytail_desk.jpg')]
    bg-no-repeat
    bg-contain
     bg-position-[80%_90%]
      md:bg-position-[75%_30%]
       2xl:bg-position-[100%_-10%]
  "
    >
      <Container className="relative ">
        {authType[0] === "login" ? <LoginForm /> : <RegistrationForm />}
        <Video className="2xl:absolute left-175 top-35" />
        <Calories className="" />
      </Container>
    </section>
  );
}
