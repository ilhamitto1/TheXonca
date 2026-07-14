# The Xonca — Architecture

Premium wedding decoration & event design platform.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + Design Tokens + Shadcn-style primitives
- **Motion:** Motion (Framer Motion) + GSAP + Lenis
- **3D:** Three.js + React Three Fiber + Drei
- **Data:** Prisma + PostgreSQL
- **Auth:** NextAuth v5 (Auth.js)
- **Media:** UploadThing + Cloudinary
- **Email:** React Email + Resend
- **Payments:** Stripe (ready)
- **State:** Zustand + TanStack Query

## Folder Map

```
src/
├── app/
│   ├── (site)/          # Public marketing & commerce routes
│   ├── (auth)/          # Login / register
│   ├── admin/           # Enterprise CMS dashboard
│   └── api/             # Route handlers
├── components/
│   ├── ui/              # Atomic design primitives
│   ├── layout/          # Shell, footer, section wrappers
│   ├── navigation/      # Floating nav + cinematic menu
│   ├── hero/            # Immersive hero systems
│   ├── home/            # Homepage sections
│   ├── animations/      # Reusable motion primitives
│   ├── three/           # R3F scenes
│   ├── cursor/          # Custom cursor
│   ├── preloader/       # Luxury intro
│   ├── admin/           # Dashboard widgets
│   └── ...
├── lib/                 # Auth, db, stripe, cms, animations
├── actions/             # Server Actions
├── hooks/               # Client hooks
├── stores/              # Zustand stores
├── types/               # Shared TypeScript types
├── data/                # Seed / demo content
├── emails/              # React Email templates
└── styles/              # Global design tokens
prisma/                  # Schema + migrations
public/                  # Static assets
```

## Principles

1. **CMS-first** — UI reads from editable content models; no hard-coded marketing copy in production paths.
2. **Server Components by default** — Client islands only where interactivity requires it.
3. **Atomic UI** — Primitives in `components/ui`, compositions elsewhere.
4. **Motion as design** — Every section owns intentional entrance + scroll choreography.
5. **Performance** — Dynamic imports for Three/GSAP-heavy islands; optimized images; code splitting.
