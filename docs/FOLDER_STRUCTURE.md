# The Xonca — Complete Folder Architecture

```
TheXonca/
├── docs/
│   ├── ARCHITECTURE.md
│   └── FOLDER_STRUCTURE.md
├── prisma/
│   └── schema.prisma
├── public/
│   ├── icons/
│   ├── images/
│   ├── videos/
│   ├── fonts/
│   ├── textures/
│   └── manifest.webmanifest
├── src/
│   ├── app/
│   │   ├── (site)/                 # Public site
│   │   │   ├── page.tsx            # Home (all cinematic sections)
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── gallery/
│   │   │   ├── products/[slug]/
│   │   │   ├── blog/[slug]/
│   │   │   ├── booking/
│   │   │   └── contact/
│   │   ├── (auth)/login/
│   │   ├── admin/                  # Enterprise dashboard modules
│   │   ├── api/                    # Auth, bookings, contact, uploadthing...
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── actions/                    # Server Actions
│   ├── components/
│   │   ├── admin/
│   │   ├── animations/
│   │   ├── booking/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── cursor/
│   │   ├── gallery/
│   │   ├── hero/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── preloader/
│   │   ├── products/
│   │   ├── providers/
│   │   ├── services/
│   │   ├── shared/
│   │   ├── three/
│   │   └── ui/
│   ├── data/                       # CMS-ready demo content
│   ├── emails/
│   ├── hooks/
│   ├── lib/                        # auth, db, stripe, cloudinary, cms...
│   ├── stores/
│   ├── styles/tokens.css
│   └── types/
├── .env.example
├── next.config.ts
├── package.json
├── README.md
└── vercel.json
```
