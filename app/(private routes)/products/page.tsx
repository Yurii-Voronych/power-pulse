import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import ProductsFilters from "@/components/ProductsFilters";
import ProductsList from "@/components/ProductsList";
import { getCategories } from "@/lib/server/data/categories/getCategories";
import { getProducts } from "@/lib/server/data/products/getProducts";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { z } from "zod";
export const metadata: Metadata = {
  title: "Products | Power Pulse",
  description: "Training App",
};
const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const categoriesList = await getCategories();
  const categoriesValidationArr = categoriesList.map((c) => c.value);
  const rawParams = await searchParams;

  const searchParamsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(12),
    category: z.enum(categoriesValidationArr).optional(),
    search: z.string().trim().max(35).optional(),
  });

  const parsed = searchParamsSchema.safeParse(rawParams);

  if (!parsed.success) {
    redirect("/products");
  }

  const { page, limit, category, search } = parsed.data;

  const products = await getProducts({
    page,
    limit,
    category,
    search,
  });

  if (products.totalPages > 0 && page > products.totalPages) {
    const params = new URLSearchParams({
      page: String(products.totalPages),
    });

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (limit !== 12) params.set("limit", String(limit));

    redirect(`/products?${params.toString()}`);
  }
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
