import { Product } from "@/types/types";
import ProductCard from "./ProductCard";

interface productsListProps {
  products: Product[];
}
const ProductsList = ({ products }: productsListProps) => {
  return (
    <ul className="flex gap-5 flex-col mb-4">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
