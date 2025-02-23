import { checkOut, delItem } from "@/app/actions";
import { ChceckoutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart,newcart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import db from "../../../lib/db";
import {PaymentPage} from "../payment/page";

import { redirect } from "next/navigation";

export default async function BagRoute() {
  noStore();
  const user = await db.user.current(); 

  if (!user) {
    redirect("/auth/signin");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

cart?.items.forEach((item) => {
  totalPrice += item.discountprice * Number(item.quantity);
});

const cartItems: Array<newcart> = cart?.items?.map((item) => ({
  id: item.id ,
  imageString: item.imageString ,
  name: item.name,
  color: item.color,
  size: item.size,
  discountprice: item.discountprice,
  quantity: item.quantity,
})) || [];

  return (
    <div className="p-4 max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You dont have any products in your Bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any products in your shopping bag. Please
            add some so that you can see them right here.
          </p>

          <Button asChild>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  className="rounded-md object-cover"
                  fill
                  src={item.imageString}
                  alt="Product image"
                />
              </div>
              <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="space-y-3 justify-center">
                <p>{item.color}</p>
                <p> {item.size}</p>
                </div>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>₹{item.discountprice}</p>
                  </div>

                  <form action={delItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}
           <div>

          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p>Subtotal:</p>
              <p>₹{totalPrice}</p>
            </div>
            </div>
             <PaymentPage totalPrice={totalPrice} cartItems={cartItems} />

            </div>
          </div>
       
      )}
    </div>
  );
}
