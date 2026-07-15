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
      <main
        id="main-content"
        className="min-h-screen pb-[calc(4.25rem+env(safe-area-inset-bottom))] xl:pb-0"
      >
        {children}
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
