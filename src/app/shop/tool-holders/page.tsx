import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Info } from "lucide-react";
import { MainFooter } from "@/components/rabines/main-footer";
import { PreFooterCTA } from "@/components/rabines/pre-footer-cta";
import { SiteHeader } from "@/components/rabines/site-header";
import { ToolHolderCatalog } from "@/components/rabines/shop/tool-holder-catalog";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import { getStoreCategories, getStoreProducts } from "@/lib/api/client";

export const metadata: Metadata = {
  title: "CNC Tool Holders, Carbide Inserts & Cutting Tools Catalog",
  description:
    "Browse industrial CNC tool holders, turning holders, carbide milling inserts (APKT, CNMG, WNMG), ER collet chucks, and solid carbide end mills. Order online with Cash on Delivery or request bulk GST quotes across India.",
  keywords: [
    "CNC tool holders catalog",
    "buy carbide inserts online India",
    "turning tool holders",
    "ER32 collet chuck",
    "solid carbide end mills",
    "CNMG 120408 price",
    "WNMG 080408 inserts",
    "APKT 1604 milling inserts",
    "HSS twist drill 10mm",
    "industrial tooling supplier Howrah",
  ],
  alternates: {
    canonical: "https://rabinesstores.in/shop/tool-holders",
  },
  openGraph: {
    title: "CNC Tool Holders, Carbide Inserts & Cutting Tools | Rabines Stores",
    description:
      "Explore high-rigidity CNC tool holders, turning & milling carbide inserts, and workshop tooling. Fast dispatch and verified tolerances.",
    url: "https://rabinesstores.in/shop/tool-holders",
    images: ["/images/categories/cnc-tool-holders.png"],
  },
};

export default async function ToolHoldersPage() {
  const [products, categories] = await Promise.all([
    getStoreProducts(),
    getStoreCategories(),
  ]);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop/tool-holders" },
    { name: "CNC Tools & Industrial Spares", url: "/shop/tool-holders" },
  ];

  const itemList = products.map((p) => ({
    name: p.name,
    url: `/shop/tool-holders/${p.slug || p.id}`,
    price: p.basePrice,
    image: p.media?.[0]?.url || "/images/categories/cnc-tool-holders.png",
  }));

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ItemListJsonLd items={itemList} name="Rabines Stores - CNC Tooling Catalog" />
      <SiteHeader />
      <main id="top" className="bg-[#f3f4f2] text-[#171d21]">
        <section aria-labelledby="category-title" className="border-b border-[#e0e3e2]">
          <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-1.5 text-xs text-[#7a8286] sm:gap-2">
                <li>
                  <Link href="/#top" className="transition-colors hover:text-[#171d21]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3" />
                </li>
                <li>
                  <Link href="/shop/tool-holders" className="transition-colors hover:text-[#171d21]">
                    Shop
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3" />
                </li>
                <li aria-current="page" className="font-medium text-[#343c40]">
                  Tool Catalog
                </li>
              </ol>
            </nav>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-[#7a8286]">Howrah CNC Tooling Hub</p>
                <h1 id="category-title" className="mt-1.5 text-3xl font-semibold tracking-[-0.04em] text-[#171d21] sm:text-4xl">
                  CNC Tools &amp; Industrial Spares
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#687176]">
                  Find turning holders, milling inserts, collets, and HSS drills. Order directly with Cash on Delivery or request bulk B2B WhatsApp quotes.
                </p>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-2 text-xs font-mono text-[#626b70]">
                {products.length} live products
              </span>
            </div>

            <p role="note" className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#765840] sm:items-center">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#ef6b32] sm:mt-0" />
              Direct supplier pricing with GST invoicing for workshops and manufacturing factories across India.
            </p>
          </div>
        </section>

        <ToolHolderCatalog initialProducts={products} initialCategories={categories} />
        <PreFooterCTA />
      </main>
      <MainFooter />
    </>
  );
}
