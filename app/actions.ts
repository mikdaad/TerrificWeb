"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema,topbannerSchema,bottombannerSchema,variablesschema,discountschema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart,Wishlist } from "./lib/interfaces";
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

  const normalizeArray = (value: any) => {
    try {
      if (Array.isArray(value)) {
        return value.map((item) => item.trim());
      } else if (typeof value === "string") {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map((item: string) => item.trim()) : [];
      }
    } catch (error) {
      console.error("Invalid JSON:", value);
      return [];
    }
  };
  
  const flattensizes = normalizeArray(submission.value.sizes);
  const flattencolors = normalizeArray(submission.value.colors);

  
  


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
      status:submission.value.status,
      sizes: flattensizes,

    // ✅ Ensure colors are always stored as an array
    colors:flattencolors,

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

export async function addItem(productId: string, size: string, color: string) {
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
          id: selectedProduct.id,
          name: selectedProduct.name,
          originalprice: selectedProduct.originalprice,
          imageString: selectedProduct.images[0],
          quantity: 1,
          size: size,
          color: color,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId && item.size === size && item.color === color) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        originalprice: selectedProduct.originalprice,
        imageString: selectedProduct.images[0],
        quantity: 1,
        size: size,
        color: color,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath("/", "layout");
}


export async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      originalprice: true,
      images: true,
      sizes: true,
      colors: true,
    },
  });

  if (!data) return null;

  return data;
}


export async function addToWishlist(productId: string, size: string, color: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  let wishlist: Wishlist | null = await redis.get(`wishlist-${user.id}`);

  // Fetch product details
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
    throw new Error("No product found with this ID");
  }

  // Ensure product has an image
  const productImage = selectedProduct.images?.length > 0 ? selectedProduct.images[0] : "";

  let myWishlist: Wishlist = {
    userId: user.id,
    items: [],
  };

  if (!wishlist || !wishlist.items) {
    // Initialize wishlist if empty
    myWishlist.items = [
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        originalprice: selectedProduct.originalprice,
        imageString: productImage,
        size: size,
        color: color,
      },
    ];
  } else {
    let itemExists = false;

    myWishlist.items = wishlist.items.map((item) => {
      if (item.id === productId) {
        // Update size and color if product already exists
        item.size = size;
        item.color = color;
        itemExists = true;
      }
      return item;
    });

    if (!itemExists) {
      // Add new item if not found
      myWishlist.items.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        originalprice: selectedProduct.originalprice,
        imageString: productImage,
        size: size,
        color: color,
      });
    }
  }

  // Store updated wishlist in Redis
  await redis.set(`wishlist-${user.id}`, myWishlist);

  // Revalidate cache for updates
  revalidatePath("/", "layout");

  return { success: true, message: "Item added to wishlist with updated size and color" };
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

export async function moveToCart(formData: FormData) {
  "use server";
  
  const productId = formData.get("productId") as string; // Extract productId
  if (!productId) {
    throw new Error("Product ID is missing from form data.");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  console.log("Fetching wishlist for:", `wishlist-${user.id}`);
  
  let wishlist: Wishlist | null = await redis.get(`wishlist-${user.id}`);
  console.log("Fetched wishlist:", wishlist);

  if (!wishlist || !wishlist.items) {
    throw new Error("Wishlist is empty.");
  }

  console.log("Looking for product:", productId);
  
  const selectedProduct = wishlist.items.find((item) => item.id === productId);
  console.log("Found product:", selectedProduct);

  if (!selectedProduct) {
    throw new Error(`Product not found in wishlist: ${productId}`);
  }

  // Remove the product from the wishlist
  wishlist.items = wishlist.items.filter((item) => item.id !== productId);
  await redis.set(`wishlist-${user.id}`, wishlist);

  // Add the product to the cart
  let cart: Cart | null = await redis.get(`cart-${user.id}`);
  let myCart: Cart = cart ?? { userId: user.id, items: [] };
  const existingCartItem = myCart.items.find((item) => item.id === productId);

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    myCart.items.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      originalprice: selectedProduct.originalprice,
      imageString: selectedProduct.imageString,
      quantity: 1,
      color: selectedProduct.color,
      size: selectedProduct.size,
    });
  }

  await redis.set(`cart-${user.id}`, myCart);
  revalidatePath("/", "layout");
}


export async function delWishlistItem(formData: FormData) {
  "use server";
  
  const productId = formData.get("productId") as string; // Extract productId
  if (!productId) {
    throw new Error("Product ID is missing from form data.");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let wishlist: Wishlist | null = await redis.get(`wishlist-${user.id}`);

  if (!wishlist || !wishlist.items?.length) {
    throw new Error("Your wishlist is empty.");
  }

  const itemIndex = wishlist.items.findIndex((item) => item.id === productId);

  if (itemIndex === -1) {
    throw new Error(`Product not found in wishlist: ${productId}`);
  }

  // Remove the product from the wishlist
  wishlist.items.splice(itemIndex, 1);
  await redis.set(`wishlist-${user.id}`, wishlist);

  // Revalidate the wishlist page
  revalidatePath("/wishlist");
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  
  

    return redirect("/payment");
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





