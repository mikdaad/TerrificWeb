import { NextResponse } from "next/server";
import { PrismaClient, Gender, Category, Status, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { search, gender, category, status, sortFilter } = body;

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
            // Prisma Query for filtering with sorting
            products = await prisma.product.findMany({
                where: {
                    gender: gender ? (gender as Gender) : undefined,
                    category: category ? (category as Category) : undefined,
                    status: status ? (status as Status) : undefined,
                },
                orderBy: {
                    discountprice: sortFilter === "asc" ? "asc" : sortFilter === "desc" ? "desc" : "desc", // Default to descending
                },
            });
        }

        // Convert Decimal fields to numbers safely
        const formattedProducts = products.map((product) => ({
            ...product,
            stars: Decimal.isDecimal(product.stars) ? product.stars.toNumber() : product.stars,
            discountprice: Decimal.isDecimal(product.discountprice) ? product.discountprice.toNumber() : product.discountprice,
        }));

        return NextResponse.json(formattedProducts, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
