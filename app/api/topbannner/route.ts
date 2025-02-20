import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
  try {
    const banners = await prisma.topBanner.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}
