"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../buildercomponents/home/productcard2";
import { Gender, Category, Status } from "@prisma/client";
import { InfiniteSlider } from "../ui/infiniteslider";

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

export default function ProductList3({ gender, category, status }: ProductListProps) {
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
        const lastFourProducts = formattedProducts.slice(-4);

        setProducts(lastFourProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [gender, category, status]);

  return (
    <div className="">
      
      {loading ? (
        <div className="flex justify-center items-center ml-36">
          <div className="flex flex-row gap-10">
        <div className="animate-spin  rounded-full h-10 w-10 border-t-4 border-black border-solid"></div>
        <div className="animate-spin  rounded-full h-10 w-10 border-t-4 border-yellow-400 border-solid"></div>
        <div className="animate-spin  rounded-full h-10 w-10 border-t-4 border-black border-solid"></div>
        <div className="animate-spin  rounded-full h-10 w-10 border-t-4 border-yellow-400 border-solid"></div>
      </div>
      </div>
      ) : products.length > 0 ? (
        <InfiniteSlider gap={24} reverse>
          {products.map((product) => (
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
              }}
            />
          ))}
        </InfiniteSlider>
      )  : (
        <p>No products found.</p>
      )}
      
    
       
    </div>
   
  );
}
