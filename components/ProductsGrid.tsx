import { DiaryProduct } from "@/lib/shared/types/diary";
import { NextIcon } from "./icons/NextArrowIcon";

interface ProductsGridProps {
  products: DiaryProduct[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="w-full border border-white/20 p-4 rounded-xl mb-10">
      <div className="flex justify-between text-white/50 text-[14px]">
        <p>Products</p>
        <button className="flex text-[14px] text-orange gap-2">
          Add product
          <NextIcon />
        </button>
      </div>
      {products.length === 0 && (
        <p className="text-center text-[14px] text-white/30 pt-20 pb-20">
          No products found
        </p>
      )}
    </div>
  );
};

export default ProductsGrid;
