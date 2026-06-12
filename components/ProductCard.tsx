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
    <div
      className="min-h-35.25 w-full max-w-83.75 rounded-xl border border-white/20 p-4"
    >
      <div className="flex gap-2 w-fit ml-auto text-[12px] mb-10">
        <button
          className="text-orange flex gap-1.5 items-center"
          onClick={() => {
            open(<AddProductToDiaryModal product={product} />);
          }}
        >
          Add <NextIcon />
        </button>
      </div>
      <div className="mb-2 flex w-full min-w-0 gap-4">
        <div className="w-6 h-6 rounded-full bg-orange-1 flex justify-center items-center shrink-0">
          <PersonIcon className="w-4 h-4" />
        </div>
        <span className="truncate">{product.title}</span>
      </div>
      <div className="flex justify-between gap-3 text-[12px]">
        <div>
          <span className="text-white/40">Calories per 100g:</span>
          {product.caloriesPer100g}
        </div>
        <div className="min-w-0 break-words text-right capitalize">
          <span className="text-white/40">Category:</span>
          {product.category.replace(/-/g, " ")}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
