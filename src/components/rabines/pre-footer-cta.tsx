import { MessageCircle } from "lucide-react";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";

const whatsappHref =
  "https://wa.me/919002156266?text=Hello%20Rabines%20Stores%2C%20I%27d%20like%20to%20speak%20with%20a%20specialist%20about%20a%20custom%20setup%20or%20bulk%20tooling.";

export function PreFooterCTA() {
  return (
    <section aria-labelledby="custom-setup-title" className="relative isolate overflow-hidden border-y border-white/10 bg-[#141b20] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_50%,rgba(239,107,50,0.19),transparent_42%),linear-gradient(110deg,rgba(20,27,32,0.35),rgba(9,14,18,0.94))]"
      />

      <div className="mx-auto flex max-w-[1800px] flex-col gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-16 lg:py-[68px]">
        <div className="max-w-[760px]">
          <p className="mb-4 flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300">
            <span aria-hidden="true" className="size-2 bg-primary shadow-[0_0_14px_rgba(239,107,50,0.55)]" />
            Technical support <span className="text-primary">/</span> Bulk orders
          </p>
          <h2 id="custom-setup-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[42px]">
            Need a Custom Setup or Bulk Tooling?
          </h2>
          <p className="mt-4 max-w-[680px] text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Send us your engineering drawings or machine specs. Our technical team in Howrah is ready to optimize your production.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
          <LeadRequestDialog
            label="Request Custom Quote"
            ariaLabel="Request a custom setup or bulk tooling quote"
            defaultProduct="Custom Setup or Bulk Tooling"
            className="inline-flex h-12 items-center justify-center bg-primary px-5 text-[11px] font-bold uppercase tracking-[0.09em] text-[#11171c] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#141b20] sm:min-w-[200px]"
          />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-5 text-[11px] font-semibold uppercase tracking-[0.09em] text-white transition-colors hover:border-primary hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#141b20] sm:min-w-[200px]"
          >
            <MessageCircle aria-hidden="true" className="size-4 text-primary" />
            WhatsApp a Specialist
          </a>
        </div>
      </div>
    </section>
  );
}
