import Image from "next/image";

export default function NotFoundPage() {
  return (
    <section className="grid columns-2">
      <div className="bg-orange flex flex-col justify-center ">
        <h1 className="">404</h1>
        <p className="">
          Sorry, you have reached a page that we could not find...
        </p>
      </div>
      <div className="hidden md:block">
        <Image
          src="/gym.jpg"
          alt="Workout"
          className="w-full h-full object-cover"
          width={670}
          height={1000}
        />
      </div>
    </section>
  );
}
