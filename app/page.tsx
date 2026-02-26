import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className="
    pt-16.5 md:pt-26.25
    h-187.5 md:h-235
    bg-[url('/womanPonytail_mobile.jpg')]
    md:bg-[url('/womanPonytail_tablet.jpg')]
    bg-no-repeat
    bg-position-[left_80px_bottom_0px]
    md:bg-position-[left_340px_bottom_-5px]
  "
    >
      <div className="ml-5 mr-5 md:ml-8 md:mr-8 relative z-10">
        <h1 className="font-medium text-[38px] md:text-[50px] leading-normal mb-10 md:mb-16">
          Transforming your
          <br /> body shape with <br />
          Power Pulse
        </h1>
        <div className="mb-57.75 md:mb-42.75">
          <Link href={"/sign-in"} className="btn-primary mr-3.5 md:mr-5">
            Sign Up
          </Link>
          <Link href={"/sign-up"} className="btn-outline">
            Sign In
          </Link>
        </div>
        <Video className="ml-25.25 md:ml-74.75 mb-17.5 md:mb-14" />
        <Calories className="ml-auto" />
      </div>
    </section>
  );
}
