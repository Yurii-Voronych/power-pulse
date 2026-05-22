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
        {product.recommended ? (
          <div className="w-fit flex items-center">
            <span className="w-3.5 h-3.5 rounded-full bg-green-500 inline-block mr-2"></span>
            Recommended
          </div>
        ) : (
          <div className="w-fit flex items-center">
            <span className="w-3.5 h-3.5 rounded-full bg-red-700 inline-block mr-2"></span>
            Not Recommended
          </div>
        )}
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
          <span className="text-white/40">Calories:</span>
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
