import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Cache database availability check to avoid repeated connection attempts
let dbAvailabilityCache: { available: boolean; lastChecked: number } | null =
  null;
const DB_CHECK_CACHE_DURATION = 30000; // 30 seconds

// Clear the database availability cache (useful for testing or manual refresh)
export const clearDatabaseAvailabilityCache = (): void => {
  dbAvailabilityCache = null;
};

// Check if DATABASE_URL is available and database is reachable
export const isDatabaseAvailable = async (): Promise<boolean> => {
  // First check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    return false;
  }

  // Check cache first
  const now = Date.now();
  if (
    dbAvailabilityCache &&
    now - dbAvailabilityCache.lastChecked < DB_CHECK_CACHE_DURATION
  ) {
    return dbAvailabilityCache.available;
  }

  try {
    // Attempt to connect and perform a simple query
    // Use a temporary PrismaClient instance for the availability check
    const tempPrisma = new PrismaClient();
    await tempPrisma.$queryRaw`SELECT 1`;
    await tempPrisma.$disconnect();

    // Cache successful result
    dbAvailabilityCache = { available: true, lastChecked: now };
    return true;
  } catch (error) {
    console.error(
      "Database connectivity check failed:",
      error instanceof Error ? error.message : JSON.stringify(error)
    );

    // Cache failed result for a shorter duration to allow retries
    dbAvailabilityCache = {
      available: false,
      lastChecked: now - (DB_CHECK_CACHE_DURATION - 5000),
    };
    return false;
  }
};

// Safe database operation wrapper
export const safeDbOperation = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<{ data: T; error: string | null }> => {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    const errorMessage = !process.env.DATABASE_URL
      ? "Database connection not configured. Please set DATABASE_URL environment variable."
      : "Database is not reachable. Please check your database connection and ensure the database server is running.";

    return {
      data: fallback,
      error: errorMessage,
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
