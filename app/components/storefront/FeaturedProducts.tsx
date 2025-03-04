import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import ProductList from "./ProductList";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { type $Enums } from "@prisma/client";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "None",
      isFeatured: true,
    },
    select: {
      name: true,
          images: true,
          discountprice: true,
          id: true,
          description: true,
          originalprice: true,
          category: true,
          isFeatured: true,
          stars: true,
          status: true,
          createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return data;
}

export function FeaturedProducts() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedproducts />
      </Suspense>
    </>
  );
}

async function LoadFeaturedproducts() {
  noStore();
  const data = await getData();

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      
        <ProductList products={data}/> 
        </div>
     
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
