import { SelectedProduct } from "@/lib/shared/types/types";

interface SelectedProductsBoxProps {
  selectedProducts: SelectedProduct[];
  onWeightChange: (productId: string, weight: string) => void;
  onRemove: (productId: string) => void;
}
export const SelectedProductsBox = ({
  selectedProducts,
  onRemove,
  onWeightChange,
}: SelectedProductsBoxProps) => {
  if (selectedProducts.length === 0) return null;

  const totalCalories = selectedProducts.reduce((total, product) => {
    return total + (product.caloriesPer100g * product.weight) / 100;
  }, 0);

  return (
    <div className="mb-4 rounded-xl border border-white/15 bg-white/3 p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold">Selected products</h3>
          <p className="text-[12px] text-white/40">
            {selectedProducts.length} item
            {selectedProducts.length === 1 ? "" : "s"} ·{" "}
            {Math.ceil(totalCalories)} kcal
          </p>
        </div>
      </div>

      <ul className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-1">
        {selectedProducts.map((product) => (
          <li
            key={product.productId}
            className="rounded-lg border border-white/10 bg-black/40 p-2"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium">
                  {product.title}
                </p>
                <p className="text-[12px] text-white/40">
                  {product.caloriesPer100g} kcal / 100g
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onRemove(product.productId);
                }}
                className="shrink-0 text-[12px] text-orange"
              >
                Remove
              </button>
            </div>

            <label className="flex items-center gap-2 text-[12px] text-white/50">
              Weight
              <input
                type="number"
                min={1}
                value={product.weight}
                onChange={(e) => {
                  onWeightChange(product.productId, e.currentTarget.value);
                }}
                className="h-9 w-24 rounded-lg border border-white/15 bg-transparent px-3 text-[14px] text-white outline-none focus:border-orange"
              />
              g
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
