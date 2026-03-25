"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "./icons/CloseIcon";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const ProductsFilters = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchFromUrl = params.get("search") || "";

  const [search, setSearch] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const updateParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    newParams.delete("page");

    router.replace(`/products?${newParams.toString()}`);
  };

  useEffect(() => {
    if (debouncedSearch === searchFromUrl) return;

    updateParams("search", debouncedSearch);
  }, [debouncedSearch, searchFromUrl]);

  return (
    <div>
      <div className="relative">
        <input
          value={search}
          type="text"
          className="form-input placeholder:text-white"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <CloseIcon className="text-orange" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsFilters;
