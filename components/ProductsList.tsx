import { Product } from "@/lib/shared/types/types";
import ProductCard from "./ProductCard";

interface productsListProps {
  products: Product[];
}
const ProductsList = ({ products }: productsListProps) => {
  return (
    <ul className="mb-4 flex gap-5 max-md:flex-col max-md:items-center md:mb-6 md:flex-wrap 2xl:mb-8">
      {products.map((p) => (
        <li key={p.id} className="w-full max-w-83.75">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
