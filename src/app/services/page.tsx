import type { Metadata } from "next";
import { MainFooter } from "@/components/rabines/main-footer";
import { CadCapabilities } from "@/components/rabines/services/cad-capabilities";
import { MachinerySection, ProgrammingSection, TurnaroundSection } from "@/components/rabines/services/service-detail-sections";
import { ServiceOverview } from "@/components/rabines/services/service-overview";
import { ServicesHero } from "@/components/rabines/services/services-hero";
import { ServicesQuoteForm } from "@/components/rabines/services/services-quote-form";
import { SiteHeader } from "@/components/rabines/site-header";

export const metadata: Metadata = {
  title: "CNC Machining, Programming & Engineering Drawings | Rabines Stores",
  description: "Explore CNC machining, programming, CAD, and engineering drawing support from Rabines Stores. Share a drawing and project brief to start a quote.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServicesHero />
        <ServiceOverview />
        <MachinerySection />
        <ProgrammingSection />
        <TurnaroundSection />
        <CadCapabilities />
        <ServicesQuoteForm />
      </main>
      <MainFooter />
    </>
  );
}
