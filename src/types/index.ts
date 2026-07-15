export type NavLink = {
  label: string;
  href: string;
};

export type CollectionStatus = "AVAILABLE" | "LIMITED" | "RESERVED" | "ARCHIVED";

export type Collection = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  occasion: string;
  price: number;
  discountPrice?: number | null;
  premium: boolean;
  status: CollectionStatus;
  availabilityLabel: string;
  includedGifts: string[];
  decorationDetails: string[];
  flowers: string[];
  ribbonType: string;
  premiumMaterials: string[];
  colorTheme: string;
  xoncaIncluded: boolean;
  tumbaIncluded: boolean;
  tumbaOptional: boolean;
  tumbaPrice: number;
  deliveryAvailable: boolean;
  deliveryPrice?: number | null;
  preparationTime: string;
  dimensions: string;
  reservationInfo: string;
  deliveryInfo: string;
  maxQuantity: number;
  images: string[];
  videos: string[];
  seoTitle?: string;
  seoDescription?: string;
  faq: { q: string; a: string }[];
  unavailableDates: string[];
};

export type ReservationPayload = {
  collectionId: string;
  collectionSlug: string;
  collectionName: string;
  date: string;
  xoncaQuantity: number;
  needTumba: boolean;
  tumbaQuantity: number;
  needDelivery: boolean;
  deliveryFee: number;
  name: string;
  surname: string;
  phone: string;
  email?: string;
  restaurantName: string;
  deliveryAddress: string;
  notes?: string;
  unitPrice: number;
  tumbaUnitPrice: number;
  subtotal: number;
  total: number;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type CatalogItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  type: "pdf" | "brochure";
  fileUrl?: string;
  pages?: number;
  year: string;
};

export type CmsSectionKey =
  | "hero"
  | "story"
  | "collections"
  | "process"
  | "whyUs"
  | "testimonials"
  | "instagram"
  | "cta";

export type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER" | "CLIENT";
