import type { Metadata } from "next";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";
import { ReviewsSection } from "@/components/rabines/reviews-section";
import { PreFooterCTA } from "@/components/rabines/pre-footer-cta";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Machinist & Workshop Customer Reviews",
  description:
    "Read verified reviews, ratings, and feedback from machinists, CNC programmers, and workshop owners across India using Rabines Precision tool holders and inserts.",
  keywords: [
    "Rabines Stores reviews",
    "Rabines Precision feedback",
    "CNC tool holder reviews India",
    "carbide insert customer ratings",
  ],
  alternates: {
    canonical: "https://rabinesstores.in/reviews",
  },
  openGraph: {
    title: "Customer & Workshop Reviews | Rabines Stores",
    description:
      "Verified feedback from CNC machine shops using Rabines tool holders, inserts, and machining services.",
    url: "https://rabinesstores.in/reviews",
    images: ["/images/cnc-machining-hero.png"],
  },
};

export default function ReviewsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Customer Reviews", url: "/reviews" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <SiteHeader />
      <main className="bg-[#11171c] text-white">
        <ReviewsSection />
        <PreFooterCTA />
      </main>
      <MainFooter />
    </>
  );
}
