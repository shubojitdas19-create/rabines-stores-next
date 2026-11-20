import type { Metadata } from "next";
import { FeaturedCategories } from "@/components/rabines/featured-categories";
import { MainFooter } from "@/components/rabines/main-footer";
import { MachiningHero } from "@/components/rabines/machining-hero";
import { PreFooterCTA } from "@/components/rabines/pre-footer-cta";
import { ReviewsSection } from "@/components/rabines/reviews-section";
import { SiteHeader } from "@/components/rabines/site-header";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Rabines Stores | Precision CNC Tool Holders, Carbide Inserts & Machining",
  description:
    "India's dedicated source for CNC tool holders, carbide turning & milling inserts, solid carbide end mills, and precision machining services. High rigidity, tested tolerances, fast nationwide delivery.",
  alternates: {
    canonical: "https://rabines-stores.in",
  },
  openGraph: {
    title: "Rabines Stores | Precision CNC Tool Holders, Carbide Inserts & Machining",
    description:
      "Buy CNC tool holders, carbide inserts, and end mills online or request precision machining quotes directly from Rabines Stores Howrah.",
    url: "https://rabines-stores.in",
    images: ["/images/cnc-machining-hero.png"],
  },
};

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }]} />
      <SiteHeader />
      <main>
        <MachiningHero />
        <FeaturedCategories />
        <ReviewsSection />
        <PreFooterCTA />
      </main>
      <MainFooter />
    </>
  );
}
