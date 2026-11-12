import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronRight, FileUp } from "lucide-react";

export function ServicesHero() {
  return (
    <section id="top" aria-labelledby="services-title" className="relative isolate overflow-hidden bg-[#10171c] text-white">
      <Image
        src="/images/cnc-machining-hero.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,15,19,0.97)_0%,rgba(10,15,19,0.82)_52%,rgba(10,15,19,0.34)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(10,15,19,0.88)_0%,transparent_55%,rgba(10,15,19,0.18)_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.32)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="mx-auto max-w-[1800px] px-5 pb-9 pt-7 sm:px-8 sm:pb-12 sm:pt-9 lg:px-16 lg:pb-14 lg:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
            <li><Link href="/#top" className="transition-colors hover:text-white">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-3" /></li>
            <li aria-current="page" className="text-primary">Services &amp; Solutions</li>
          </ol>
        </nav>

        <div className="mt-9 max-w-[780px] sm:mt-12 lg:mt-16">
          <p className="mb-4 flex items-center gap-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.17em] text-slate-300 sm:text-[10px]">
            <span aria-hidden="true" className="size-2 bg-primary shadow-[0_0_14px_rgba(239,107,50,0.55)]" />
            Rabines engineering <span className="text-primary">/</span> Howrah, India
          </p>
          <h1 id="services-title" className="max-w-[730px] text-[clamp(2.65rem,10.5vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">
            From drawing to finished part.
          </h1>
          <p className="mt-5 max-w-[630px] text-sm leading-6 text-slate-300 sm:mt-6 sm:text-base sm:leading-7">
            CNC machining, programming, and engineering drawing support for production teams. Share the print and project scope; we will help define process fit and a realistic schedule.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="#quote-form"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[#11171c] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#11171c] sm:px-5 sm:text-[11px]"
            >
              <FileUp aria-hidden="true" className="size-4" />
              Upload Drawing &amp; Get Quote
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#capabilities"
              className="group inline-flex min-h-12 items-center justify-center gap-2 border border-white/25 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-white/55 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-5 sm:text-[11px]"
            >
              Explore capabilities
              <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 border-t border-white/20 pt-4 sm:mt-12 sm:grid-cols-3 sm:pt-5">
          {[
            { number: "01", label: "CNC machining" },
            { number: "02", label: "CNC programming" },
            { number: "03", label: "Engineering drawings" },
          ].map((item, index) => (
            <div key={item.number} className={`flex items-center gap-3 py-2 sm:py-0 ${index > 0 ? "sm:border-l sm:border-white/15 sm:pl-5" : ""} ${index < 2 ? "border-b border-white/15 sm:border-b-0" : ""}`}>
              <span className="font-mono text-[9px] text-primary">{item.number}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-200 sm:text-[10px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
