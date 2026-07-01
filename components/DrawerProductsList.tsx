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
          <li key={p.id}>
            {isSelected ? (
              <button
                type="button"
                className="group flex w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-orange/40 bg-orange/5 p-1.5 text-left opacity-75"
                disabled
              >
                <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-[14px] font-medium">
                    {p.title}
                  </span>
                  <span className="shrink-0 text-[12px] text-white/40">
                    {p.caloriesPer100g} kcal
                  </span>
                </span>
                <span className="shrink-0 rounded-xl border border-orange px-2.5 py-1.5 text-[12px] text-orange sm:px-3">
                  Added
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="group flex w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/3 p-1.5 text-left shadow-[0_0_0_rgba(230,83,60,0)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/40 hover:bg-orange/5 hover:shadow-[0_8px_20px_rgba(230,83,60,0.12)] active:translate-y-0"
                onClick={() => onAddProduct(p)}
              >
                <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-[14px] font-medium">
                    {p.title}
                  </span>
                  <span className="shrink-0 text-[12px] text-white/40">
                    {p.caloriesPer100g} kcal
                  </span>
                </span>
                <span className="shrink-0 rounded-xl border border-orange px-2.5 py-1.5 text-[12px] text-orange shadow-[0_0_0_rgba(230,83,60,0)] transition-all duration-200 group-hover:bg-orange group-hover:text-white group-hover:shadow-[0_8px_14px_rgba(230,83,60,0.35)] sm:px-3">
                  Add
                </span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default DrawerProductsList;
