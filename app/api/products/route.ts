// pages/api/products.ts (or .js depending on your setup)
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient ,Gender, Category, Status} from '@prisma/client';
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { gender, category, status } = req.body;

  try {
    const products = await prisma.product.findMany({
      where: {
        gender: typeof gender === "string" ? (gender as Gender) : undefined, // Ensure it's a string
        category: typeof category === "string" ? category as Category : undefined,
        status: typeof status === "string" ? status as Status : undefined,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format the products if needed (e.g., convert Decimal to number)
    const formattedProducts = products.map((product) => ({
      ...product,
      stars: (product.stars as Decimal).toNumber(),
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
 