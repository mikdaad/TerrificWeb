import { PrismaClient } from "@prisma/client";
import { currentUser } from "./extensions/current-user";

// Define a global type for Prisma in the Node.js environment
const globalForPrisma = global as unknown as { prisma?: ReturnType<typeof client.$extends> };

// Initialize Prisma with the `currentUser` extension
const client = new PrismaClient().$extends(currentUser());

export const db = globalForPrisma.prisma ?? client;

// Prevent multiple Prisma instances in development (hot reload issue)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
