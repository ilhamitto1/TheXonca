export type NavLink = {
  label: string;
  href: string;
};

export type BookingPayload = {
  date: string;
  packageId: string;
  themeId: string;
  flowers: string[];
  guestCount: number;
  budget: number;
  location: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: "tall" | "wide" | "square";
};

export type CmsSectionKey =
  | "hero"
  | "story"
  | "featuredEvents"
  | "gallery"
  | "themes"
  | "services"
  | "timeline"
  | "process"
  | "testimonials"
  | "instagram"
  | "cta";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER" | "CLIENT";
