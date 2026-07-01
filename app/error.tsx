"use client";

import Container from "@/components/Container";
import { Home, RotateCcw, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black pt-25 md:pt-35">
      <div
        className="absolute inset-0 -z-20 bg-[url('/step2_mobile.jpg')] bg-cover bg-center opacity-22 md:bg-[url('/step2_tablet.jpg')] md:opacity-30 2xl:bg-[url('/step2_desk.jpg')]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#040404_0%,rgba(4,4,4,0.92)_48%,rgba(4,4,4,0.62)_100%),radial-gradient(circle_at_18%_28%,rgba(239,137,100,0.22),transparent_30%)]"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[calc(100vh-100px)] items-center">
        <div className="max-w-160 pb-16">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm font-medium text-white/70">
            <TriangleAlert
              className="h-4 w-4 text-orange-1"
              aria-hidden="true"
            />
            Something went wrong
          </div>

          <p className="mb-3 text-[64px] font-bold leading-none text-orange md:text-[104px] 2xl:text-[128px]">
            Error
          </p>
          <h1 className="mb-5 max-w-150 text-[34px] font-medium leading-[1.08] text-white md:text-[56px] 2xl:text-[64px]">
            We hit a bad rep.
          </h1>
          <p className="mb-9 max-w-118 text-sm leading-normal text-white/65 md:text-[18px]">
            The app could not finish this request. Try again, or return to the
            start page.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4">
            <button type="button" onClick={reset} className="btn-primary">
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
              Try again
            </button>
            <Link href="/" className="btn-outline">
              <Home className="h-5 w-5" aria-hidden="true" />
              Back home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
