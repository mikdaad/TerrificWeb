"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../buildercomponents/home/ProductCard";
import { Gender, Category, Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

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
  stars: number;
  reviews: number;
  status: string;
  createdAt: Date;
}

// Props Interface for the Component
interface ProductListProps {
  gender?: Gender;
  category?: Category;
  status?: Status;
}

export default function ProductList({ gender, category, status }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Build query parameters dynamically
        const params = new URLSearchParams({
          ...(gender && { gender }),
          ...(category && { category }),
          ...(status && { status }),
        });

        const response = await fetch(`/api/products?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const res: Product[] = await response.json();

        // Convert Decimal fields to numbers if necessary
        const formattedProducts: Product[] = res.map((product) => ({
          ...product,
          stars: (product.stars as any)?.toNumber ? (product.stars as any).toNumber() : product.stars, 
          discountprice: (product.discountprice as any)?.toNumber ? (product.discountprice as any).toNumber() : product.discountprice,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [gender, category, status]);

  return (
    <div className="grid grid-cols-2  lg:grid-cols-3 gap-0">
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard 
            key={product.id} 
             className="w-full"
            item={{
              id: product.id,
              name: product.name,
              description: product.description,
              discountprice: product.discountprice,
              images: product.images,
              originalprice: product.originalprice,
              stars: product.stars,
              reviews: product.reviews,
            }}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
