"use client";
import { Product } from "@/lib/shared/types/types";
import { PersonIcon } from "./icons/PersonIcon";
import { useModalStore } from "./ui/modal/modal.store";
import AddProductToDiaryModal from "./AddProductToDiaryModal";
import { NextIcon } from "./icons/NextArrowIcon";

interface ProductCardProp {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProp) => {
  const open = useModalStore((s) => s.open);
  return (
    <div className="min-h-35.25 w-full rounded-xl border border-white/20 p-4">
      <div className="flex gap-2 w-fit ml-auto text-[12px] mb-10">
        <button
          className="group flex items-center gap-1.5 text-orange transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-1 active:translate-y-0"
          onClick={() => {
            open(<AddProductToDiaryModal product={product} />);
          }}
        >
          Add{" "}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <NextIcon />
          </span>
        </button>
      </div>
      <div className="mb-2">
        <div className="mr-4 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-1">
          <PersonIcon className="w-4 h-4" />
        </div>
        <span className="truncate">{product.title}</span>
      </div>
      <div className="flex justify-between gap-3 text-[12px]">
        <div>
          <span className="text-white/40">Calories per 100g:</span>{" "}
          {product.caloriesPer100g}
        </div>
        <div className="min-w-0 wrap-break-word text-right capitalize">
          <span className="text-white/40">Category:</span>{" "}
          {product.category.replace(/-/g, " ")}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
