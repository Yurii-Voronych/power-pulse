"use client";
import { Product } from "@/lib/shared/types/types";
import { useModalStore } from "./ui/modal/modal.store";
import AddProductToDiaryModal from "./AddProductToDiaryModal";

interface ProductCardProp {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProp) => {
  const open = useModalStore((s) => s.open);
  const handleAddProduct = () => {
    open(<AddProductToDiaryModal product={product} />);
  };

  return (
    <button
      type="button"
      onClick={handleAddProduct}
      className="group relative flex h-35.25 w-full flex-col overflow-hidden rounded-xl border border-white/20 p-4 text-left shadow-[0_0_0_rgba(230,83,60,0)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/40 hover:bg-orange/5 hover:shadow-[0_10px_24px_rgba(230,83,60,0.14)] focus-visible:border-orange focus-visible:outline-none focus-visible:shadow-[0_10px_24px_rgba(230,83,60,0.14)] active:translate-y-0"
    >
      <h3 className="line-clamp-2 min-w-0 break-words text-[20px] leading-tight text-white">
        {product.title}
      </h3>

      <div className="mt-auto min-w-0 space-y-1 text-[14px] leading-tight">
        <p className="flex min-w-0 gap-1 text-white/40">
          <span className="shrink-0">Calories per 100g:</span>
          <span className="truncate font-medium text-white">
            {product.caloriesPer100g}
          </span>
        </p>
        <p className="flex min-w-0 gap-1 capitalize text-white/40">
          <span className="shrink-0">Category:</span>
          <span className="truncate font-medium text-white">
            {product.category.replace(/-/g, " ")}
          </span>
        </p>
      </div>

      <span className="absolute right-4 bottom-[34px] rounded-xl bg-orange px-4 py-3 text-[14px] font-medium leading-none text-white shadow-[0_10px_22px_rgba(230,83,60,0.24)] transition-all duration-200 md:bottom-4 md:opacity-0 md:shadow-[0_0_0_rgba(230,83,60,0)] md:group-hover:opacity-100 md:group-hover:shadow-[0_10px_22px_rgba(230,83,60,0.36)] md:group-focus-visible:opacity-100 md:group-focus-visible:shadow-[0_10px_22px_rgba(230,83,60,0.36)]">
        + Add product
      </span>
    </button>
  );
};

export default ProductCard;
