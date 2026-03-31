"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { NextIcon } from "./icons/NextArrowIcon";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const getPages = () => {
    const delta = 2;
    const range: (number | "...")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 mt-8 mb-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded disabled:opacity-30 hover:text-orange transition-colors"
      >
        <NextIcon className="rotate-180" />
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 rounded transition-colors
              ${
                currentPage === page
                  ? "bg-orange text-white"
                  : "hover:text-orange"
              }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded disabled:opacity-30 hover:text-orange transition-colors"
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default Pagination;
