"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "./icons/CloseIcon";
import { useEffect, useState } from "react";
import { CustomSelect } from "./CustomSelect";
import { useDebouncedCallback } from "use-debounce";
interface ProductsFiltersProps {
  categoriesList: {
    id: string;
    value: string;
    name: string;
  }[];
}
const ProductsFilters = ({ categoriesList }: ProductsFiltersProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const searchFromUrl = params.get("search") || "";
  const category = params.get("category") || "";

  const [search, setSearch] = useState(searchFromUrl);

  const handleClear = () => {
    setSearch("");
    debouncedUpdate.cancel();
    updateParams("search", "");
  };
  const updateParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    newParams.delete("page");

    router.replace(`/products?${newParams.toString()}`);
  };

  const debouncedUpdate = useDebouncedCallback((value: string) => {
    updateParams("search", value);
  }, 400);

  return (
    <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
      <div className="relative">
        <input
          value={search}
          maxLength={35}
          type="text"
          className="form-input w-full placeholder:text-white"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedUpdate(e.target.value);
          }}
        ></input>
        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <CloseIcon className="text-orange" />
          </button>
        )}
      </div>
      <div>
        <CustomSelect
          options={categoriesList}
          param="category"
          onChange={updateParams}
          chosen={category}
        />
      </div>
    </div>
  );
};

export default ProductsFilters;
