import Container from "@/components/Container";
import LoginForm from "@/components/LoginForm";
import RegistrationForm from "@/components/RegistrationForm";
import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { notFound, redirect } from "next/navigation";

type AuthPageProps = {
  params: Promise<{ authType?: string[] }>;
};

export default async function AuthPage({ params }: AuthPageProps) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/diary");
  }
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
   bg-[linear-gradient(135deg,rgba(4,4,4,1)_21%,rgba(4,4,4,0)_100%),url('/womanPonytail_mobile.jpg')]
    md:bg-[url('/womanPonytail_tablet.jpg')]
     2xl:bg-[url('/womanPonytail_desk.jpg')]
    bg-no-repeat
    bg-contain
     bg-position-[bottom_right]
  "
    >
      <Container className="relative ">
        {authType[0] === "login" ? <LoginForm /> : <RegistrationForm />}
        <Video
          className={`
    absolute short-viewport:hidden
    ${
      authType[0] === "login"
        ? "-bottom-25 left-35 md:-bottom-25 md:left-60 2xl:bottom-20 2xl:left-150"
        : "-bottom-20 left-35 md:bottom-0 md:left-85 2xl:bottom-50 2xl:left-150"
    }`}
        />

        <Calories
          className={`
    absolute short-viewport:hidden
    ${
      authType[0] === "login"
        ? "-bottom-50 left-60 md:-bottom-55 md:left-95 2xl:-bottom-50 2xl:left-270"
        : "-bottom-45 left-58 md:-bottom-40 md:left-135 2xl:-bottom-50 2xl:left-270"
    }
  `}
        />
      </Container>
    </section>
  );
}
