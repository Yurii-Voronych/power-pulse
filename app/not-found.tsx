import Container from "@/components/Container";
import { Dumbbell, Home } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black pt-25 md:pt-35">
      <div
        className="absolute inset-0 -z-20 bg-[url('/womanPonytail_mobile.jpg')] bg-contain bg-right-bottom bg-no-repeat opacity-35 md:bg-[url('/womanPonytail_tablet.jpg')] md:opacity-45 2xl:bg-[url('/womanPonytail_desk.jpg')]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_24%,rgba(230,83,60,0.24),transparent_28%),linear-gradient(90deg,#040404_0%,rgba(4,4,4,0.94)_42%,rgba(4,4,4,0.56)_100%)]"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[calc(100vh-100px)] items-center">
        <div className="max-w-160 pb-16">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm font-medium text-white/70">
            <Dumbbell className="h-4 w-4 text-orange" aria-hidden="true" />
            Page not found
          </div>

          <p className="mb-3 text-[72px] font-bold leading-none text-orange md:text-[120px] 2xl:text-[150px]">
            404
          </p>
          <h1 className="mb-5 max-w-150 text-[34px] font-medium leading-[1.08] text-white md:text-[56px] 2xl:text-[64px]">
            This route missed the workout.
          </h1>
          <p className="mb-9 max-w-118 text-sm leading-[1.5] text-white/65 md:text-[18px]">
            The page you are looking for does not exist, was moved, or is no
            longer available.
          </p>

          <Link href="/" className="btn-primary">
            <Home className="h-5 w-5" aria-hidden="true" />
            Back home
          </Link>
        </div>
      </Container>
    </section>
  );
}
