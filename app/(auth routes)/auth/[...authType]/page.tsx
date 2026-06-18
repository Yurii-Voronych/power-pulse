import Container from "@/components/Container";
import LoginForm from "@/components/LoginForm";
import RegistrationForm from "@/components/RegistrationForm";
import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type AuthPageProps = {
  params: Promise<{ authType?: string[] }>;
};
export async function generateMetadata({
  params,
}: AuthPageProps): Promise<Metadata> {
  const { authType } = await params;
  const type = authType?.[0];

  const title =
    type === "login"
      ? "Login | Power Pulse"
      : type === "register"
        ? "Registration | Power Pulse"
        : "Power Pulse";

  return {
    title,
    description: "Training App",
  };
}
export default async function AuthPage({ params }: AuthPageProps) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/diary");
  }
  const { authType } = await params;
  const validTypes = ["login", "register"];
  if (authType?.length !== 1 || !validTypes.includes(authType[0])) {
    notFound();
  }
  const authMode = authType[0];

  return (
    <section
      className="
      relative
    max-w-360 mx-auto
    min-h-dvh
    pt-31.75 md:pt-47.25 2xl:pt-47.25
   bg-[linear-gradient(135deg,rgba(4,4,4,1)_21%,rgba(4,4,4,0)_100%),url('/womanPonytail_mobile.jpg')]
    md:bg-[url('/womanPonytail_tablet.jpg')]
     2xl:bg-[url('/womanPonytail_desk.jpg')]
    bg-no-repeat
    bg-contain
     bg-position-[bottom_right]
  "
    >
      <Container className="relative z-10">
        {authMode === "login" ? <LoginForm /> : <RegistrationForm />}
      </Container>
      <Video
        className={`
    pointer-events-none absolute z-0 short-viewport:hidden
    ${
      authMode === "login"
        ? "left-[28vw] bottom-[22vh] md:left-[34vw] md:bottom-[17vh] 2xl:left-[min(48vw,691px)] 2xl:bottom-[30vh]"
        : "left-[28vw] bottom-[15vh] md:left-[48vw] md:bottom-[36vh] 2xl:left-[min(48vw,691px)] 2xl:bottom-[38vh]"
    }`}
        aria-hidden="true"
      />

      <Calories
        className={`
    pointer-events-none absolute z-0 short-viewport:hidden
    ${
      authMode === "login"
        ? "left-[46vw] bottom-6 md:left-[56vw] md:bottom-3 2xl:left-[min(72vw,1037px)] 2xl:bottom-10"
        : "left-[46vw] bottom-6 md:left-[68vw] md:bottom-8 2xl:left-[min(72vw,1037px)] 2xl:bottom-10"
    } 
  `}
        aria-hidden="true"
      />
    </section>
  );
}
