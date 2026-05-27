"use client";

import { NextIcon } from "./icons/NextArrowIcon";

type DrawerPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const DrawerPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: DrawerPaginationProps) => {
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    onPageChange(page);
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
    <div className="flex items-center gap-2 mb-4 justify-center">
      <button
        type="button"
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
            type="button"
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 rounded transition-colors ${
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
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded disabled:opacity-30 hover:text-orange transition-colors"
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default DrawerPagination;
