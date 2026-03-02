import Container from "@/components/Container";
import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import Link from "next/link";

export default function Home() {
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
        <h1 className="font-medium text-[38px] md:text-[50px] 2xl:text-[70px] leading-normal 2xl:leading-[1.14] mb-10 md:mb-16 ">
          Transforming your
          <br /> body shape with <br />
          Power Pulse
        </h1>
        <div className="mb-57.75 md:mb-42.75 2xl:mb-0">
          <Link href={"/auth/register"} className="btn-primary mr-3.5 md:mr-5">
            Sign Up
          </Link>
          <Link href={"/auth/login"} className="btn-outline">
            Sign In
          </Link>
        </div>
        <Video className="ml-25.25 md:ml-74.75 mb-17.5 md:mb-14 2xl:mb-0 2xl:ml-0 2xl:absolute left-175 top-35" />
        <Calories className="ml-auto" />
      </Container>
    </section>
  );
}
