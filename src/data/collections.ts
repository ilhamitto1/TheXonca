import type { CatalogItem, Collection } from "@/types";
import { SITE } from "@/lib/constants/site";

const sharedFaq = [
  {
    q: "Minimum neçə xonça sifariş edə bilərəm?",
    a: "Hər kolleksiya üçün minimum 1 xonça rezerv edilə bilər. Maksimum say kolleksiyaya görə dəyişir.",
  },
  {
    q: "Tumba (stand) mütləqdirmi?",
    a: "Bəzi kolleksiyalarda tumba daxildir, digərlərində isə əlavə seçim kimi mövcuddur.",
  },
  {
    q: "Çatdırılma necə işləyir?",
    a: `Çatdırılma seçildikdə standart haqq ${SITE.delivery.defaultPrice} AZN-dir. Admin bu məbləği dəyişə bilər.`,
  },
  {
    q: "Ödəniş onlayn edilir?",
    a: "Xeyr. Rezervasiya WhatsApp vasitəsilə təsdiqlənir və ödəniş şərtləri atelye ilə razılaşdırılır.",
  },
];

export const collections: Collection[] = [
  {
    id: "col-1",
    slug: "imperial-gold",
    name: "Imperial Gold",
    shortDescription: "Qızıl aksentli, əl işi premium xonça kolleksiyası.",
    description:
      "Imperial Gold — mərasimin mərkəzinə çevrilən lüks xonça kompozisiyasıdır. Premium materiallar, zərif lentlər və seçilmiş hədiyyələrlə əl ilə hazırlanır.",
    category: "Premium",
    occasion: "Toy",
    price: 450,
    discountPrice: null,
    premium: true,
    status: "AVAILABLE",
    availabilityLabel: "Mövcuddur",
    includedGifts: ["Şokolad dəsti", "Ətirli şam", "Mini suvenir"],
    decorationDetails: [
      "Qızıl folqa detallar",
      "İpək lent bəzəyi",
      "Kristal aksentlər",
    ],
    flowers: ["Stabilize qızılgül", "Eukalipt"],
    ribbonType: "İpək qızıl lent",
    premiumMaterials: ["Məxmər", "Qızıl aksent", "Kristal"],
    colorTheme: "Qızıl & Krem",
    xoncaIncluded: true,
    tumbaIncluded: false,
    tumbaOptional: true,
    tumbaPrice: 120,
    deliveryAvailable: true,
    deliveryPrice: null,
    preparationTime: "2–3 gün",
    dimensions: "Xonça: 35×25 sm · Tumba: 80×40 sm",
    reservationInfo:
      "Seçilmiş tarix üçün rezervasiya WhatsApp təsdiqi ilə tamamlanır.",
    deliveryInfo:
      "Bakı daxilində çatdırılma mövcuddur. Standart çatdırılma haqqı tətbiq olunur.",
    maxQuantity: 20,
    images: [],
    videos: [],
    seoTitle: "Imperial Gold Xonça Kolleksiyası",
    seoDescription: "Premium qızıl aksentli xonça və opsional tumba.",
    faq: sharedFaq,
    unavailableDates: [],
  },
  {
    id: "col-2",
    slug: "ivory-silk",
    name: "Ivory Silk",
    shortDescription: "Fil dişi ipək və yumşaq krem tonlarında zərif xonça.",
    description:
      "Ivory Silk kolleksiyası sakit lüks axtaran mərasimlər üçündür. Yumşaq teksturalar, təmiz kompozisiya və seçilmiş hədiyyə dəsti ilə təqdim olunur.",
    category: "Klassik",
    occasion: "Nişan",
    price: 380,
    discountPrice: 340,
    premium: true,
    status: "AVAILABLE",
    availabilityLabel: "Mövcuddur",
    includedGifts: ["Deluxe şokolad", "Kart dəsti"],
    decorationDetails: ["İpək örtük", "Mirvari aksent", "Minimal çiçək düzümü"],
    flowers: ["Ağ ranunkulus", "Baby’s breath"],
    ribbonType: "Fil dişi saten",
    premiumMaterials: ["Saten", "Mirvari", "Pambıq ipək"],
    colorTheme: "Fil Dişi & Ağ",
    xoncaIncluded: true,
    tumbaIncluded: true,
    tumbaOptional: false,
    tumbaPrice: 0,
    deliveryAvailable: true,
    deliveryPrice: null,
    preparationTime: "2 gün",
    dimensions: "Xonça: 32×22 sm · Tumba daxildir",
    reservationInfo: "Tumba bu kolleksiyaya daxildir və ayrıca seçilmir.",
    deliveryInfo: "Çatdırılma seçimi rezervasiya axınında aktivləşir.",
    maxQuantity: 15,
    images: [],
    videos: [],
    faq: sharedFaq,
    unavailableDates: [],
  },
  {
    id: "col-3",
    slug: "midnight-velvet",
    name: "Midnight Velvet",
    shortDescription: "Tünd məxmər və şampan işıltısı ilə dramatik kolleksiya.",
    description:
      "Midnight Velvet axşam mərasimləri üçün yaradılıb. Dərin tonlar, məxmər tekstura və premium bəzək detalları ilə diqqət mərkəzindədir.",
    category: "Exclusive",
    occasion: "Toy",
    price: 520,
    discountPrice: null,
    premium: true,
    status: "LIMITED",
    availabilityLabel: "Məhdud sayda",
    includedGifts: ["Premium şokolad", "Mini parfüm", "Xüsusi kart"],
    decorationDetails: ["Məxmər baza", "Şampan metal", "Tünd çiçək aksenti"],
    flowers: ["Bordo qızılgül", "Qara eukalipt"],
    ribbonType: "Şampan organza",
    premiumMaterials: ["Məxmər", "Metal", "Organza"],
    colorTheme: "Gece & Şampan",
    xoncaIncluded: true,
    tumbaIncluded: false,
    tumbaOptional: true,
    tumbaPrice: 150,
    deliveryAvailable: true,
    deliveryPrice: null,
    preparationTime: "3–4 gün",
    dimensions: "Xonça: 38×28 sm · Tumba opsional",
    reservationInfo: "Məhdud mövcudluq — erkən rezervasiya tövsiyə olunur.",
    deliveryInfo: "Çatdırılma Bakı üzrə planlaşdırılır.",
    maxQuantity: 10,
    images: [],
    videos: [],
    faq: sharedFaq,
    unavailableDates: [],
  },
  {
    id: "col-4",
    slug: "rose-atelier",
    name: "Rose Atelier",
    shortDescription: "Yumşaq qızılgül tonlarında romantik xonça dünyası.",
    description:
      "Rose Atelier romantik nişan və toy masaları üçün nəzərdə tutulub. Çiçək kompozisiyası və zərif hədiyyə seçimi ilə tamamlanır.",
    category: "Romantik",
    occasion: "Nişan",
    price: 410,
    discountPrice: null,
    premium: false,
    status: "AVAILABLE",
    availabilityLabel: "Mövcuddur",
    includedGifts: ["Qızılgül şokolad", "Ətirli sabun"],
    decorationDetails: ["Çəhrayı lent", "Çiçək çələngi", "Şüşə aksent"],
    flowers: ["Pink spray rose", "Pion tip çiçək"],
    ribbonType: "Çəhrayı saten",
    premiumMaterials: ["Saten", "Şüşə", "Kağız dekor"],
    colorTheme: "Rose & Cream",
    xoncaIncluded: true,
    tumbaIncluded: false,
    tumbaOptional: true,
    tumbaPrice: 110,
    deliveryAvailable: true,
    deliveryPrice: null,
    preparationTime: "2–3 gün",
    dimensions: "Xonça: 34×24 sm",
    reservationInfo: "Tarix seçimi rezervasiya kalendarında aparılır.",
    deliveryInfo: "Ünvan rezervasiya formasında qeyd olunur.",
    maxQuantity: 18,
    images: [],
    videos: [],
    faq: sharedFaq,
    unavailableDates: [],
  },
  {
    id: "col-5",
    slug: "pearl-noir",
    name: "Pearl Noir",
    shortDescription: "Qara-mirvari kontrastı ilə ultra premium kolleksiya.",
    description:
      "Pearl Noir — eksklüziv mərasimlər üçün limitli seriyadır. Kontrast estetika, premium materiallar və yüksək hazırlıq keyfiyyəti ilə seçilir.",
    category: "Exclusive",
    occasion: "Vip mərasim",
    price: 680,
    discountPrice: null,
    premium: true,
    status: "AVAILABLE",
    availabilityLabel: "Mövcuddur",
    includedGifts: ["Vip şokolad seleksiyası", "Branded qutu", "Xüsusi nota"],
    decorationDetails: ["Mirvari naxış", "Qara məxmər", "Metal frame"],
    flowers: ["Ağ orxideya", "Stabilize yarpaq"],
    ribbonType: "Qara ipək",
    premiumMaterials: ["Məxmər", "Mirvari", "Metal"],
    colorTheme: "Noir & Pearl",
    xoncaIncluded: true,
    tumbaIncluded: true,
    tumbaOptional: false,
    tumbaPrice: 0,
    deliveryAvailable: true,
    deliveryPrice: null,
    preparationTime: "4–5 gün",
    dimensions: "Xonça: 40×30 sm · Tumba daxildir",
    reservationInfo: "Vip seriya — mövcud tarixlər məhdud ola bilər.",
    deliveryInfo: "Prioritet çatdırılma planı təklif olunur.",
    maxQuantity: 8,
    images: [],
    videos: [],
    faq: sharedFaq,
    unavailableDates: [],
  },
  {
    id: "col-6",
    slug: "garden-light",
    name: "Garden Light",
    shortDescription: "Yaz bağçası ruhunda yüngül və işıqlı xonça.",
    description:
      "Garden Light gündüz mərasimləri və bağ konseptləri üçün idealdır. Təbii tonlar, yumşaq çiçəklər və rahat hazırlıq müddəti.",
    category: "Klassik",
    occasion: "Toy / Nişan",
    price: 320,
    discountPrice: 295,
    premium: false,
    status: "AVAILABLE",
    availabilityLabel: "Mövcuddur",
    includedGifts: ["Mini desert", "Təbii sabun"],
    decorationDetails: ["Yaşıl aksent", "Kətan lent", "Təbii çiçək"],
    flowers: ["Papatya tip", "Yaşıl göyərti"],
    ribbonType: "Kətan",
    premiumMaterials: ["Kətan", "Kağız", "Təbii çiçək"],
    colorTheme: "Yaşıl & Krem",
    xoncaIncluded: true,
    tumbaIncluded: false,
    tumbaOptional: true,
    tumbaPrice: 95,
    deliveryAvailable: true,
    deliveryPrice: null,
    preparationTime: "1–2 gün",
    dimensions: "Xonça: 30×20 sm",
    reservationInfo: "Eyni günə yaxın tarixlər üçün əvvəlcədən yazın.",
    deliveryInfo: "Çatdırılma seçimi rezervasiya zamanı təsdiqlənir.",
    maxQuantity: 25,
    images: [],
    videos: [],
    faq: sharedFaq,
    unavailableDates: [],
  },
];

