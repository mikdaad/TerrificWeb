"use client";

import { ProductCard } from "../buildercomponents/home/ProductCard";
import { Category } from "@prisma/client";

// Define Product Type (Based on Prisma Model)
interface Product {
  id: string;
  name: string;
  description: string;
  originalprice: number;
  discountprice: number;
  images: string[];
  category: Category;
  isFeatured: boolean;
  stars: number | { toNumber: () => number }; // Handle possible Prisma Decimal
  reviews: number;
  status: string;
  createdAt: Date;
}

// Props Interface for the Component
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            item={{
              id: product.id,
              name: product.name,
              description: product.description,
              discountprice: product.discountprice,
              images: product.images,
              originalprice: product.originalprice,
              stars: typeof product.stars === "object" && "toNumber" in product.stars
                ? product.stars.toNumber()
                : product.stars,
              reviews: product.reviews,
            }}
          />
        ))
      ) : (
        <p className="col-span-2 text-center text-gray-500 text-lg">Loading...</p>
      )}
    </div>
  );
}
