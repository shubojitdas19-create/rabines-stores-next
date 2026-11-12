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
  description: "Browse a sample CNC tooling catalog for turning, milling, and drilling applications.",
};

export default function ToolHoldersPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section aria-labelledby="category-title" className="relative isolate overflow-hidden border-b border-white/10 bg-[#11171c] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:44px_44px]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_20%,rgba(239,107,50,0.16),transparent_38%),linear-gradient(105deg,rgba(17,23,28,0.15),rgba(8,13,17,0.75))]" />
          <div className="mx-auto max-w-[1800px] px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">
                <li><Link href="/#top" className="transition-colors hover:text-white">Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="size-3" /></li>
                <li><Link href="/#products" className="transition-colors hover:text-white">Shop</Link></li>
                <li aria-hidden="true"><ChevronRight className="size-3" /></li>
                <li aria-current="page" className="text-primary">Tool Holders</li>
              </ol>
            </nav>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Shop / Precision tooling</p>
                <h1 id="category-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[46px]">CNC Tool Holders</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  Browse sample tooling for turning, milling, and drilling — organized for a faster technical comparison.
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-3 border-l-2 border-primary pl-4 sm:mb-1">
                <span className="font-mono text-2xl font-semibold text-white">{String(sampleProducts.length).padStart(2, "0")}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">Sample items</span>
              </div>
            </div>
          </div>
        </section>

        <div role="note" className="border-b border-[#d9dddf] bg-[#ecefef]">
          <div className="mx-auto flex max-w-[1800px] items-start gap-2.5 px-5 py-3 font-mono text-[9px] uppercase leading-5 tracking-[0.08em] text-[#697176] sm:items-center sm:px-8 lg:px-16">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary sm:mt-0" />
            <p>Sample catalog only — prices, specifications, and availability are illustrative, not live Rabines inventory.</p>
          </div>
        </div>

        <ToolHolderCatalog />
        <PreFooterCTA />
      </main>
      <MainFooter />
    </>
  );
}
