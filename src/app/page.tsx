import { FeaturedCategories } from "@/components/rabines/featured-categories";
import { MainFooter } from "@/components/rabines/main-footer";
import { MachiningHero } from "@/components/rabines/machining-hero";
import { PreFooterCTA } from "@/components/rabines/pre-footer-cta";
import { SiteHeader } from "@/components/rabines/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <MachiningHero />
        <FeaturedCategories />
        <PreFooterCTA />
      </main>
      <MainFooter />
    </>
  );
}
