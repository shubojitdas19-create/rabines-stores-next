import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Rabines Stores",
  description: "Terms and conditions of sale, supply, and engineering support from Rabines Stores, Howrah.",
  alternates: {
    canonical: "https://rabines-stores.in/terms",
  },
};

export default function TermsPage() {
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
                Terms &amp; Conditions
              </li>
            </ol>
          </nav>

          <article className="rounded-md border border-[#e0e3e2] bg-white p-6 sm:p-10">
            <div className="flex items-center gap-3 border-b border-[#eceeed] pb-5">
              <div className="grid size-11 place-items-center rounded bg-orange-50 text-[#ef6b32]">
                <FileText className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#171d21] sm:text-3xl">Terms &amp; Conditions</h1>
                <p className="text-xs text-[#7a8286]">Effective Date: November 2026 · Rabines Stores</p>
              </div>
            </div>

            <div className="mt-8 space-y-6 text-sm leading-7 text-[#4c555a]">
              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">1. Scope of Agreement</h2>
                <p>
                  These Terms and Conditions govern the purchase, supply, and delivery of industrial CNC cutting tools, inserts, lathe chuck jaws, collet systems, and CAD/CAM engineering services provided by Rabines Stores. By browsing our website, placing an order, or requesting an engineering quote, you agree to be bound by these terms.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">2. Commercial Quotes &amp; Pricing</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>All prices displayed on the storefront are in Indian Rupees (INR) and represent standard sample retail prices.</li>
                  <li>Applicable Goods and Services Tax (GST) is calculated at the statutory rate (standard 18% for machine tooling and industrial spares). Tax invoices containing your GSTIN will be provided upon dispatch.</li>
                  <li>Quotations provided via WhatsApp or official email for custom tooling, non-standard soft jaws, or bulk batch quantities remain valid for 15 days from issuance unless otherwise specified.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">3. Technical Specifications &amp; Compatibility</h2>
                <p>
                  While we strive to provide exact dimensional values, insert seat geometries, and grade specifications according to ISO/DIN standards, it remains the customer&rsquo;s responsibility to verify that the tool shank size, taper interface (e.g. BT40, BT50), and insert geometry match their CNC machine turret and workpiece requirements.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">4. Orders, Payment &amp; Cancellation</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Orders placed via Cash on Delivery (COD) are subject to telephonic verification prior to dispatch.</li>
                  <li>For online payments, transactions are processed securely through certified payment gateway partners (Razorpay).</li>
                  <li>Standard catalog orders may be cancelled at any time prior to physical courier dispatch by notifying us via phone or WhatsApp. Once dispatched, standard return and refund terms apply.</li>
                  <li>Orders for custom-manufactured soft jaws, special ground boring bars, or tailor-made fixtures cannot be cancelled once raw material cutting or machining has commenced.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">5. Limitation of Liability</h2>
                <p>
                  Rabines Stores shall not be held liable for any indirect, incidental, or consequential damages resulting from tool wear, improper cutting parameters (speed/feed mismatches), machine collisions, or production downtime. Our maximum liability shall in all circumstances be limited to the purchase value of the product supplied.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">6. Governing Law &amp; Jurisdiction</h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in Howrah / Kolkata, West Bengal.
                </p>
              </section>
            </div>
          </article>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
