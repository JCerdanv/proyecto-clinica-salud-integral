// prisma.config.ts
import "dotenv/config"
import { defineConfig, env } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    //seed: "tsx src/config/seed.ts" // <-- ¡Ahora va aquí adentro!
    seed: "node --import tsx src/config/seed.ts"
  },
  datasource: {
    url: env("DATABASE_URL")
  }
})

// fin - prisma.config.ts