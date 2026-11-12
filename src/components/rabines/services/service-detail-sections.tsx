import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Factory, Gauge, MoveUpRight } from "lucide-react";

const machineChecks = [
  { title: "CNC turning", detail: "Part envelope, chucking approach, and tool access reviewed from the drawing." },
  { title: "CNC milling", detail: "Feature access, workholding, and machining sequence scoped to the part." },
  { title: "Machine fit", detail: "Machine model, work envelope, and available capacity confirmed during quote review." },
];

export function MachinerySection() {
  return (
    <section id="cnc-services" aria-labelledby="machinery-title" className="scroll-mt-8 bg-[#12191f] py-12 text-white sm:py-16 lg:py-[76px]">
      <div className="mx-auto grid max-w-[1800px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14 lg:px-16">
        <figure className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#1b242a] lg:aspect-[1.08/1]">
          <Image
            src="/images/categories/cnc-services.png"
            alt="CNC milling machine cutting a metal workpiece"
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0c1116]/85 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/75">Machining capability</span>
            <span className="bg-primary px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#11171c]">CNC / 01</span>
          </figcaption>
        </figure>

        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 sm:text-[10px]">
            <Factory aria-hidden="true" className="size-4 text-primary" /> Machinery <span className="text-primary">/</span> Process fit
          </p>
          <h2 id="machinery-title" className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-4xl">
            The machine is only right when it fits the part.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px] sm:leading-7">
            CNC machining scope starts with the print, material, tolerances, finish, and quantity. We confirm the available machine and work envelope against the job rather than publish unverified capacity claims.
          </p>

          <ul className="mt-6 border-t border-white/10">
            {machineChecks.map((item) => (
              <li key={item.title} className="flex gap-3 border-b border-white/10 py-4">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-[13px]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link href="#quote-form" className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-primary pb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Check machine fit for your part <MoveUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProgrammingSection() {
  return (
    <section id="cnc-program-solutions" aria-labelledby="programming-title" className="scroll-mt-8 border-y border-white/10 bg-[#172027] py-12 text-white sm:py-16 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1800px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-16">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 sm:text-[10px]">
            <Gauge aria-hidden="true" className="size-4 text-primary" /> CNC programming <span className="text-primary">/</span> Setup-aware
          </p>
          <h2 id="programming-title" className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-4xl">
            Programs shaped around the machine and setup.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px] sm:leading-7">
            CNC programming support is scoped from the part geometry, controller, workholding, and tooling context. Share what the shop will run so the programming brief reflects the real setup.
          </p>
          <div className="mt-6 grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
            {[
              { label: "Part drawing", detail: "Geometry & intent" },
              { label: "Machine details", detail: "Controller & setup" },
              { label: "Program scope", detail: "Agreed before work" },
            ].map((item, index) => (
              <div key={item.label} className={`py-3 ${index > 0 ? "sm:border-l sm:border-white/10 sm:pl-4" : ""} ${index < 2 ? "border-b border-white/10 sm:border-b-0 sm:pr-4" : ""}`}>
                <p className="text-xs font-semibold text-white">{item.label}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
          <Link href="#quote-form" className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-primary pb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Discuss a program brief <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <figure className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#1b242a]">
          <Image
            src="/images/categories/cnc-program-solutions.png"
            alt="CNC programming workstation beside a machine control panel"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0c1116]/80 via-transparent to-transparent" />
          <figcaption className="absolute bottom-0 left-0 p-4 font-mono text-[9px] uppercase tracking-[0.13em] text-white/75 sm:p-5">Programming / Controller-aware scope</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function TurnaroundSection() {
  return (
    <section id="turnaround" aria-labelledby="turnaround-title" className="bg-[#f2f4f4] py-12 text-[#171d21] sm:py-16 lg:py-[72px]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#737b80] sm:text-[10px]">
              <Clock3 aria-hidden="true" className="size-4 text-primary" /> Turnaround planning <span className="text-primary">/</span> Confirmed per job
            </p>
            <h2 id="turnaround-title" className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-4xl">
              A realistic date, not a guess.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#626b70] sm:text-[15px] sm:leading-7">
            Lead time depends on geometry, material, quantity, and current capacity. Include your target completion date; the confirmed schedule is discussed with the quote before work begins.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 border border-[#d9dddf] bg-white sm:grid-cols-3">
          {[
            { number: "01", title: "Drawing & scope", detail: "Review file completeness, materials, tolerances, and quantity." },
            { number: "02", title: "Fit & capacity", detail: "Confirm the process route and current production availability." },
            { number: "03", title: "Quote & schedule", detail: "Agree on pricing and a realistic target date before approval." },
          ].map((item, index) => (
            <article key={item.number} className={`p-5 sm:p-6 ${index < 2 ? "border-b border-[#e1e4e5] sm:border-b-0 sm:border-r" : ""}`}>
              <p className="font-mono text-[10px] font-semibold text-[#d85f2d]">{item.number} <span className="text-[#9ca3a6]">/ 03</span></p>
              <h3 className="mt-4 text-base font-semibold text-[#171d21]">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#687176]">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 border border-[#d9dddf] bg-[#e9eded] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs leading-5 text-[#596166]">Priority requests are reviewed for feasibility; a requested date is not confirmed until it appears in the quote.</p>
          <Link href="#quote-form" className="inline-flex min-h-10 shrink-0 items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-[#343c40] transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Share a target date <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
