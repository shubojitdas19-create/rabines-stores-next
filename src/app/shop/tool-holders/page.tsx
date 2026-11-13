import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Info } from "lucide-react";
import { MainFooter } from "@/components/rabines/main-footer";
import { sampleProducts } from "@/components/rabines/shop/catalog-data";
import { PreFooterCTA } from "@/components/rabines/pre-footer-cta";
import { SiteHeader } from "@/components/rabines/site-header";
import { ToolHolderCatalog } from "@/components/rabines/shop/tool-holder-catalog";

export const metadata: Metadata = {
  title: "CNC Tool Holders | Rabines Stores",
  description: "Browse CNC tool holders and sample product prices from Rabines Stores.",
};

export default function ToolHoldersPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="bg-[#f3f4f2] text-[#171d21]">
        <section aria-labelledby="category-title" className="border-b border-[#e0e3e2]">
          <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-1.5 text-xs text-[#7a8286] sm:gap-2">
                <li><Link href="/#top" className="transition-colors hover:text-[#171d21]">Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="size-3" /></li>
                <li><Link href="/#products" className="transition-colors hover:text-[#171d21]">Shop</Link></li>
                <li aria-hidden="true"><ChevronRight className="size-3" /></li>
                <li aria-current="page" className="font-medium text-[#343c40]">Tool holders</li>
              </ol>
            </nav>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-[#7a8286]">Browse the Rabines selection</p>
                <h1 id="category-title" className="mt-1.5 text-3xl font-semibold tracking-[-0.04em] text-[#171d21] sm:text-4xl">CNC tool holders</h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#687176]">
                  Find products by type, compare prices, and open an item to learn more.
                </p>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-2 text-xs text-[#626b70]">
                {sampleProducts.length} sample products
              </span>
            </div>

            <p role="note" className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#765840] sm:items-center">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary sm:mt-0" />
              Product makes, prices, and availability are sample information and should be confirmed before ordering.
            </p>
          </div>
        </section>

        <ToolHolderCatalog />
        <PreFooterCTA />
      </main>
      <MainFooter />
    </>
  );
}
