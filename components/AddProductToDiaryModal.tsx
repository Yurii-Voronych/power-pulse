import { Product } from "@/lib/shared/types/types";
import { useState } from "react";
import { useModalStore } from "./ui/modal/modal.store";
import toast from "react-hot-toast";
import { addProductsToMeal } from "@/lib/client/api/diaryApi";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import { ValueSelect } from "./ValueSelect";
import {
  formatDiaryDate,
  getDiaryDateRange,
} from "@/lib/shared/utils/diaryDate";
import { validateNumberInput } from "@/lib/shared/utils/validateNumberInput";
import DiaryDateSelect from "./DiaryDateSelect";
import useAuthStore from "@/lib/client/store/authStore";

interface AddProductToDiaryModalProps {
  product: Product;
}
const AddProductToDiaryModal = ({ product }: AddProductToDiaryModalProps) => {
  const [productWeight, setProductWeight] = useState("100");
  const [mealType, setMealType] = useState("breakfast");
  const [selectedDate, setSelectedDate] = useState(formatDiaryDate(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const diaryDateRange = getDiaryDateRange(
    user?.createdAt ?? new Date().toISOString(),
  );
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
        date: selectedDate,
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
    <div className="relative z-10 max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-lg overflow-y-auto overflow-x-hidden rounded-xl border border-white/50 bg-[#10100F] p-5 md:p-8 2xl:max-w-xl 2xl:p-10">
      <div className="mb-4 space-y-3">
        <div>
          <p className="mb-1 text-[12px] font-medium uppercase tracking-[0.08em] text-orange">
            Add product
          </p>
          <h2 className="line-clamp-2 min-w-0 break-words text-[20px] font-semibold leading-tight text-white 2xl:text-[24px]">
            {product.title}
          </h2>
        </div>
        <DiaryDateSelect
          date={selectedDate}
          minDate={diaryDateRange.minDate}
          maxDate={diaryDateRange.maxDate}
          onChange={setSelectedDate}
          className="w-full"
        />
      </div>
      <ValueSelect
        options={options}
        value={mealType}
        onChange={setMealType}
        className="mb-4 w-full min-w-0 2xl:text-[18px]"
      />
      <div className="relative mb-4">
        <input
          type="text"
          aria-label="Product weight in grams"
          value={productWeight}
          inputMode="numeric"
          min={1}
          max={10000}
          placeholder=" "
          className="form-input peer w-full min-w-0 pr-10 pb-1.5 pt-5 text-white 2xl:text-[18px]"
          onChange={(e) => {
            setProductWeight(e.currentTarget.value);
          }}
        />
        <label
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
        >
          Weight
        </label>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-white/60">
          g
        </span>
      </div>
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
          className="btn-outline min-w-0 w-full disabled:opacity-40"
          onClick={close}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-primary min-w-0 w-full disabled:opacity-40"
          disabled={isInvalidWeight || isLoading}
          onClick={handleAddProduct}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProductToDiaryModal;
