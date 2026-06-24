import { Product } from "@/lib/shared/types/types";

interface drawerProductsListProps {
  products: Product[];
  selectedProductIds: string[];
  onAddProduct: (product: Product) => void;
}
const DrawerProductsList = ({
  products,
  selectedProductIds,
  onAddProduct,
}: drawerProductsListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {products.map((p) => {
        const isSelected = selectedProductIds.includes(p.id);
        return (
          <li
            key={p.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/3 p-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/40 hover:bg-orange/5 hover:shadow-[0_8px_20px_rgba(230,83,60,0.12)]"
          >
            <div className="flex justify-between w-full">
              <p className="truncate max-w-50 text-[14px] font-medium">
                {p.title}
              </p>
              <p className="text-[12px] text-white/40">
                {p.caloriesPer100g} kcal
              </p>
            </div>

            {isSelected ? (
              <button
                type="button"
                className="shrink-0 rounded-xl border border-orange px-3 py-1.5 text-[12px] text-orange opacity-60"
                disabled
              >
                Added
              </button>
            ) : (
              <button
                type="button"
                className="shrink-0 rounded-xl border border-orange px-3 py-1.5 text-[12px] text-orange shadow-[0_0_0_rgba(230,83,60,0)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange hover:text-white hover:shadow-[0_8px_14px_rgba(230,83,60,0.35)] active:translate-y-0 active:shadow-[0_4px_12px_rgba(230,83,60,0.25)]"
                onClick={() => onAddProduct(p)}
              >
                Add
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default DrawerProductsList;
