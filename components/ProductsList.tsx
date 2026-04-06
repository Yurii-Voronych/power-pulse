import { Product } from "@/types/types";
import ProductCard from "./ProductCard";

interface productsListProps {
  products: Product[];
}
const ProductsList = ({ products }: productsListProps) => {
  return (
    <ul className="flex gap-5 max-md:flex-col mb-4 md:flex-wrap md:md-6 2xl:mb-8">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
