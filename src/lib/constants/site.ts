export const SITE = {
  name: "The Xonca",
  tagline: "Əl ilə hazırlanan premium xonça və tumba kolleksiyaları.",
  description:
    "The Xonca — toy və mərasimlər üçün premium xonça kolleksiyaları, xonça standları (tumba) və çatdırılma xidməti təqdim edən lüks rezervasiya atelyesidir.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  email: "atelier@thexonca.com",
  phone: "+994 50 555 01 88",
  whatsapp: "994505550188",
  address: {
    line1: "Nizami küçəsi 48",
    city: "Bakı",
    region: "AZ",
    postal: "1000",
    country: "Azərbaycan",
  },
  social: {
    instagram: "https://instagram.com/thexonca",
    pinterest: "https://pinterest.com/thexonca",
    facebook: "https://facebook.com/thexonca",
  },
  workingHours: {
    weekdays: "B.e – Cümə: 10:00 – 19:00",
    weekend: "Şənbə: 10:00 – 17:00",
    sunday: "Bazar: qeydiyyatla",
  },
  delivery: {
    enabled: true,
    defaultPrice: 150,
    currency: "AZN",
  },
} as const;

export const NAV_LINKS = [
  { label: "Ana səhifə", href: "/" },
  { label: "Kolleksiyalar", href: "/collections" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Kataloq", href: "/catalog" },
  { label: "Əlaqə", href: "/contact" },
  { label: "Rezervasiya", href: "/booking" },
] as const;

export const FOOTER_LINKS = {
  atelier: [
    { label: "Haqqımızda", href: "/about" },
    { label: "Kolleksiyalar", href: "/collections" },
    { label: "Kataloq", href: "/catalog" },
    { label: "Proses", href: "/#process" },
  ],
  experiences: [
    { label: "Rezervasiya", href: "/booking" },
    { label: "Çatdırılma", href: "/contact#delivery" },
    { label: "Tumba / Stand", href: "/collections" },
    { label: "FAQ", href: "/contact#faq" },
  ],
  atelierHouse: [
    { label: "Əlaqə", href: "/contact" },
    { label: "Instagram", href: "https://instagram.com/thexonca" },
    { label: "WhatsApp", href: `https://wa.me/994505550188` },
    { label: "Məxfilik", href: "/privacy" },
  ],
} as const;
