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
            className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/3 p-1.5"
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
                className="shrink-0 rounded-xl border border-orange px-3 py-1.5 text-[12px] text-orange"
                disabled
              >
                Added
              </button>
            ) : (
              <button
                type="button"
                className="shrink-0 rounded-xl border border-orange px-3 py-1.5 text-[12px] text-orange"
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
