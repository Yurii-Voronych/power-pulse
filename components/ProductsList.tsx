import { Product } from "@/lib/products/getProducts";

interface productsListProps {
  products: Product[];
}
const ProductsList = ({ products }: productsListProps) => {
  return <div>ProductsList</div>;
};

export default ProductsList;
