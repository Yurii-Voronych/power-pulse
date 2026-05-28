import clsx from "clsx";
import { SelectedProduct } from "@/lib/shared/types/types";

interface SelectedProductsBoxProps {
  selectedProducts: SelectedProduct[];
  onWeightChange: (productId: string, weight: string) => void;
  onRemove: (productId: string) => void;
  onSave: () => void | Promise<void>;
  canSave: boolean;
  isSaving: boolean;
}

export const SelectedProductsBox = ({
  selectedProducts,
  onRemove,
  onWeightChange,
  onSave,
  canSave,
  isSaving,
}: SelectedProductsBoxProps) => {
  if (selectedProducts.length === 0) return null;

  const totalCalories = selectedProducts.reduce((total, product) => {
    const weight = Number(product.weight);

    if (product.weight.trim() === "" || Number.isNaN(weight) || weight <= 0) {
      return total;
    }

    return total + (product.caloriesPer100g * weight) / 100;
  }, 0);

  const isWeightInvalid = (weight: string) => {
    const value = Number(weight);

    return weight.trim() === "" || Number.isNaN(value) || value <= 0;
  };

  return (
    <div className="mb-3 rounded-xl border border-white/15 bg-white/3 p-1.5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex w-full justify-between">
          <div>
            <h3 className="text-[14px] font-semibold">Selected products</h3>
            <p className="text-[12px] text-white/40">
              {selectedProducts.length} item
              {selectedProducts.length === 1 ? "" : "s"} -{" "}
              {Math.ceil(totalCalories)} kcal
            </p>
          </div>
          <button
            type="button"
            className="btn-primary max-w-20 disabled:opacity-40 md:hidden"
            disabled={!canSave}
            onClick={onSave}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <ul className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-1">
        {selectedProducts.map((product) => {
          const invalidWeight = isWeightInvalid(product.weight);

          return (
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

              <label className="relative flex w-fit items-center gap-2 text-[12px] text-white/50">
                Weight
                <input
                  type="text"
                  inputMode="numeric"
                  min={1}
                  max={10000}
                  value={product.weight}
                  onChange={(e) => {
                    onWeightChange(product.productId, e.currentTarget.value);
                  }}
                  className={clsx(
                    "h-9 w-24 rounded-lg border bg-transparent px-3 text-[14px] text-white outline-none focus:border-orange",
                    invalidWeight ? "border-red-500" : "border-white/15",
                  )}
                />
                g
                {invalidWeight && (
                  <p className="text-red-500">Invalid weight</p>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
