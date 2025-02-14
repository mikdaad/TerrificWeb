import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    
    });

   
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userAddress = await prisma.address.findUnique({
      where: { userId: existingUser.id },
    });

    return NextResponse.json({
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      street: userAddress?.street || "",
      city: userAddress?.city || "",
      state: userAddress?.state || "",
      postalCode: userAddress?.postalCode || "",
      phoneno: userAddress?.phoneno || "",
      
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse JSON request body safely
    let formData;
    try {
      formData = await req.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { firstName, lastName, street, city, state, postalCode,phoneno } = formData;

    // Validate user existence
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { address: true }, // Ensure address is fetched
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user with nested address upsert
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: {
        firstName,
        lastName,
        address: {
          upsert: {
            where: { id: existingUser.id }, // Ensure unique address is updated
            create: { street, city, state, postalCode,phoneno,  id: existingUser.id },
            update: { street, city, state, postalCode,phoneno },
          },
        },
      },
      include: { address: true }, // Include updated address in response
    });

    return NextResponse.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
