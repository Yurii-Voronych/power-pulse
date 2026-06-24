"use client";
import { Card } from "@/lib/shared/types/types";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface exercisesListProps {
  cards: Card[];
  filter: string;
}
const ExercisesCategoriesList = ({ cards, filter }: exercisesListProps) => {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const currentCards = cards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <ul className="mb-4 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 2xl:mb-8">
        {currentCards.map((c) => (
          <li key={c.id} className="min-w-0">
            <Link
              href={`/exercises/${filter}/${encodeURIComponent(c.name)}`}
              className="group block rounded-xl outline-none transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-1 focus-visible:outline-orange"
            >
              <div className="relative h-51.5 w-full overflow-hidden rounded-xl border border-transparent transition-colors duration-300 ease-out group-hover:border-orange/30 group-focus-visible:border-orange/30">
                <Image
                  src={c.imgURL}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                  sizes="(min-width: 1536px) 234px, (min-width: 1280px) 403px, (min-width: 768px) calc(50vw - 42px), calc(100vw - 40px)"
                />

                <div className="absolute inset-0 bg-[rgba(4,4,4,0.5)] transition-colors duration-300 group-hover:bg-[rgba(4,4,4,0.4)] group-focus-visible:bg-[rgba(4,4,4,0.4)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
                  <p className="text-[20px] capitalize text-white transition-colors duration-300 group-hover:text-orange-1 group-focus-visible:text-orange-1">
                    {c.name}
                  </p>
                  <p className="text-[12px] text-white/60 transition-colors duration-300 group-hover:text-white/80 group-focus-visible:text-white/80">
                    {c.filter}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-4 mx-auto mb-5">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-3.5 h-3.5 rounded-full ${
                  isActive
                    ? " border-2  shadow-[0_0_0_3px_black_inset] bg-orange-1 border-orange-1"
                    : "border-[#636366] bg-white/40"
                }`}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ExercisesCategoriesList;
