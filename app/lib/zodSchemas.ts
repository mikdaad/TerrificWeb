import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  gender: z.enum(["Men", "Women", "Kids","Unisex"]),
  originalprice: z.number().min(1),
  discountprice: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["Fashion", "Luxury"]),
  isFeatured: z.boolean().optional(),
  stars:  z.number().min(1),
  status: z.enum(["Dealoftheday", "TrendingProduct", "TrendingProduct2", "NewArrival","None"]),
  sizes:z.array(z.string()).min(1, "At least one size is required"),
  colors:z.array(z.string()).min(1, "At least one color is required"),

});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
  pricing: z.string(),
  pricingd: z.string(),
});

export const topbannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
  description: z.string(),
  subtext: z.string(),
});

export const bottombannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
  subtext: z.string(),
});

export const variablesschema = z.object({
  daytime: z.number(),
  lastdate: z.string(),
});

export const discountschema = z.object({
  discount: z.number(),
});



