"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../buildercomponents/home/ProductCard"; // Ensure correct path
import { PrismaClient, Gender, Category, Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";


const prisma = new PrismaClient(); // Ensure Prisma is initialized properly

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
  gender?: Gender; // Must match Prisma enum
  category?: Category; // Must match Prisma enum
  status?: Status; // Must match Prisma enum
}

export default function ProductList({ gender, category, status }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await prisma.product.findMany({
          where: {
            gender: gender || undefined,
            category: category || undefined,
            status: Status.Dealoftheday,
          },
          orderBy: { createdAt: "desc" },
        });

        // Convert Decimal fields to number
        console.log("res" + res);
        const formattedProducts: Product[] = res.map((product) => ({
          ...product,
          stars: (product.stars as Decimal).toNumber(), // Convert Decimal to number
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
    <div className="grid grid-cols-2 gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard 
            key={product.id} 
            item={{
              id: product.id,
              name: product.name,
              description: product.description,
              discountprice: product.discountprice, // Use discounted price
              images: product.images,
              originalprice:product.originalprice,
              stars:product.stars,
              reviews:product.reviews,



            }}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
