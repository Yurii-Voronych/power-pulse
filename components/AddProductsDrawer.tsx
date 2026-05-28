"use client";

import { getProducts } from "@/lib/client/api/productsApi";
import { useEffect, useState } from "react";
import { Product, SelectedProduct } from "@/lib/shared/types/types";
import toast from "react-hot-toast";
import DrawerPagination from "./DrawerPagination";
import { useDebouncedCallback } from "use-debounce";
import { NextIcon } from "./icons/NextArrowIcon";
import DrawerProductsList from "./DrawerProductsList";
import { SelectedProductsBox } from "./SelectedProductsBox";
import { addProductsToMeal } from "@/lib/client/api/diaryApi";
import { DiaryProduct } from "@/lib/shared/types/diary";
interface AddProductsDrawerProps {
  date: string;
  mealType: string;
  onProductsAdded: (addProducts: DiaryProduct[]) => void;
}

const AddProductsDrawer = ({
  date,
  mealType,
  onProductsAdded,
}: AddProductsDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const [isSaving, setIsSaving] = useState(false);
  const addProduct = (product: Product) => {
    const exists = selectedProducts.some((p) => p.productId === product.id);

    if (exists) return;

    setSelectedProducts((prev) => [
      ...prev,
      {
        productId: product.id,
        title: product.title,
        caloriesPer100g: product.caloriesPer100g,
        weight: "100",
      },
    ]);
  };
  const removeProduct = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.productId !== id));
  };
  const updateWeight = (productId: string, weight: string) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product.productId !== productId) {
          return product;
        }

        return {
          ...product,
          weight: weight,
        };
      }),
    );
  };
  const hasInvalidWeight = selectedProducts.some((product) => {
    const weight = Number(product.weight);

    return (
      product.weight.trim() === "" ||
      Number.isNaN(weight) ||
      weight <= 0 ||
      weight > 10000
    );
  });
  const canSave = selectedProducts.length > 0 && !hasInvalidWeight && !isSaving;
  const selectedProductIds = selectedProducts.map((p) => p.productId);
  const mealLabel = mealType.charAt(0).toUpperCase() + mealType.slice(1);

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
    if (!isDrawerOpen) return;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, debouncedSearch, isDrawerOpen]);

  const handleClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleSave = async () => {
    if (!canSave) return;

    try {
      setIsSaving(true);
      const { products } = await addProductsToMeal({
        date,
        mealType,
        products: selectedProducts,
      });
      onProductsAdded(products);
      setSelectedProducts([]);
      setIsDrawerOpen(false);
      toast.success("Products added");
    } catch {
      toast.error("Something went wrong, please try again later");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button type="button" onClick={handleClick} className="btn-primary mb-2">
        Add products
      </button>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close add products drawer"
            className="absolute inset-0 bg-black/60"
            onClick={handleClick}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-110 flex-col border-l border-white/15 bg-black pt-5 px-5 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] text-white/40">{date}</p>
                <h2 className="text-xl font-bold">Add products</h2>
                <p className="text-[14px] text-orange">{mealLabel}</p>
              </div>

              <button
                type="button"
                onClick={handleClick}
                className="flex items-center gap-2 text-[14px] text-orange md:hidden"
              >
                Close
                <NextIcon className="rotate-270" />
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={onChangeHandler}
              placeholder="Search products"
              className="form-input mb-4"
            />

            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="mb-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold">
                    Available products
                  </h3>
                  {isLoading && (
                    <span className="text-[12px] text-white/40">
                      Loading...
                    </span>
                  )}
                </div>

                {!isLoading && products.length === 0 ? (
                  <p className="rounded-xl border border-white/10 p-6 text-center text-[14px] text-white/40">
                    No products found
                  </p>
                ) : (
                  <DrawerProductsList
                    products={products}
                    selectedProductIds={selectedProductIds}
                    onAddProduct={addProduct}
                  />
                )}
              </div>
            </div>
            <SelectedProductsBox
              selectedProducts={selectedProducts}
              onRemove={removeProduct}
              onWeightChange={updateWeight}
              onSave={handleSave}
              canSave={canSave}
              isSaving={isSaving}
            />
            <div className="border-t border-white/10">
              <DrawerPagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />

              <div className="flex gap-3 max-md:hidden">
                <button
                  type="button"
                  onClick={handleClick}
                  className="h-11 flex-1 rounded-xl border border-white/20 text-[14px] text-white/80"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canSave}
                  className="h-11 flex-1 rounded-xl bg-orange text-[14px] font-semibold text-white disabled:opacity-40"
                  onClick={handleSave}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default AddProductsDrawer;
