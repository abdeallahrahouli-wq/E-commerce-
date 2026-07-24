import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

/**
 * - If TURSO_DATABASE_URL + TURSO_AUTH_TOKEN exist → Turso
 * - Else → local SQLite from DATABASE_URL
 * Never hardcode secrets.
 */
function createAdapter() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl && tursoToken) {
    return new PrismaLibSql({
      url: tursoUrl,
      authToken: tursoToken,
    });
  }

  const databaseUrl = process.env.DATABASE_URL ?? "file:./ecommerce.db";

  if (!databaseUrl.startsWith("file:")) {
    throw new Error(
      "Set DATABASE_URL to file:./ecommerce.db or set both TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.",
    );
  }

  return new PrismaLibSql({ url: databaseUrl });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: createAdapter(),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}