import { Product } from "@/lib/shared/types/types";
import { useState } from "react";
import { useModalStore } from "./ui/modal/modal.store";
import toast from "react-hot-toast";
import { addProductsToMeal } from "@/lib/client/api/diaryApi";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import { ValueSelect } from "./ValueSelect";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";

interface AddProductToDiaryModalProps {
  product: Product;
}
const AddProductToDiaryModal = ({ product }: AddProductToDiaryModalProps) => {
  const [productWeight, setProductWeight] = useState("100");
  const [mealType, setMealType] = useState("breakfast");
  const nextWeight = Number(productWeight);
  const isInvalidWeight =
    productWeight.trim() === "" ||
    Number.isNaN(nextWeight) ||
    nextWeight <= 0 ||
    nextWeight > 10000;
  const close = useModalStore((s) => s.close);

  const handleAddProduct = async () => {
    if (isInvalidWeight) return;

    try {
      await addProductsToMeal({
        date: formatDiaryDate(new Date()),
        mealType,
        products: [
          {
            productId: product.id,
            title: product.title,
            caloriesPer100g: product.caloriesPer100g,
            weight: productWeight,
          },
        ],
      });

      toast.success("Product added");
      close();
    } catch {
      toast.error("Something went wrong, please try again later");
    }
  };
  const options = MEAL_TYPES.map((m, i) => {
    return { value: m.value, name: m.label, id: `${i}` };
  });
  return (
    <div className="relative z-10 border border-white/50 rounded-xl p-6 w-[80%] bg-[#10100F]">
      <h2 className="mb-4 text-[14px] text-white font-semibold">
        {product.title}
      </h2>
      <ValueSelect
        options={options}
        value={mealType}
        onChange={setMealType}
        className="w-full mb-4"
      />
      <input
        type="text"
        value={productWeight}
        inputMode="numeric"
        min={1}
        max={10000}
        className="form-input w-full mb-4"
        onChange={(e) => {
          setProductWeight(e.currentTarget.value.trim());
        }}
      />
      {isInvalidWeight ? (
        <p className="mb-4 text-red-500"> Please, enter valid weight</p>
      ) : (
        <p className="mb-4">
          Calories: {Math.ceil((nextWeight / 100) * product.caloriesPer100g)}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          className="btn-primary disabled:opacity-40"
          disabled={isInvalidWeight}
          onClick={handleAddProduct}
        >
          Add to Diary
        </button>
        <button className="btn-outline" onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProductToDiaryModal;
