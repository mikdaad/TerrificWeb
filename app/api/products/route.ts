import { NextResponse } from "next/server";
import { PrismaClient, Gender, Category, Status,Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { search, gender, category, status } = body;

        let products: Product[] = [];

        if (search) {
            // PostgreSQL full-text search (if using PostgreSQL)
            products = await prisma.$queryRaw`
              SELECT *
              FROM "Product"
              WHERE to_tsvector('english', name) @@ plainto_tsquery(${search})
              ORDER BY ts_rank(to_tsvector('english', name), plainto_tsquery(${search})) DESC
              LIMIT 10;
            `;
        } else {
            // Prisma Query for filtering
            products = await prisma.product.findMany({
                where: {
                    gender: gender ? gender as Gender : undefined,
                    category: category ? category as Category : undefined,
                    status: status ? status as Status : undefined,
                },
                orderBy: { createdAt: "desc" },
            });
        }

        // Convert Decimal fields to numbers
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



