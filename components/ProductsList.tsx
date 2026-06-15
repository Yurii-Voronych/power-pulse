import { Product } from "@/lib/shared/types/types";
import ProductCard from "./ProductCard";

interface productsListProps {
  products: Product[];
}
const ProductsList = ({ products }: productsListProps) => {
  return (
    <ul className="mb-4 grid grid-cols-1 gap-5 md:mb-6 md:grid-cols-2 2xl:mb-8 2xl:grid-cols-3">
      {products.map((p) => (
        <li key={p.id} className="min-w-0">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