export const catalogItems: CatalogItem[] = [
  {
    id: "cat-1",
    title: "The Xonca — Premium Kataloq 2026",
    category: "Premium",
    description: "İlin əsas xonça və tumba kolleksiyalarının rəqəmsal kataloqu.",
    type: "pdf",
    year: "2026",
    pages: 24,
  },
  {
    id: "cat-2",
    title: "Exclusive Seriya Broşürü",
    category: "Exclusive",
    description: "Pearl Noir və Midnight Velvet üçün xüsusi broşür.",
    type: "brochure",
    year: "2026",
    pages: 8,
  },
  {
    id: "cat-3",
    title: "Klassik Kolleksiyalar",
    category: "Klassik",
    description: "Ivory Silk və Garden Light qrupu üçün kataloq.",
    type: "pdf",
    year: "2025",
    pages: 16,
  },
  {
    id: "cat-4",
    title: "Romantik Seçimlər",
    category: "Romantik",
    description: "Nişan və romantik mərasimlər üçün seçilmiş modellər.",
    type: "brochure",
    year: "2026",
    pages: 10,
  },
];

export const collectionCategories = [
  "Hamısı",
  ...Array.from(new Set(collections.map((c) => c.category))),
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getRelatedCollections(slug: string, limit = 3) {
  const current = getCollectionBySlug(slug);
  if (!current) return collections.slice(0, limit);
  return collections
    .filter((c) => c.slug !== slug && c.category === current.category)
    .concat(collections.filter((c) => c.slug !== slug))
    .filter(
      (c, i, arr) => arr.findIndex((x) => x.id === c.id) === i && c.slug !== slug,
    )
    .slice(0, limit);
}

export const homeContent = {
  preloader: {
    brand: "The Xonca",
    phrase: "Premium xonça atmosferləri",
  },
  hero: {
    eyebrow: "Xonça & Tumba Atelyesi",
    title: "Əl ilə hazırlanan premium xonça kolleksiyaları",
    subtitle:
      "Hər kolleksiya eksklüzivdir — xonça, tumba və çatdırılma ilə mərasiminizə lüks toxunuş gətiririk.",
    primaryCta: { label: "Kolleksiyaları kəşf et", href: "/collections" },
    secondaryCta: { label: "Rezervasiya et", href: "/booking" },
    scrollHint: "Kolleksiyaları açmaq üçün sürüşdürün",
  },
  story: {
    eyebrow: "Atelye",
    title: "Xonça sənətini lüksə çeviririk",
    body: "The Xonca sadəcə bəzək deyil. Biz premium xonça kolleksiyaları və stand (tumba) sistemləri ilə mərasiminizin mərkəzi kompozisiyasını yaradırıq — hər detal əl ilə, hər rezervasiya diqqətlə.",
    stats: [
      { value: "120+", label: "Hazırlanmış xonça" },
      { value: "6", label: "Premium kolleksiya" },
      { value: "48s", label: "Orta hazırlıq" },
    ],
  },
  process: [
    { step: "01", title: "Seç", detail: "Kolleksiyanızı kəşf edin." },
    { step: "02", title: "Tarix", detail: "Uyğun günü rezerv edin." },
    { step: "03", title: "Detal", detail: "Xonça, tumba, çatdırılma." },
    { step: "04", title: "WhatsApp", detail: "Bir kliklə təsdiqləyin." },
  ],
  whyUs: [
    {
      title: "Əl işi keyfiyyət",
      body: "Hər xonça atelyemizdə diqqətlə yığılır.",
    },
    {
      title: "Tumba opsiyası",
      body: "Stand daxil və ya əlavə seçim kimi mövcuddur.",
    },
    {
      title: "Çatdırılma",
      body: "Bakı üzrə rahat çatdırılma sistemi.",
    },
    {
      title: "WhatsApp rezervasiya",
      body: "Ödənişsiz, sürətli və şəffaf rezerv axını.",
    },
  ],
  testimonials: [
    {
      id: "1",
      quote:
        "Imperial Gold stolda o qədər premium görünürdü ki, qonaqlar bütün axşam danışırdı.",
      name: "Aysel & Rauf",
      event: "Toy mərasimi, Bakı",
    },
    {
      id: "2",
      quote:
        "Tumba ilə birlikdə kompozisiya mükəmməl oldu. Rezervasiya prosesi də çox rahat idi.",
      name: "Nigar M.",
      event: "Nişan, Port Baku",
    },
    {
      id: "3",
      quote:
        "Kataloqdan seçib WhatsApp ilə rezerv etdik — hər şey dəqiq və lüks idi.",
      name: "Elvin & Sara",
      event: "Vip mərasim",
    },
  ],
  cta: {
    title: "Kolleksiyanızı rezerv etməyə hazırsınız?",
    body: "Tarixi seçin, xonça və tumba sayını müəyyən edin — WhatsApp ilə dərhal göndərin.",
    button: { label: "Rezervasiyaya başla", href: "/booking" },
  },
} as const;

/** Demo unavailable dates for calendar (next few weekends blocked sample) */
export function getDemoUnavailableDates(): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = 3; i < 45; i += 7) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}
