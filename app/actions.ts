"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema,topbannerSchema,bottombannerSchema,variablesschema,discountschema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      gender: submission.value.gender,
      originalprice: submission.value.originalprice,
      discountprice: submission.value.discountprice,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
      stars: submission.value.stars,
      reviews: submission.value.reviews,
      status:submission.value.status

    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      originalprice: submission.value.originalprice,
      isFeatured: submission.value.isFeatured === true ? true : false,
      gender: submission.value.gender,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
      pricing: submission.value.pricing,
    },
  });

  redirect("/dashboard/banner");
}

export async function createTopBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: topbannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.topBanner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
      description: submission.value.description,
      subtext: submission.value.subtext,
    },
  });

  redirect("/dashboard/topbanner");
}

export async function createBottomBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bottombannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.bottomBanner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
      subtext: submission.value.subtext,
    },
  });

  redirect("/dashboard/bottombanner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      originalprice: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          originalprice: selectedProduct.originalprice,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        originalprice: selectedProduct.originalprice,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath("/", "layout");
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        originalprice_data: {
          currency: "usd",
          unit_amount: item.originalprice * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/success"
          : "https://shoe-marshal.vercel.app/payment/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/cancel"
          : "https://shoe-marshal.vercel.app/payment/cancel",
      metadata: {
        userId: user.id,
      },
    });

    return redirect(session.url as string);
  }
}


export async function updatediscount(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: discountschema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const category = formData.get("category") as string;
  const gender = formData.get("gender") as string;
  const discountPercentage = parseFloat(formData.get("discount") as string); // Convert to number

  // Fetch all products matching the criteria
  const products = await prisma.product.findMany({
    where: {
      category: category as any,
      gender: gender as any,
    },
  });

  // Iterate and update each product with the new discount price
  for (const product of products) {
    const discountAmount = (product.originalprice * discountPercentage) / 100;
    const newDiscountPrice = product.originalprice - discountAmount;

    await prisma.product.update({
      where: { id: product.id },
      data: {
        discountprice: Math.round(newDiscountPrice), // Ensure it's an integer
      },
    });
  }
  redirect("/dashboard/products");
}


export async function updatevariables(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "terrificmaile@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: variablesschema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const daytime = parseInt(formData.get("daytime") as string, 10); // Ensure it's an integer
  const lastdate = formData.get("lastdate") as string; // Keep as string

  // Update the single row in the `variables` table
  await prisma.variables.updateMany({
    data: {
      daytime: daytime, 
      lastdate: lastdate,
    },
  });

  redirect("/dashboard/products");
}


