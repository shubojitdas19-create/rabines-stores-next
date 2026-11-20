import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Truck } from "lucide-react";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Rabines Stores",
  description: "Pan-India dispatch and delivery policy for CNC tool holders and machine spares from Rabines Stores Howrah.",
  alternates: {
    canonical: "https://rabines-stores.in/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
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
                Shipping Policy
              </li>
            </ol>
          </nav>

          <article className="rounded-md border border-[#e0e3e2] bg-white p-6 sm:p-10">
            <div className="flex items-center gap-3 border-b border-[#eceeed] pb-5">
              <div className="grid size-11 place-items-center rounded bg-orange-50 text-[#ef6b32]">
                <Truck className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#171d21] sm:text-3xl">Shipping &amp; Delivery Policy</h1>
                <p className="text-xs text-[#7a8286]">Pan-India Industrial Dispatch · Rabines Stores</p>
              </div>
            </div>

            <div className="mt-8 space-y-6 text-sm leading-7 text-[#4c555a]">
              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">1. Dispatch Location &amp; Coverage</h2>
                <p>
                  All shipments originate directly from our central industrial inventory hub in <strong>Howrah, West Bengal (PIN 711104)</strong>. We ship across India to manufacturing units, toolrooms, and lathe facilities in all states and union territories.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">2. Processing &amp; Dispatch Timeline</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Standard In-Stock Tools:</strong> Orders confirmed before 3:00 PM IST on working days (Monday to Saturday) are dispatched on the <strong>same day</strong>. Orders placed after 3:00 PM are dispatched on the next working day.</li>
                  <li><strong>Special / Fabricated Jaws:</strong> Custom chuck jaws and modified tooling require <strong>3 to 5 working days</strong> for machining, hardening, and inspection prior to handover to the carrier.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">3. Estimated Transit Times</h2>
                <div className="mt-3 overflow-hidden rounded border border-[#eceeed]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f8f9f8] text-[#171d21] border-b border-[#eceeed]">
                      <tr>
                        <th className="p-3">Destination Region</th>
                        <th className="p-3">Courier Mode</th>
                        <th className="p-3">Estimated Transit Window</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eceeed]">
                      <tr>
                        <td className="p-3 font-medium">Kolkata &amp; Howrah Metro Area</td>
                        <td className="p-3">Local Express Delivery</td>
                        <td className="p-3">Same Day / 24 Hours</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">West Bengal, Odisha, Bihar, Jharkhand</td>
                        <td className="p-3">Surface / Air Cargo</td>
                        <td className="p-3">2 to 3 Business Days</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">North, West &amp; South India</td>
                        <td className="p-3">Express Air / Surface Logistics</td>
                        <td className="p-3">3 to 5 Business Days</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Remote &amp; Northeast Industrial Belts</td>
                        <td className="p-3">Speed Post / Standard Cargo</td>
                        <td className="p-3">5 to 7 Business Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">4. Packaging &amp; Protection</h2>
                <p>
                  Industrial machine tooling requires heavy-duty protection against impact and moisture during transit. All carbide inserts are shipped in factory seal boxes, and steel tool holders are treated with anti-rust protective oil and wrapped in high-density VCI anti-corrosion packaging.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-[#171d21] mb-2">5. Shipment Tracking</h2>
                <p>
                  As soon as your package is handed over to our logistics partner (Delhivery / BlueDart / Trackon / India Post), tracking airway bill (AWB) numbers and live tracking links are shared with you via WhatsApp and Email.
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
