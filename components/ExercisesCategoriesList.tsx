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
      <ul className="flex gap-5 max-md:flex-col mb-4 md:flex-wrap 2xl:mb-8 max-md:items-center">
        {currentCards.map((c) => (
          <li key={c.name}>
            <Link href={`/exercises/${filter}/${encodeURIComponent(c.name)}`}>
              <div className="relative w-83.75 h-51.5 overflow-hidden rounded-xl 2xl:w-58">
                <Image
                  src={c.imgURL}
                  alt={c.name}
                  fill
                  className="object-cover"
                  sizes="335px 226px"
                />

                <div className="absolute inset-0 bg-[rgba(4,4,4,0.5)]" />
                <div className="absolute top-[40%] left-30 2xl:left-20">
                  <p className="text-white text-[20px] capitalize ">{c.name}</p>
                  <p className="text-[12px] text-white/60 ">{c.filter}</p>
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
