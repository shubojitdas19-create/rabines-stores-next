import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Cog, Ruler } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ServiceCapability = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  href: string;
};

const capabilities: ServiceCapability[] = [
  {
    number: "01",
    title: "CNC Machining",
    description: "CNC turning and milling support, with machine fit and production scope reviewed against the part drawing.",
    image: "/images/categories/cnc-services.png",
    imageAlt: "CNC milling machine cutting a metal workpiece",
    icon: Cog,
    href: "#cnc-services",
  },
  {
    number: "02",
    title: "CNC Programming",
    description: "Programming support shaped around the machine, controller, setup, tooling, and part requirements.",
    image: "/images/categories/cnc-program-solutions.png",
    imageAlt: "CNC programming workstation beside a machine control panel",
    icon: Code2,
    href: "#cnc-program-solutions",
  },
  {
    number: "03",
    title: "Engineering Drawings",
    description: "CAD and drawing support to clarify dimensions, tolerances, revisions, and manufacturing intent.",
    image: "/images/categories/engineering-drawings.png",
    imageAlt: "Mechanical CAD model and engineering drawing on a drafting table",
    icon: Ruler,
    href: "#engineering-drawings",
  },
];

export function ServiceOverview() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="bg-[#f2f4f4] py-12 text-[#171d21] sm:py-16 lg:py-[76px]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16">
        <div className="mb-7 max-w-3xl sm:mb-9">
          <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.17em] text-[#737b80] sm:text-[10px]">
            <span aria-hidden="true" className="size-2 bg-primary" /> Capabilities <span className="text-primary">/</span> 01—03
          </p>
          <h2 id="capabilities-title" className="text-3xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-4xl lg:text-[42px]">
            One technical partner, three ways to move a job forward.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#626b70] sm:text-[15px] sm:leading-7">
            Bring a part, a program requirement, or a drawing that needs development. Start with the deliverable you have; scope is confirmed together.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article key={capability.number} className="group overflow-hidden border border-[#d9dddf] bg-white transition-colors duration-300 hover:border-primary focus-within:border-primary">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1c252b]">
                  <Image
                    src={capability.image}
                    alt={capability.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0c1116]/80 via-transparent to-[#0c1116]/10" />
                  <span className="absolute left-4 top-4 border border-white/20 bg-[#10171c]/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.13em] text-white/80">Capability {capability.number}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-4 flex size-10 items-center justify-center border border-primary/40 bg-primary/10 text-[#d85f2d]">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#171d21]">{capability.title}</h3>
                  <p className="mt-2 min-h-[3.25rem] text-sm leading-6 text-[#687176]">{capability.description}</p>
                  <Link
                    href={capability.href}
                    className="mt-5 inline-flex min-h-10 items-center gap-2 border-t border-[#e4e7e8] pt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#343c40] transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Explore capability <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
