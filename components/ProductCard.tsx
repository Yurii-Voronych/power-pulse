import { Product } from "@/lib/shared/types/types";
import { PersonIcon } from "./icons/PersonIcon";

interface ProductCardProp {
  product: Product;
}
const ProductCard = async ({ product }: ProductCardProp) => {
  return (
    <div
      className="w-83.75
  h-35.25 border border-white/20 rounded-xl p-4"
    >
      <div className="flex gap-2 w-fit ml-auto text-[12px] mb-10">
        <button className="text-orange">add</button>
      </div>
      <div className="flex gap-4 w-70 mb-2">
        <div className="w-6 h-6 rounded-full bg-orange-1 flex justify-center items-center shrink-0">
          <PersonIcon className="w-4 h-4" />
        </div>
        <span className="truncate">{product.title}</span>
      </div>
      <div className="flex text-[12px] justify-between">
        <div>
          <span className="text-white/40">Calories per 100g:</span>
          {product.caloriesPer100g}
        </div>
        <div className="capitalize">
          <span className="text-white/40">Category:</span>
          {product.category.replace(/-/g, " ")}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
