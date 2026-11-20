import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";

const quickLinks = [
  { label: "CNC Tool Catalog", href: "/shop/tool-holders" },
  { label: "Machining Services", href: "/services#cnc-services" },
  { label: "CNC Program Solutions", href: "/services#cnc-program-solutions" },
  { label: "Engineering Drawings", href: "/services#engineering-drawings" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "Tooling Cart", href: "/cart" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund & Cancellation", href: "/refund-policy" },
  { label: "Shipping & Delivery", href: "/shipping-policy" },
];

const contactLinkClass = "group flex items-start gap-3 text-sm leading-6 text-slate-400 transition-colors hover:text-white";
const footerLinkClass = "inline-flex items-center text-sm text-slate-400 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none";

export function MainFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#0d1317] text-white">
      <div className="mx-auto max-w-[1800px] px-5 py-12 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr] lg:gap-12">
          {/* Brand & Address */}
          <section aria-labelledby="footer-brand-title" id="contact-details">
            <div className="flex items-center gap-4">
              <Image
                src="/images/rabines-logo.png"
                alt=""
                aria-hidden="true"
                width={70}
                height={70}
                className="size-[58px] object-contain"
              />
              <div>
                <h2 id="footer-brand-title" className="text-lg font-semibold tracking-tight text-white">Rabines Stores</h2>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">Precision Tooling &amp; Engineering · Howrah</p>
              </div>
            </div>

            <address aria-label="Rabines Stores contact details" className="mt-6 not-italic">
              <ul className="flex flex-col gap-3">
                <li>
                  <a className={contactLinkClass} href="tel:+919002156266">
                    <Phone aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    <span>+91 90021 56266</span>
                  </a>
                </li>
                <li>
                  <a className={contactLinkClass} href="mailto:storesrabines@gmail.com">
                    <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    <span>storesrabines@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    className={contactLinkClass}
                    href="https://www.google.com/maps/search/?api=1&query=Kamardanga%20Mini%20Bus%20Stand%2C%20Howrah%2C%20711104%2C%20West%20Bengal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    <span>Kamardanga Mini Bus Stand, Howrah, 711104, West Bengal, India.</span>
                  </a>
                </li>
              </ul>
            </address>

            <div className="mt-5 flex items-center gap-2 rounded bg-white/[0.04] p-3 text-[11px] text-slate-400 border border-white/10 max-w-sm">
              <ShieldCheck className="size-4 shrink-0 text-primary" />
              <span>GST Input Invoicing available for all Pan-India B2B tool orders.</span>
            </div>
          </section>

          {/* Quick Links */}
          <nav aria-labelledby="footer-quick-links-title">
            <h2 id="footer-quick-links-title" className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-white/80">Navigation</h2>
            <ul className="flex flex-col items-start gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link className={footerLinkClass} href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Policies */}
          <nav aria-labelledby="footer-legal-title">
            <h2 id="footer-legal-title" className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-white/80">Policies &amp; Legal</h2>
            <ul className="flex flex-col items-start gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link className={footerLinkClass} href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support & Quotes */}
          <nav aria-labelledby="footer-support-title">
            <h2 id="footer-support-title" className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-white/80">Support Desk</h2>
            <ul className="flex flex-col items-start gap-3">
              <li>
                <LeadRequestDialog
                  label="Request a Custom Quote"
                  defaultProduct="Not sure — I need guidance"
                  className={`${footerLinkClass} cursor-pointer border-0 bg-transparent p-0`}
                />
              </li>
              <li>
                <a
                  className={footerLinkClass}
                  href="https://wa.me/919002156266?text=Hello%20Rabines%20Stores%2C%20I%20have%20an%20enquiry%20regarding%20tooling%20support."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Specialist
                </a>
              </li>
              <li>
                <a className={footerLinkClass} href="mailto:storesrabines@gmail.com?subject=Tooling%20Support%20Enquiry">
                  Email Technical Desk
                </a>
              </li>
              <li>
                <Link className={footerLinkClass} href="/checkout">
                  Express Checkout
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 font-mono">
          <p>© 2026 Rabines Stores. Engineered precision for industrial machining.</p>
          <p>Howrah, West Bengal · Pan-India Dispatch</p>
        </div>
      </div>
    </footer>
  );
}
