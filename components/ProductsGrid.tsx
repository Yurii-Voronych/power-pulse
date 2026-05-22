import { DiaryProduct } from "@/lib/shared/types/diary";

interface productsGridProps {
  products: DiaryProduct[];
}
const ProductsGrid = ({ products }: productsGridProps) => {
  return (
    <ul className="text-[14px] flex flex-col gap-2">
      {products.map((product) => {
        const consumedCalories =
          (product.weight / 100) * product.caloriesPer100g;
        return (
          <li
            key={product.id}
            className="p-1.5 bg-orange-500/10 rounded-xl border border-white/10"
          >
            <div>
              <span className="text-orange-1">{product.title}</span>
              <span>{consumedCalories} kcal</span>
              <span>{product.weight} g</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsGrid;
