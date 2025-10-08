import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Check if DATABASE_URL is available
export const isDatabaseAvailable = () => {
  return !!process.env.DATABASE_URL;
};

// Safe database operation wrapper
export const safeDbOperation = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<{ data: T; error: string | null }> => {
  if (!isDatabaseAvailable()) {
    return {
      data: fallback,
      error:
        "Database connection not configured. Please set DATABASE_URL environment variable.",
    };
  }

  try {
    const data = await operation();
    return { data, error: null };
  } catch (error) {
    console.error("Database operation failed:", error);
    return {
      data: fallback,
      error: error instanceof Error ? error.message : "Unknown database error",
    };
  }
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
