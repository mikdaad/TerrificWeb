import { notFound } from "next/navigation";
import { getData } from "../../../actions";
import ProductPage from "../../../components/storefront/productpage"; // Import Client Component

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  if (!data) return notFound();

  return <ProductPage data={data} />; // Render Client Component
}
