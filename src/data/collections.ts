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
    id: "col-elizabeth",
    slug: "elizabeth",
    name: "Elizabeth",
    shortDescription:
      "Zərif krem-qızıl tonlarda classic royal xonça — sakit lüks və təmiz kompozisiya.",
    description:
      "Elizabeth kolleksiyası classic royal ruhunda hazırlanmış premium xonça seriyasıdır. Yumşaq krem tonlar, qızıl aksentlər və əl işi detallarla mərasimin mərkəzinə çevrilir. Nişan və toy masaları üçün xüsusi seçilmiş hədiyyə dəsti və zərif çiçək düzümü ilə tamamlanır.",
    category: "Premium",
    occasion: "Toy / Nişan",
    price: 450,
    discountPrice: null,
    premium: true,
    status: "AVAILABLE",
    availabilityLabel: "Mövcuddur",
    includedGifts: ["Deluxe şokolad dəsti", "Ətirli şam", "Mini suvenir", "Xüsusi kart"],
    decorationDetails: [
      "Krem-qızıl folqa detallar",
      "İpək lent bəzəyi",
      "Zərif mirvari aksentlər",
      "Classic royal kompozisiya",
    ],
    flowers: ["Stabilize qızılgül", "Eukalipt", "Baby’s breath"],
    ribbonType: "İpək krem-qızıl lent",
    premiumMaterials: ["Məxmər", "İpək", "Qızıl aksent", "Mirvari"],
    colorTheme: "Krem & Qızıl",
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
    images: ["/collections/elizabeth/01.jpg"],
    videos: [],
    seoTitle: "Elizabeth Xonça Kolleksiyası | The Xonca",
    seoDescription:
      "Elizabeth — krem-qızıl tonlarda classic royal premium xonça kolleksiyası. Real atelye foto.",
    faq: sharedFaq,
    unavailableDates: [],
  },
  {
    id: "col-sahzade",
    slug: "sahzade",
    name: "Şahzadə",
    shortDescription:
      "Dramatik və eksklüziv şahzadə estetikası — foto + video ilə tam təqdimat.",
    description:
      "Şahzadə kolleksiyası mərasiminə padşahca toxunuş istəyənlər üçündür. Dərin tonlar, zəngin teksturalar və diqqətlə seçilmiş bəzək detalları ilə diqqət mərkəzindədir. Portfeldə real atelye fotoları və video çəkilişlər mövcuddur — kompozisiyanı hər bucaqdan görə bilərsiniz.",
    category: "Exclusive",
    occasion: "Toy / Vip mərasim",
    price: 580,
    discountPrice: null,
    premium: true,
    status: "AVAILABLE",
    availabilityLabel: "Mövcuddur",
    includedGifts: [
      "Premium şokolad seleksiyası",
      "Mini parfüm",
      "Branded qutu",
      "Xüsusi nota",
    ],
    decorationDetails: [
      "Şahzadə stilində zəngin kompozisiya",
      "Metal və məxmər aksentlər",
      "Dramatik işıq-kölgə balansı",
      "Vip hədiyyə düzümü",
    ],
    flowers: ["Stabilize qızılgül", "Orxideya tip", "Tünd göyərti"],
    ribbonType: "Şampan organza / ipək",
    premiumMaterials: ["Məxmər", "Metal", "Organza", "Kristal aksent"],
    colorTheme: "Şampan & Dərin tonlar",
    xoncaIncluded: true,
    tumbaIncluded: false,
    tumbaOptional: true,
    tumbaPrice: 150,
    deliveryAvailable: true,
    deliveryPrice: null,
    preparationTime: "3–4 gün",
    dimensions: "Xonça: 38×28 sm · Tumba opsional",
    reservationInfo:
      "Eksklüziv seriya — erkən rezervasiya tövsiyə olunur. WhatsApp ilə təsdiqlənir.",
    deliveryInfo: "Çatdırılma Bakı üzrə planlaşdırılır. Prioritet vaxt razılaşdırıla bilər.",
    maxQuantity: 12,
    images: [
      "/collections/sahzade/01.jpg",
      "/collections/sahzade/02.jpg",
      "/collections/sahzade/05.jpg",
      "/collections/sahzade/06.jpg",
    ],
    videos: [
      "/collections/sahzade/03.mp4",
      "/collections/sahzade/04.mp4",
    ],
    seoTitle: "Şahzadə Xonça Kolleksiyası | The Xonca",
    seoDescription:
      "Şahzadə — eksklüziv premium xonça kolleksiyası. Real foto və video portfel.",
    faq: sharedFaq,
    unavailableDates: [],
  },
];

export const catalogItems: CatalogItem[] = [
  {
    id: "cat-1",
    title: "The Xonca — Premium Kataloq 2026",
    category: "Premium",
    description: "Elizabeth və Şahzadə kolleksiyalarının rəqəmsal kataloqu.",
    type: "pdf",
    year: "2026",
    pages: 12,
  },
  {
    id: "cat-2",
    title: "Şahzadə Exclusive Broşürü",
    category: "Exclusive",
    description: "Şahzadə kolleksiyası üçün foto və video təqdimat broşürü.",
    type: "brochure",
    year: "2026",
    pages: 6,
  },
  {
    id: "cat-3",
    title: "Elizabeth Classic Royal",
    category: "Premium",
    description: "Elizabeth krem-qızıl seriyası üçün seçilmiş modellər.",
    type: "pdf",
    year: "2026",
    pages: 8,
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

/** All real media across collections (gallery / story surfaces). */
export function getAllCollectionMedia() {
  return collections.flatMap((c) => [
    ...c.images.map((src) => ({ src, alt: c.name, type: "image" as const, slug: c.slug })),
    ...c.videos.map((src) => ({ src, alt: `${c.name} video`, type: "video" as const, slug: c.slug })),
  ]);
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
    featuredSlug: "elizabeth",
  },
  story: {
    eyebrow: "Atelye",
    title: "Xonça sənətini lüksə çeviririk",
    body: "The Xonca sadəcə bəzək deyil. Biz premium xonça kolleksiyaları və stand (tumba) sistemləri ilə mərasiminizin mərkəzi kompozisiyasını yaradırıq — hər detal əl ilə, hər rezervasiya diqqətlə.",
    stats: [
      { value: "120+", label: "Hazırlanmış xonça" },
      { value: "2", label: "Aktiv kolleksiya" },
      { value: "48s", label: "Orta hazırlıq" },
    ],
    imageSlug: "sahzade",
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
        "Elizabeth stolda o qədər premium görünürdü ki, qonaqlar bütün axşam danışırdı.",
      name: "Aysel & Rauf",
      event: "Toy mərasimi, Bakı",
    },
    {
      id: "2",
      quote:
        "Şahzadə kolleksiyasının videosunu görüb seçdik — realda daha da təsirli oldu.",
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
