import { DiaryProduct } from "@/lib/shared/types/diary";
import TrashIcon from "./icons/Trash";

interface productsGridProps {
  products: DiaryProduct[];
}

const ProductsGrid = ({ products }: productsGridProps) => {
  return (
    <ul className="text-[14px] flex flex-col gap-2 max-h-100 overflow-y-auto mb-2">
      {products.map((product) => {
        const consumedCalories =
          (product.weight / 100) * product.caloriesPer100g;
        const roundedConsumedCalories = Math.ceil(consumedCalories);

        return (
          <li
            key={product.id}
            className="rounded-xl border border-white/10 bg-orange-500/10 px-3 py-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-orange-1">
                  {product.title}
                </p>
                <p className="mt-1 text-[13px] text-white/65">
                  <span className="text-white">{roundedConsumedCalories}</span>{" "}
                  kcal - <span className="text-white">{product.weight}</span> g
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button type="button" className="text-[13px] text-white">
                  Edit
                </button>
                <button type="button">
                  <TrashIcon />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsGrid;
