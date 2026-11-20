import type { Metadata } from "next";
import { MainFooter } from "@/components/rabines/main-footer";
import { CadCapabilities } from "@/components/rabines/services/cad-capabilities";
import { MachinerySection, ProgrammingSection, TurnaroundSection } from "@/components/rabines/services/service-detail-sections";
import { ServiceOverview } from "@/components/rabines/services/service-overview";
import { ServicesHero } from "@/components/rabines/services/services-hero";
import { ServicesQuoteForm } from "@/components/rabines/services/services-quote-form";
import { SiteHeader } from "@/components/rabines/site-header";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Precision CNC Machining, Programming & Engineering CAD Services",
  description:
    "End-to-end CNC engineering solutions: precision lathe turning, 3 & 4-axis VMC milling job work, Fanuc/Siemens G-code programming, and 2D/3D manufacturing drawings. Request an RFQ quote from Howrah, India.",
  keywords: [
    "CNC machining services India",
    "precision CNC turning Howrah",
    "VMC milling job work Kolkata",
    "CNC programming solutions",
    "G-code toolpath optimization",
    "Fanuc programming services",
    "Siemens CNC support",
    "2D 3D CAD CAM drawing",
    "engineering drawing to prototype",
    "custom precision components manufacturing",
  ],
  alternates: {
    canonical: "https://rabinesstores.in/services",
  },
  openGraph: {
    title: "Precision CNC Machining, Programming & CAD Services | Rabines Stores",
    description:
      "Explore high-precision CNC turning, VMC milling, G-code toolpath optimization, and manufacturing drawings from Rabines Stores. Fast turnaround & tight tolerances.",
    url: "https://rabinesstores.in/services",
    images: ["/images/categories/cnc-services.png"],
  },
};

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Engineering Services", url: "/services" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd />
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
