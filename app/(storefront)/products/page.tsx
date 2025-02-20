import { Suspense } from "react";
import ProductList from "../../components/storefront/ProductList";

const fetchProducts = async (searchParams: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchParams}`, {
    cache: "no-store", // Ensure fresh data on each request
  });
  return response.json();
};

const ProductsPage = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const queryParams = new URLSearchParams(searchParams).toString();
  const products = await fetchProducts(queryParams);

  return (
    <section className="p-2 space-y-4">
      <h2 className="text-xl font-semibold">Products</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList products={products} />
      </Suspense>
    </section>
  );
};

export default ProductsPage;
