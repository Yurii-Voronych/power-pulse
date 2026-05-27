"use client";

import { getProducts } from "@/lib/client/api/productsApi";
import { useEffect, useState } from "react";
import { Product } from "@/lib/shared/types/types";
import toast from "react-hot-toast";
import DrawerPagination from "./DrawerPagination";
import { useDebouncedCallback } from "use-debounce";
import { NextIcon } from "./icons/NextArrowIcon";
import DrawerProductsList from "./DrawerProductsList";
interface AddProductsDrawerProps {
  date: string;
  mealType: string;
}
const AddProductsDrawer = ({ date, mealType }: AddProductsDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedUpdate = useDebouncedCallback((value) => {
    setDebouncedSearch(value);
  }, 400);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
    setCurrentPage(1);
    debouncedUpdate(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products, page, totalPages } = await getProducts({
          page: currentPage,
          limit: 10,
          search: debouncedSearch,
        });
        setCurrentPage(page);
        setProducts(products);
        setTotalPages(totalPages);
      } catch {
        toast.error("Something went wrong, please try again later");
      }
    };
    fetchProducts();
  }, [currentPage, debouncedSearch]);

  const handleClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {isDrawerOpen ? (
        <button
          onClick={handleClick}
          className="text-[14px] text-orange flex gap-2 mb-4"
        >
          Close <NextIcon className="rotate-270" />
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="text-[14px] text-orange flex gap-2 mb-4"
        >
          Add products
          <NextIcon className="rotate-90" />
        </button>
      )}

      {isDrawerOpen && (
        <>
          <input
            type="text"
            value={search}
            onChange={onChangeHandler}
            className="form-input mb-4"
          />
          <DrawerProductsList products={products} />
          <DrawerPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
};

export default AddProductsDrawer;
