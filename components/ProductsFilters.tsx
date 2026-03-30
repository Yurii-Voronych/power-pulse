"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "./icons/CloseIcon";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { CustomSelect } from "./CustomSelect";
interface ProductsFiltersProps {
  categoriesList: {
    id: string;
    value: string;
    name: string;
  }[];
}
const ProductsFilters = ({ categoriesList }: ProductsFiltersProps) => {
  const recommendationList = [
    { id: "1", value: "", name: "All" },
    { id: "2", value: "true", name: "Recommended" },
    { id: "3", value: "false", name: "Not recommended" },
  ];
  const router = useRouter();
  const params = useSearchParams();
  const searchFromUrl = params.get("search") || "";
  const category = params.get("category") || "";
  const recommended = params.get("recommended") || "";

  const [search, setSearch] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(params.toString());

      if (value) newParams.set(key, value);
      else newParams.delete(key);

      newParams.delete("page");

      router.replace(`/products?${newParams.toString()}`);
    },
    [params, router],
  );

  useEffect(() => {
    if (debouncedSearch !== search) return;

    if (debouncedSearch === searchFromUrl) return;

    updateParams("search", debouncedSearch);
  }, [debouncedSearch, searchFromUrl, updateParams, search]);

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
            type="button"
            onClick={() => {
              setSearch("");
              updateParams("search", "");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <CloseIcon className="text-orange" />
          </button>
        )}
      </div>
      <div className="flex gap-3.5 mt-4">
        <CustomSelect
          options={categoriesList}
          param="category"
          onChange={updateParams}
          chosen={category}
        />
        <CustomSelect
          options={recommendationList}
          param="recommended"
          onChange={updateParams}
          chosen={recommended}
        />
      </div>
    </div>
  );
};

export default ProductsFilters;
