import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
  try {
    const bottomBanner = await prisma.bottomBanner.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bottomBanner);
  } catch (error) {
    console.error("Error fetching bottom banner:", error);
    return NextResponse.json({ error: "Failed to fetch bottom banner" }, { status: 500 });
  }
}
