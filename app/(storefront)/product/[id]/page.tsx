import { addItem,addToWishlist } from "@/app/actions";
import { ShoppingBagButton,WishlistButton } from "@/app/components/SubmitButtons";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      originalprice: true,
      images: true,
      description: true,
      name: true,
      id: true,
      sizes: true, // Ensure sizes are fetched from DB
      colors: true, // Ensure colors are fetched from DB
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);
  const addProducttowishlist = addToWishlist.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start px-5 lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${data.originalprice}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>

           {/* Available Sizes */}
           <div className="mt-4">
            <label className="text-lg font-medium">Available Sizes:</label>
            <select
              name="size"
              className="mt-2 block w-full border p-2 rounded"
              defaultValue=""
              required
            >
              <option value="" disabled>Select Size</option>
              {data.sizes.map((size: string) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Available Colors */}
          <div className="mt-4">
            <label className="text-lg font-medium">Available Colors:</label>
            <div className="flex gap-2 mt-2">
              {data.colors.map((color: string) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>


          <form action={async (formData) => {
            "use server";
            const size = formData.get("size") as string;
            const color = formData.get("color") as string;
            await addItem(data.id, size, color);
          }}>
            <ShoppingBagButton />
          </form>
          

          <form action={async (formData) => {
            "use server";
            const size = formData.get("size") as string;
            const color = formData.get("color") as string;
            await addToWishlist(data.id, size, color);
          }}>
            <WishlistButton />
          </form>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
