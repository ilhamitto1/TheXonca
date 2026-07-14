# The Xonca

Awwwards səviyyəli premium toy dekorasiyası və tədbir dizayn platforması.

**Dil:** Azərbaycan dili (`lang="az"`)

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Motion · GSAP · Lenis · Three.js / R3F · Prisma · PostgreSQL · NextAuth · UploadThing · Cloudinary · Resend · Stripe-ready

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin

- URL: `/admin` (or `/login`)
- Default local credentials (from `.env.local`):
  - `admin@thexonca.com`
  - `xonca-admin-2026`

### Database

```bash
# set DATABASE_URL in .env.local
npm run db:generate
npm run db:push
```

## Architecture

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Turbopack dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to Postgres |

## Deploy

Optimized for Vercel. Set env vars from `.env.example`, attach a Postgres database, then deploy.
