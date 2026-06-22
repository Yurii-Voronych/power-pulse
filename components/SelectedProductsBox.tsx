import clsx from "clsx";
import { SelectedProduct } from "@/lib/shared/types/types";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";
import { calculateSelectedProductsCalories } from "@/lib/shared/calculations/diaryCalculations";

interface SelectedProductsBoxProps {
  selectedProducts: SelectedProduct[];
  onWeightChange: (productId: string, weight: string) => void;
  onRemove: (productId: string) => void;
  onSave: () => void | Promise<void>;
  canSave: boolean;
  isSaving: boolean;
  className?: string;
  listClassName?: string;
}

export const SelectedProductsBox = ({
  selectedProducts,
  onRemove,
  onWeightChange,
  onSave,
  canSave,
  isSaving,
  className,
  listClassName,
}: SelectedProductsBoxProps) => {
  if (selectedProducts.length === 0) return null;

  const totalCalories = calculateSelectedProductsCalories(selectedProducts);

  const validateWeight = (weight: string) => {
    return validateNumberInput(weight, {
      label: "Weight",
      min: 1,
      max: 10000,
    });
  };

  return (
    <div
      className={clsx(
        "mb-3 rounded-xl border border-white/15 bg-white/3 p-1.5",
        className,
      )}
    >
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

      <ul
        className={clsx(
          "flex max-h-40 flex-col gap-2 overflow-y-auto pr-1 meals-scrollbar",
          listClassName,
        )}
      >
        {selectedProducts.map((product) => {
          const weightValidation = validateWeight(product.weight);

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
                    !weightValidation.isValid
                      ? "border-red-500"
                      : "border-white/15",
                  )}
                />
                g
                {weightValidation.error && (
                  <p className="text-red-500">{weightValidation.error}</p>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
