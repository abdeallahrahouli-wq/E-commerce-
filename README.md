# NovaTech E-Commerce

Premium portfolio e-commerce storefront + admin dashboard.

> Learning / portfolio project. Built to look commercially credible while staying free to run on localhost.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS v4, shadcn/ui, Lucide
- **Animation:** Framer Motion
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Database:** Prisma 7 + SQLite (local)
- **Auth:** NextAuth.js (Auth.js v5)

## Features (in progress)

- Customer storefront
- Product catalog
- Cart (Zustand)
- Auth + protected routes
- Admin area (`/admin`) with role checks

## Requirements

- Node.js 18+ (recommended 20+)
- npm

## Setup

1. **Install**

```bash
npm install
```

2. **Environment**

```bash
cp .env.example .env
```

Edit `.env`:

- `DATABASE_URL="file:./ecommerce.db"` for local dev
- set a long random `AUTH_SECRET`

3. **Database**

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

(`db:seed` only if `prisma/seed.ts` exists.)

4. **Run**

```bash
npm run dev
```

- Store: http://localhost:3000
- Admin: http://localhost:3000/admin

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Development server       |
| `npm run build`     | Production build         |
| `npm run start`     | Start production server  |
| `npm run lint`      | ESLint                   |
| `npm run db:push`   | Push Prisma schema to DB |
| `npm run db:seed`   | Seed database            |
| `npm run db:studio` | Open Prisma Studio       |

## Project structure (high level)

```text
app/            # Next.js App Router pages
components/     # UI components
features/       # Feature modules
lib/            # Shared libraries (db, auth, utils)
prisma/         # Schema, migrations, seed
hooks/ types/ utils/ styles/
```

## Security notes

- Never commit `.env`
- Never put database tokens or secrets in source files
- Use `.env.example` as the only shared template

## License

Proprietary — all rights reserved. Portfolio use.
