import { Product } from "@/lib/shared/types/types";

interface drawerProductsListProps {
  products: Product[];
}
const DrawerProductsList = ({ products }: drawerProductsListProps) => {
  return (
    <ul className="flex gap-2 flex-col mb-4">
      {products.map((p) => (
        <li key={p.id} className="border border-white/30 rounded-xl p-1.5">
          <p>{p.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default DrawerProductsList;
