import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/shared/sticky-mobile-cta";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pb-16 sm:pb-0">
        {children}
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
