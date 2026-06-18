import { Product } from "@/lib/shared/types/types";
import { useState } from "react";
import { useModalStore } from "./ui/modal/modal.store";
import toast from "react-hot-toast";
import { addProductsToMeal } from "@/lib/client/api/diaryApi";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import { ValueSelect } from "./ValueSelect";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";

interface AddProductToDiaryModalProps {
  product: Product;
}
const AddProductToDiaryModal = ({ product }: AddProductToDiaryModalProps) => {
  const [productWeight, setProductWeight] = useState("100");
  const [mealType, setMealType] = useState("breakfast");
  const [isLoading, setIsLoading] = useState(false);
  const weightValidation = validateNumberInput(productWeight, {
    label: "Weight",
    min: 1,
    max: 10000,
  });
  const nextWeight = weightValidation.value ?? 0;
  const isInvalidWeight = !weightValidation.isValid;
  const close = useModalStore((s) => s.close);

  const handleAddProduct = async () => {
    if (isInvalidWeight) return;

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  const options = MEAL_TYPES.map((m, i) => {
    return { value: m.value, name: m.label, id: `${i}` };
  });
  return (
    <div className="relative z-10 max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-xl border border-white/50 bg-[#10100F] p-5 md:p-8 2xl:max-w-xl 2xl:p-10">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
        <h2 className="min-w-0 wrap-break-word text-[16px] font-semibold text-white 2xl:text-[20px]">
          {product.title}
        </h2>
        <p className="shrink-0 text-[14px] text-white/60 md:text-right 2xl:text-[16px]">
          Add product to date:{" "}
          <span className="text-orange-1">{formatDiaryDate(new Date())}</span>
        </p>
      </div>
      <ValueSelect
        options={options}
        value={mealType}
        onChange={setMealType}
        className="mb-4 w-full min-w-0 2xl:text-[18px]"
      />
      <input
        type="text"
        aria-label="Product weight in grams"
        value={productWeight}
        inputMode="numeric"
        min={1}
        max={10000}
        className="form-input mb-4 w-full min-w-0 2xl:text-[18px]"
        onChange={(e) => {
          setProductWeight(e.currentTarget.value);
        }}
      />
      {isInvalidWeight ? (
        <p className="mb-4 text-red-500 2xl:text-[18px]">
          {weightValidation.error}
        </p>
      ) : (
        <p className="mb-4 2xl:text-[18px]">
          Calories: {Math.ceil((nextWeight / 100) * product.caloriesPer100g)}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="btn-primary min-w-0 w-full disabled:opacity-40"
          disabled={isInvalidWeight || isLoading}
          onClick={handleAddProduct}
        >
          Add
        </button>
        <button
          type="button"
          className="btn-outline min-w-0 w-full disabled:opacity-40"
          onClick={close}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProductToDiaryModal;
