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
    min-h-205
    pt-[127px] md:pt-[189px] 2xl:pt-[200px]
    bg-[url('/womanPonytail_mobile.jpg')]
    md:bg-[url('/womanPonytail_tablet.jpg')]
     2xl:bg-[url('/womanPonytail_desk.jpg')]
    bg-no-repeat
    bg-fit
     bg-position-[70%_60%]
      md:bg-position-[85%_100%]
       2xl:bg-position-[100%_-10%]
  "
    >
      <Container className="relative">
        <h1 className="font-medium text-[38px] md:text-[50px] 2xl:text-[70px] leading-normal 2xl:leading-[1.14] mb-10 md:mb-16 ">
          Transforming your
          <br /> body shape with <br />
          Power Pulse
        </h1>
        <div className="mb-57.75 md:mb-42.75 2xl:mb-0">
          <Link href={"/auth/sign-in"} className="btn-primary mr-3.5 md:mr-5">
            Sign Up
          </Link>
          <Link href={"/auth/sign-up"} className="btn-outline">
            Sign In
          </Link>
        </div>
        <Video
          className="ml-25.25 md:ml-74.75 mb-17.5 md:mb-14 2xl:mb-0 2xl:ml-0 2xl:absolute left-175 top-35
        "
        />
        <Calories className="ml-auto " />
      </Container>
    </section>
  );
}
