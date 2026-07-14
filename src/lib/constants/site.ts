export const SITE = {
  name: "The Xonca",
  tagline: "Əl ilə yaradılan kinematik toy atmosferləri.",
  description:
    "The Xonca — immersiv çiçək memarlığı, couture masa dizaynı və unudulmaz mərasim mühitləri yaradan premium toy dekorasiyası və tədbir dizayn atelyesidir.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  email: "atelier@thexonca.com",
  phone: "+994 12 555 01 88",
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
} as const;

export const NAV_LINKS = [
  { label: "Hekayə", href: "/about" },
  { label: "Xidmətlər", href: "/services" },
  { label: "Qalereya", href: "/gallery" },
  { label: "Kolleksiyalar", href: "/products" },
  { label: "Jurnal", href: "/blog" },
  { label: "Rezervasiya", href: "/booking" },
  { label: "Əlaqə", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  atelier: [
    { label: "Hekayəmiz", href: "/about" },
    { label: "Xidmətlər", href: "/services" },
    { label: "Proses", href: "/#process" },
    { label: "Jurnal", href: "/blog" },
  ],
  experiences: [
    { label: "Qalereya", href: "/gallery" },
    { label: "Kolleksiyalar", href: "/products" },
    { label: "Temalar", href: "/#themes" },
    { label: "Tarix rezerv et", href: "/booking" },
  ],
  atelierHouse: [
    { label: "Əlaqə", href: "/contact" },
    { label: "Instagram", href: "https://instagram.com/thexonca" },
    { label: "Məxfilik", href: "/privacy" },
    { label: "Şərtlər", href: "/terms" },
  ],
} as const;
