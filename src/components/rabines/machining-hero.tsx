import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MoveUpRight } from "lucide-react";

export function MachiningHero() {
  return (
    <main id="top" className="relative isolate min-h-[660px] overflow-hidden bg-[#171e23] text-white sm:min-h-[690px] lg:min-h-[min(760px,calc(100svh-110px))]">
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

      <section className="mx-auto flex min-h-[660px] max-w-[1800px] flex-col justify-center px-5 pb-16 pt-20 sm:min-h-[690px] sm:px-8 sm:pb-20 lg:min-h-[min(760px,calc(100svh-110px))] lg:px-16 lg:pb-24">
        <div className="hero-enter max-w-[820px]">
          <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-[11px]">
            <span className="size-2 bg-[#f2763b] shadow-[0_0_14px_rgba(242,118,59,0.7)]" />
            Engineered for the shop floor
            <span className="hidden h-px w-12 bg-white/25 sm:block" />
            <span className="hidden font-mono tracking-[0.12em] text-slate-400 sm:block">EST. 1998 · HOWRAH, INDIA</span>
          </div>

          <h1 className="max-w-[780px] text-[clamp(2.75rem,7.2vw,6.25rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-white">
            The right tool.<br />
            <span className="text-slate-300">The right cut.</span>
          </h1>
          <p className="mt-6 max-w-[540px] text-[15px] leading-7 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8">
            Precision CNC tooling and technical support for the people who keep production moving.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <a href="https://wa.me/919002156266?text=Hello%20Rabines%20Stores%2C%20I%27d%20like%20to%20discuss%20my%20tooling%20requirements." target="_blank" rel="noreferrer" className="group inline-flex h-[54px] items-center justify-center gap-3 bg-[#ef6b32] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[#11171c] transition-all duration-300 hover:bg-[#ff8750] hover:shadow-[0_8px_32px_rgba(239,107,50,0.2)] sm:justify-start">
              Talk to a tooling specialist <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#hero-details" className="group inline-flex h-[54px] items-center justify-center gap-2 border border-white/25 px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/55 hover:bg-white/5 sm:justify-start">
              Discover Rabines <ArrowDownRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div id="hero-details" className="mt-16 grid max-w-[740px] grid-cols-2 border-t border-white/20 pt-5 sm:mt-20 sm:grid-cols-3 sm:pt-6">
          <div className="border-r border-white/15 pr-4 sm:pr-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#f2763b]">01 / Source</p>
            <p className="mt-2 text-xs text-slate-200 sm:text-sm">Reliable tooling, sourced right</p>
          </div>
          <div className="border-r border-white/15 px-4 sm:px-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#f2763b]">02 / Specify</p>
            <p className="mt-2 text-xs text-slate-200 sm:text-sm">Technical help when it matters</p>
          </div>
          <div className="hidden pl-7 sm:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#f2763b]">03 / Deliver</p>
            <p className="mt-2 text-sm text-slate-200">Across India, to your shop floor</p>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.17em] text-white/60 xl:flex">
          <span className="h-px w-10 bg-[#f2763b]" /> Precision in every pass <MoveUpRight aria-hidden="true" className="size-3.5" />
        </div>
      </section>
    </main>
  );
}
