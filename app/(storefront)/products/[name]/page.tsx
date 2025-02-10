import { ProductCard } from "@/app/components/storefront/ProductCard";
import  ProductList from "@/app/components/storefront/ProductList";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { PrismaClient, Gender, Category, Status } from "@prisma/client";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          discountprice: true,
          id: true,
          description: true,
        },
        where: {
          status: Status.Dealoftheday,
        },
      });

      return {
        title: "All Products",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        where: {
          status: Status.None,
          gender:Gender.Men ,
        },
        select: {
          name: true,
          images: true,
          discountprice: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for Men",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: {
          status: Status.None,
          gender:Gender.Women ,
        },
        select: {
          name: true,
          images: true,
          discountprice: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products to Women",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: {
          status: Status.None,
          gender:Gender.Kids ,
        },
        select: {
          name: true,
          images: true,
          discountprice: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for Kids",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductList/>
        ))}
      </div>
    </section>
  );
}
