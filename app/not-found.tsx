import Image from "next/image";

export default function NotFoundPage() {
  return (
    <section className="grid columns-2">
      <div className="bg-orange flex flex-col justify-center px-6 md:px-16">
        <h1 className="text-6xl font-bold text-white mb-6">404</h1>
        <p className="text-white max-w-md mb-8">
          Sorry, you have reached a page that we could not find...
        </p>
        <button className="border border-white text-white px-6 py-3 rounded-lg w-fit">
          Go Home
        </button>
      </div>

      {/* Права частина */}
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
