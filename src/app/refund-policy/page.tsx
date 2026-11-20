import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Rabines Stores",
  description: "Replacement, returns, and refund policy for CNC tool holders and inserts at Rabines Stores.",
  alternates: {
    canonical: "https://rabines-stores.in/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-[#f3f4f2] text-[#171d21]">
        <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-[#7a8286] sm:gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[#171d21]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li aria-current="page" className="font-medium text-[#343c40]">
                Refund &amp; Return Policy
              </li>
            </ol>
          </nav>

          <article className="rounded-md border border-[#e0e3e2] bg-white p-6 sm:p-10">
            <div className="flex items-center gap-3 border-b border-[#eceeed] pb-5">
              <div className="grid size-11 place-items-center rounded bg-orange-50 text-[#ef6b32]">
                <RotateCcw className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#171d21] sm:text-3xl">Refund &amp; Return Policy</h1>
                <p className="text-xs text-[#7a8286]">Machined Tooling Guarantee · Rabines Stores</p>
              </div>
            </div>

            <div className="mt-8 space-y-6 text-sm leading-7 text-[#4c555a]">
              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">1. 7-Day Replacement Guarantee</h2>
                <p>
                  At Rabines Stores, every tool holder, boring bar, and collet is inspected for concentricity and thread precision before packing. If you receive an item with a manufacturing defect, taper mismatch, or incorrect insert pocket geometry, we provide a replacement within <strong>7 days</strong> of delivery.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">2. Conditions for Return / Replacement</h2>
                <p>To qualify for a return or replacement, the item must fulfill the following criteria:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>The tooling must be in its original condition, unused, without machine turret clamp marks, regrinding, or modifications.</li>
                  <li>Inserts must be in their original factory plastic packaging boxes (full pack of 10 pieces).</li>
                  <li>The product must be accompanied by the original delivery receipt or invoice number.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">3. Non-Returnable Products</h2>
                <p>The following items cannot be returned or refunded:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Custom-machined special lathe chuck jaws manufactured to non-standard customer blueprints.</li>
                  <li>Special tool holders modified or turned down per customer specific request.</li>
                  <li>Cutting inserts where individual pieces have been used, chipped, or tested in cutting operations.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">4. Refund Process &amp; Timelines</h2>
                <p>
                  Once the returned item is inspected at our Howrah workshop and approved:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong>Online Payments (UPI / Cards / NetBanking):</strong> Refunds are credited back to the original source account within <strong>5 to 7 working days</strong>.</li>
                  <li><strong>Cash on Delivery (COD):</strong> Refunds will be initiated via NEFT / IMPS / UPI bank transfer to the customer&rsquo;s verified account within <strong>3 to 5 working days</strong> following inspection.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">5. How to Initiate a Return</h2>
                <p>
                  Contact our dispatch desk directly with your Order Number and photo/video evidence of the defect:
                </p>
                <div className="mt-3 rounded bg-[#f8f9f8] p-4 text-xs font-mono text-[#343c40] space-y-1">
                  <p>WhatsApp / Call: +91 90021 56266</p>
                  <p>Email: storesrabines@gmail.com</p>
                  <p>Address: Rabines Stores, Kamardanga Mini Bus Stand, Howrah - 711104, WB</p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
