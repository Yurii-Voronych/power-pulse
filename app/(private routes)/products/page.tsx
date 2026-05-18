import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import ProductsFilters from "@/components/ProductsFilters";
import ProductsList from "@/components/ProductsList";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { getCategories } from "@/lib/server/categories/getCategories";
import { getProducts } from "@/lib/server/products/getProducts";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const categoriesList = await getCategories();
  const categoriesValidationArr = categoriesList.map((c) => c.value);
  const rawParams = await searchParams;
  const user = await getCurrentUser();
  const blood = user?.profile?.blood;
  const searchParamsSchema = z.object({
    page: z.string().transform(Number).default(1),
    limit: z.string().transform(Number).default(12),
    category: z.enum(categoriesValidationArr).optional(),
    recommended: z.enum(["true", "false"]).optional(),
    search: z.string().optional(),
  });

  const parsed = searchParamsSchema.safeParse(rawParams);

  if (!parsed.success) {
    redirect("/products?page=1");
  }

  const { page, limit, category, recommended, search } = parsed.data;

  const products = await getProducts({
    page,
    limit,
    category,
    recommended,
    search,
    blood,
  });

  return (
    <section
      className="relative max-w-360 mx-auto min-h-screen 2xl:bg-[url('/products_desk.jpg')]
    bg-no-repeat
    bg-contain
     bg-position-[bottom_right]
     overflow-hidden
  "
    >
      <Container>
        <h1 className="text-[24px] leading-[1.16667] font-bold mb-10 mt-25">
          Products
        </h1>
        <ProductsFilters categoriesList={categoriesList} />
        {products.products.length > 0 && (
          <ProductsList products={products.products} />
        )}
        {products.products.length === 0 && (
          <div className="text-[12px] 2xl:w-100">
            <p className="mb-4">
              <span className="text-orange">Sorry, no results were found</span>{" "}
              for the product filters you selected. You may want to consider
              other search options to find the product you want. Our range is
              wide and you have the opportunity to find more options that suit
              your needs.
            </p>
            <p className="text-orange">Try changing the search parameters.</p>
          </div>
        )}
        {products.totalPages > 1 && (
          <Pagination
            currentPage={products.page}
            totalPages={products.totalPages}
          />
        )}
      </Container>
    </section>
  );
};

export default ProductsPage;
