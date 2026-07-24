import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Prisma 7: seed lives here (not only in package.json)
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // CLI uses local SQLite only
    url: process.env.DATABASE_URL ?? "file:./ecommerce.db",
  },
});