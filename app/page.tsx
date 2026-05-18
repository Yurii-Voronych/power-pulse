import Container from "@/components/Container";
import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/diary");
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
     bg-position-[bottom_right]
  "
    >
      <Container className="relative ">
        <h1 className="font-medium text-[38px] md:text-[50px] 2xl:text-[70px] leading-[1.05] md:leading-normal 2xl:leading-[1.14] mb-10 md:mb-16 ">
          Transforming your
          <br /> body shape with <br />
          Power Pulse
        </h1>
        <div className="">
          <Link href={"/auth/register"} className="btn-primary mr-3.5 md:mr-5">
            Sign Up
          </Link>
          <Link href={"/auth/login"} className="btn-outline">
            Sign In
          </Link>
        </div>
      </Container>
      <Video className="absolute bottom-50 left-25 md:left-95 2xl:bottom-130 2xl:left-155 short-viewport:hidden md:[@media(max-height:830px)]:hidden" />
      <Calories className="absolute bottom-20 left-60 md:bottom-10 md:left-140 2xl:bottom-45 2xl:left-300 short-viewport:hidden md:[@media(max-height:830px)]:hidden" />
    </section>
  );
}
