import { PersonIcon } from "@/components/icons/PersonIcon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-between">
      <div className="ml-24">
        <h1>Transforming your body shape with Power Pulse</h1>
        <div>
          <Link href={"/sign-in"} className="btn-primary">
            Sign Up
          </Link>
          <Link href={"/sign-up"} className="btn-outline">
            Sign In
          </Link>
        </div>
      </div>
      <div>
        <Image src="/gym.jpg" alt="ff" width={670} height={800} />
        <div className="w-45 h-27.5 bg-orange-1 rounded-xl relative pl-7 pt-11.5 font-bold text-[16px] leading-normal text-white/65">
          <div className="bg-beige rounded-[50%] w-6 h-6 flex justify-center items-center absolute top-3.5 left-7">
            <PersonIcon className="text-white w-4 h-4" />
          </div>
          <span
            className="font-bold
            text-white
            text-5xl
            mr-2.5
            leading-[1.04]"
          >
            500
          </span>
          cal
        </div>
      </div>
    </section>
  );
}
