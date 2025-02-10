import { NextResponse } from "next/server";
import { PrismaClient, Gender, Category, Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// ✅ Use "POST" function instead of default export
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { gender, category, status } = body;

        const products = await prisma.product.findMany({
            where: {
                gender: gender ? gender as Gender : undefined,
                category: category ? category as Category : undefined,
                status: status ? status as Status : undefined,
            },
            orderBy: { createdAt: "desc" },
        });

        const formattedProducts = products.map((product) => ({
            ...product,
            stars: product.stars instanceof Decimal ? product.stars.toNumber() : product.stars,
        }));

        return NextResponse.json(formattedProducts, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
