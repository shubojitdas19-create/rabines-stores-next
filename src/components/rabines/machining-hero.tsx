import Image from "next/image";
import { ArrowDownRight, MoveUpRight } from "lucide-react";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";

export function MachiningHero() {
  return (
    <div id="top" className="relative isolate min-h-[620px] overflow-hidden bg-[#171e23] text-white sm:min-h-[640px] lg:min-h-[calc(100svh-78px)]">
      <Image
        src="/images/cnc-machining-hero.png"
        alt="Precision CNC lathe machining a polished steel workpiece"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[57%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,17,21,0.96)_0%,rgba(12,17,21,0.84)_35%,rgba(12,17,21,0.38)_72%,rgba(12,17,21,0.12)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(10,15,19,0.74)_0%,transparent_30%,rgba(10,15,19,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(90deg,black,transparent_70%)]" />

      <section id="about" className="mx-auto flex min-h-[620px] max-w-[1800px] flex-col justify-center px-5 pb-12 pt-12 sm:min-h-[640px] sm:px-8 sm:pb-14 lg:min-h-[calc(100svh-78px)] lg:px-16 lg:py-14">
        <div className="hero-enter max-w-[820px]">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 sm:mb-6 sm:text-[11px]">
            <span className="size-2 bg-[#f2763b] shadow-[0_0_14px_rgba(242,118,59,0.7)]" />
            Tools, parts &amp; practical help for machine shops
            <span className="hidden h-px w-10 bg-white/25 sm:block" />
            <span className="hidden font-mono tracking-[0.12em] text-slate-400 sm:block">HOWRAH · INDIA</span>
          </div>

          <h1 className="max-w-[780px] text-[clamp(2.75rem,7.2vw,6.25rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-white">
            CNC tools for<br />
            <span className="text-slate-300">better machining.</span>
          </h1>
          <p className="mt-5 max-w-[600px] text-[15px] leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            Rabines Stores helps machinists, workshops and factories find dependable tool holders, cutting inserts, lathe jaws and accessories — with practical help choosing the right fit.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <LeadRequestDialog label="Get help finding the right tool" className="group inline-flex h-[52px] items-center justify-center gap-3 bg-[#ef6b32] px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#11171c] transition-all duration-300 hover:bg-[#ff8750] hover:shadow-[0_8px_32px_rgba(239,107,50,0.2)] sm:justify-start" />
            <a href="#hero-details" className="group inline-flex h-[52px] items-center justify-center gap-2 border border-white/25 px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-white/55 hover:bg-white/5 sm:justify-start">
              What we supply <ArrowDownRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div id="hero-details" className="mt-10 grid max-w-[900px] grid-cols-1 border-t border-white/20 pt-4 sm:mt-12 sm:grid-cols-3 sm:pt-5">
          <div className="border-b border-white/15 py-3 sm:border-b-0 sm:border-r sm:py-0 sm:pr-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#f2763b]">CNC cutting tools</p>
            <p className="mt-1 text-xs text-slate-200 sm:text-sm">Tool holders, inserts &amp; boring bars</p>
          </div>
          <div className="border-b border-white/15 py-3 sm:border-b-0 sm:border-r sm:px-5 sm:py-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#f2763b]">Lathe accessories</p>
            <p className="mt-1 text-xs text-slate-200 sm:text-sm">Chuck jaws, special jaws &amp; more</p>
          </div>
          <div id="services" className="py-3 sm:pl-5 sm:py-0">
            <p id="engineering" className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#f2763b]">Technical support</p>
            <p className="mt-1 text-xs text-slate-200 sm:text-sm">Programming, drawings &amp; guidance</p>
          </div>
        </div>

        <div className="absolute bottom-6 right-8 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.17em] text-white/60 xl:flex">
          <span className="h-px w-8 bg-[#f2763b]" /> Helping production run smoothly <MoveUpRight aria-hidden="true" className="size-3.5" />
        </div>
      </section>
    </div>
  );
}
