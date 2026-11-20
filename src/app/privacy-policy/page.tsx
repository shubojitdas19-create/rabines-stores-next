import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Rabines Stores",
  description: "Privacy policy and engineering IP confidentiality terms of Rabines Stores, Howrah.",
  alternates: {
    canonical: "https://rabines-stores.in/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </li>
            </ol>
          </nav>

          <article className="rounded-md border border-[#e0e3e2] bg-white p-6 sm:p-10">
            <div className="flex items-center gap-3 border-b border-[#eceeed] pb-5">
              <div className="grid size-11 place-items-center rounded bg-orange-50 text-[#ef6b32]">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#171d21] sm:text-3xl">Privacy Policy</h1>
                <p className="text-xs text-[#7a8286]">Last Updated: November 2026 · Rabines Stores</p>
              </div>
            </div>

            <div className="mt-8 space-y-6 text-sm leading-7 text-[#4c555a]">
              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">1. Overview &amp; Commitment</h2>
                <p>
                  Rabines Stores (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), located at Kamardanga Mini Bus Stand, Howrah, 711104, West Bengal, respects the privacy and confidentiality of our clients, manufacturing partners, and machinists. This Privacy Policy details how we handle personal data, workshop contact details, and engineering files collected through our website and quotation services.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">2. Information We Collect</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Account &amp; Contact Details:</strong> Name, workshop or company name, delivery address, phone number, and email address provided during order placement or RFQ submission.</li>
                  <li><strong>Technical Data &amp; Drawing Files:</strong> 2D manufacturing prints (PDF, DWG, DXF) and 3D CAD models (STEP, IGES) uploaded for machining feasibility, cycle time evaluation, or quotation.</li>
                  <li><strong>Transaction Records:</strong> Order numbers, product SKUs, billing address, and payment method (Cash on Delivery or payment gateway transaction reference). We do NOT store credit/debit card numbers or net banking passwords.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">3. Proprietary Engineering Drawings &amp; IP Protection</h2>
                <p>
                  We treat all technical drawings, tooling blueprints, and CAD models shared with us as strictly confidential intellectual property. Drawing files are used solely by our internal technical team to calculate tool compatibility, machine capacity, and pricing. We will never share, sell, distribute, or license your technical prints or component designs to any third party.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">4. How We Use Your Data</h2>
                <p>Collected information is used exclusively to:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Process, dispatch, and deliver your CNC tooling and hardware orders.</li>
                  <li>Generate commercial quotations, GST invoices, and dispatch notes.</li>
                  <li>Provide direct technical assistance via WhatsApp or telephone for toolholder sizing and insert grade recommendations.</li>
                  <li>Notify you of shipment dispatch and delivery tracking details.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">5. Data Security</h2>
                <p>
                  We implement industry-standard encryption, SSL communication protocols, and restricted role-based database access to protect your personal and business records against unauthorized disclosure or loss.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">6. Contact Us</h2>
                <p>
                  If you have questions regarding this Privacy Policy or wish to request deletion of your contact records, please reach out to:
                </p>
                <div className="mt-3 rounded bg-[#f8f9f8] p-4 text-xs font-mono text-[#343c40] space-y-1">
                  <p><strong>Rabines Stores Data Protection</strong></p>
                  <p>Kamardanga Mini Bus Stand, Howrah, 711104, West Bengal</p>
                  <p>Email: storesrabines@gmail.com</p>
                  <p>Phone: +91 90021 56266</p>
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
