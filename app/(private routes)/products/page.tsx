import Container from "@/components/Container";
import ProductsFilters from "@/components/ProductsFilters";

const ProductsPage = () => {
  return (
    <section
      className="
      relative
    max-w-360 mx-auto
    min-h-screen
    mt-25
       2xl:bg-[url('/products_desk.jpg')]
    bg-no-repeat
    bg-contain
     bg-position-[bottom_right]
  "
    >
      <Container>
        <h1 className="text-[24px] leading-[1.16667] font-bold mb-10">
          Products
        </h1>
        <ProductsFilters />
      </Container>
    </section>
  );
};

export default ProductsPage;
