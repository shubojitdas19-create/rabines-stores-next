import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";

const quickLinks = [
  { label: "CNC Services", href: "#cnc-services" },
  { label: "CNC Programs", href: "#cnc-program-solutions" },
  { label: "Engineering Drawings", href: "#engineering-drawings" },
  { label: "Tools & Instruments", href: "#products" },
];

const contactLinkClass = "group flex items-start gap-3 text-sm leading-6 text-slate-400 transition-colors hover:text-white";
const footerLinkClass = "inline-flex items-center text-sm text-slate-400 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none";

export function MainFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#0d1317] text-white">
      <div className="mx-auto max-w-[1800px] px-5 py-12 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_0.9fr] lg:gap-16">
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
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">Precision solutions · Howrah</p>
              </div>
            </div>

            <address aria-label="Rabines Stores contact details" className="mt-7 not-italic">
              <ul className="flex flex-col gap-3.5">
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
                    <span>Kamardanga Mini Bus Stand, Howrah, 711104, West Bengal.</span>
                  </a>
                </li>
              </ul>
            </address>
          </section>

          <nav aria-labelledby="footer-quick-links-title">
            <h2 id="footer-quick-links-title" className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-white/80">Quick Links</h2>
            <ul className="flex flex-col items-start gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a className={footerLinkClass} href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-support-title">
            <h2 id="footer-support-title" className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-white/80">Support</h2>
            <ul className="flex flex-col items-start gap-3.5">
              <li>
                <a
                  className={footerLinkClass}
                  href="mailto:storesrabines@gmail.com?subject=Shipping%20policy%20enquiry"
                  aria-label="Ask Rabines Stores for current shipping policy details"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <LeadRequestDialog
                  label="Request a Quote"
                  defaultProduct="Not sure — I need guidance"
                  className={`${footerLinkClass} cursor-pointer border-0 bg-transparent p-0`}
                />
              </li>
              <li>
                <a className={footerLinkClass} href="mailto:storesrabines@gmail.com?subject=Contact%20Rabines%20Stores">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-11 border-t border-white/10 pt-5 sm:mt-14">
          <p className="text-center font-mono text-[10px] leading-5 tracking-[0.04em] text-slate-500 sm:text-left">
            © 2026 Rabines Stores. Precise solutions for modern engineering.
          </p>
        </div>
      </div>
    </footer>
  );
}
