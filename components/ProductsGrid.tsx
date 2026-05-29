import { DiaryProduct } from "@/lib/shared/types/diary";
import TrashIcon from "./icons/Trash";
import EditIcon from "./icons/EditIcon";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import { Check } from "lucide-react";

interface productsGridProps {
  products: DiaryProduct[];
  onRemoveProduct: (productId: string) => void;
  deletingProductId: string | null;
  onWeightUpd: (productId: string, weight: number) => Promise<void>;
  isUpdating: boolean;
}

const ProductsGrid = ({
  products,
  onRemoveProduct,
  deletingProductId,
  onWeightUpd,
  isUpdating,
}: productsGridProps) => {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [draftWeight, setDraftWeight] = useState("");
  const weightInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!editingProductId) return;

    weightInputRef.current?.focus();
  }, [editingProductId]);
  return (
    <ul className="text-[14px] flex flex-col gap-2 max-h-100 overflow-y-auto mb-2">
      {products.map((product) => {
        const consumedCalories =
          (product.weight / 100) * product.caloriesPer100g;
        const roundedConsumedCalories = Math.ceil(consumedCalories);
        const isEditing = editingProductId === product.id;
        const nextWeight = Number(draftWeight);
        const isInvalidWeight =
          draftWeight.trim() === "" ||
          Number.isNaN(nextWeight) ||
          nextWeight <= 0 ||
          nextWeight > 10000;
        return (
          <li
            key={product.id}
            className="rounded-xl border border-white/10 bg-orange-500/10 px-3 py-2"
          >
            <div className="min-w-0 flex justify-between items-center pb-2">
              <p className="truncate text-[14px] font-medium text-orange-1">
                {product.title}
              </p>
              <button
                type="button"
                className="p-1 disabled:opacity-40"
                disabled={deletingProductId === product.id}
                onClick={() => onRemoveProduct(product.id)}
              >
                <TrashIcon className="text-orange " />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[14px] text-white/65">
                <span className="text-white">{roundedConsumedCalories}</span>{" "}
                kcal -{" "}
                {isEditing ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    ref={weightInputRef}
                    min={1}
                    max={10000}
                    className="w-10 pl-1 bg-transparent rounded-md border border-white/50 text-white outline-none focus:border focus:border-orange"
                    value={draftWeight}
                    onChange={(e) => setDraftWeight(e.currentTarget.value)}
                  />
                ) : (
                  <span className="text-white">{product.weight}</span>
                )}{" "}
                g
              </p>
              {isEditing ? (
                <div>
                  <button
                    type="button"
                    className="text-[14px] text-white p-1 disabled:opacity-40"
                    disabled={isInvalidWeight || isUpdating}
                    onClick={async () => {
                      await onWeightUpd(product.id, nextWeight);
                      setEditingProductId(null);
                      setDraftWeight("");
                    }}
                  >
                    <Check className="text-orange w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="text-[14px] text-white p-1 disabled:opacity-40"
                    disabled={isUpdating}
                    onClick={() => {
                      setEditingProductId(null);
                      setDraftWeight("");
                    }}
                  >
                    <CloseIcon className="text-orange w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="text-[14px] text-white p-1 disabled:opacity-40"
                  disabled={editingProductId !== null && !isEditing}
                  onClick={() => {
                    setEditingProductId(product.id);
                    setDraftWeight(String(product.weight));
                  }}
                >
                  <EditIcon className="text-orange" />
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsGrid;
