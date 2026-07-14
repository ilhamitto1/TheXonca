import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { LuxuryCursor } from "@/components/cursor/luxury-cursor";
import { LuxuryPreloader } from "@/components/preloader/luxury-preloader";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { SITE } from "@/lib/constants/site";
import { Toaster } from "sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Lüks Toy Dekorasiyası və Tədbir Dizaynı`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "lüks toy dekorasiyası",
    "toy floristı",
    "tədbir dizaynı",
    "mərasim memarlığı",
    "The Xonca",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#fbf9f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      suppressHydrationWarning
      className={`${cormorant.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <AppProviders>
          <LuxuryPreloader />
          <ScrollProgress />
          <LuxuryCursor />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "font-body",
            }}
          />
        </AppProviders>
      </body>
    </html>
  );
}
