import { FeaturedCategories } from "@/components/rabines/featured-categories";
import { MachiningHero } from "@/components/rabines/machining-hero";
import { SiteHeader } from "@/components/rabines/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <MachiningHero />
        <FeaturedCategories />
      </main>
    </>
  );
}
