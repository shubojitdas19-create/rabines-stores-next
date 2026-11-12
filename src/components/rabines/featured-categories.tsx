import Image from "next/image";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";
import { PartnerLogoMarquee } from "@/components/rabines/partner-logo-marquee";

type CategoryCard = {
  id?: string;
  kind: "product" | "service";
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

const categories: CategoryCard[] = [
  {
    kind: "product",
    title: "CNC Tool Holders",
    subtitle: "Turning, Milling & Drilling",
    image: "/images/categories/cnc-tool-holders.png",
    alt: "Precision CNC turning tools, boring bars and milling cutters on a steel workbench",
  },
  {
    kind: "product",
    title: "Cutting Inserts",
    subtitle: "Carbide & Cermet Grades",
    image: "/images/categories/cutting-inserts.png",
    alt: "A selection of carbide and cermet cutting inserts in multiple machining geometries",
  },
  {
    kind: "product",
    title: "Lathe Jaws",
    subtitle: "Hard, Soft & Special Jaws",
    image: "/images/categories/lathe-jaws.png",
    alt: "A three-jaw lathe chuck with precision-machined hard and soft chuck jaws",
  },
  {
    kind: "product",
    title: "Machine Accessories",
    subtitle: "Collets, Spares & Boring Bars",
    image: "/images/categories/machine-accessories.png",
    alt: "CNC collets, a collet chuck, boring bars and precision machine spares",
  },
  {
    id: "cnc-services",
    kind: "service",
    title: "CNC Services",
    subtitle: "Expert Machining",
    image: "/images/categories/cnc-services.png",
    alt: "A CNC milling machine cutting a metal workpiece",
  },
  {
    id: "cnc-program-solutions",
    kind: "service",
    title: "CNC Program Solutions",
    subtitle: "Optimized G-code",
    image: "/images/categories/cnc-program-solutions.png",
    alt: "A CNC workstation with a program display beside a machine control panel",
  },
  {
    id: "engineering-drawings",
    kind: "service",
    title: "Engineering Drawings",
    subtitle: "CAD Design & Drafting",
    image: "/images/categories/engineering-drawings.png",
    alt: "A mechanical CAD model and engineering drawing on a drafting table",
  },
  {
    kind: "service",
    title: "Engineering Instruments",
    subtitle: "Metrology Tools",
    image: "/images/categories/engineering-instruments.png",
    alt: "Precision measuring instruments arranged on a granite surface plate",
  },
];

const trustPillars = [
  {
    number: "01",
    title: "Precision tooling",
    description: "Browse CNC tool holders, cutting inserts, lathe jaws, and machine accessories.",
  },
  {
    number: "02",
    title: "Engineering services",
    description: "Explore CNC machining, program solutions, and engineering drawing support.",
  },
  {
    number: "03",
    title: "A direct conversation",
    description: "Share a product or project requirement to ask a question or request a quote.",
  },
];

export function FeaturedCategories() {
  return (
    <section id="products" aria-labelledby="featured-categories-title" className="border-t border-white/10 bg-[#131a20] py-14 text-white sm:py-16 lg:py-[72px]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 xl:px-16">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[740px]">
            <p className="mb-3 flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.19em] text-slate-400">
              <span className="size-2 bg-primary" /> What we supply
            </p>
            <h2 id="featured-categories-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[42px]">
              Precision Tooling for Every Job
            </h2>
            <p className="mt-3 max-w-[620px] text-sm leading-6 text-slate-400 sm:text-[15px]">
              From dependable CNC tooling to expert engineering support, find the products and services that keep production precise.
            </p>
          </div>
          <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 lg:block">
            Rabines Stores <span className="mx-2 text-primary">/</span> Products &amp; engineering 01—08
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
          {categories.map((category, index) => (
            <article id={category.id} key={category.title} className="group overflow-hidden border border-border bg-card text-card-foreground transition-colors duration-300 hover:border-primary focus-within:border-primary">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#20282e]">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055] group-focus-within:scale-[1.055]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0c1116]/95 via-[#0c1116]/10 to-[#0c1116]/5" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 z-10 size-5 bg-primary"
                  style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
                    <span className="size-1.5 bg-primary" />
                    {category.kind === "product" ? "Product" : "Service"} 0{index + 1}
                  </p>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-white sm:text-[22px]">{category.title}</h3>
                  <p className="mt-1 text-xs text-white/75 sm:text-[13px]">{category.subtitle}</p>
                </div>
              </div>
              <div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4 sm:px-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  {category.kind === "product" ? "Browse category" : "Talk to an expert"}
                </span>
                <LeadRequestDialog
                  label={category.kind === "product" ? "View range" : "Explore"}
                  ariaLabel={`${category.kind === "product" ? "View" : "Explore"} ${category.title}`}
                  defaultProduct={category.title}
                  showArrow
                  className="group/view-range inline-flex h-10 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-card-foreground transition-all duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-within:translate-x-0 md:group-focus-within:opacity-100"
                />
              </div>
            </article>
          ))}
        </div>

        <section aria-labelledby="rabines-support-title" className="mt-10 overflow-hidden border border-white/10 bg-[#0b1115] sm:mt-14">
          <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="bg-primary p-5 text-[#171d21] sm:p-7 lg:p-9">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#574031] sm:text-[10px]">
                Rabines Stores <span className="mx-1.5">/</span> Product &amp; engineering support
              </p>
              <h3 id="rabines-support-title" className="mt-4 max-w-[28rem] text-[27px] font-semibold leading-[1.08] tracking-[-0.045em] sm:mt-5 sm:text-4xl">
                Practical support for complex work.
              </h3>
              <p className="mt-3 max-w-[34rem] text-[13px] leading-6 text-[#343a3d] sm:mt-4 sm:text-sm">
                Source CNC tooling, explore engineering services, or bring a specific application question to the team.
              </p>
              <LeadRequestDialog
                label="Talk through a requirement"
                ariaLabel="Talk through a product or engineering requirement"
                defaultProduct="General product or engineering inquiry"
                showArrow
                className="mt-5 inline-flex min-h-12 w-full items-center justify-between gap-3 border border-[#171e23] bg-[#171e23] px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#29343a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171e23] focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:mt-6 sm:w-auto"
              />
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-[#554737] sm:text-[9px]">
                Products <span className="mx-1">·</span> Services <span className="mx-1">·</span> Technical inquiries
              </p>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              {trustPillars.map((pillar, index) => (
                <article key={pillar.number} className={`bg-[#10171c] p-4 sm:p-5 lg:p-6 ${index === 2 ? "sm:col-span-2" : ""}`}>
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-9 shrink-0 place-items-center border border-primary/40 font-mono text-[10px] font-semibold text-primary">{pillar.number}</span>
                    <div>
                      <h4 className="text-[14px] font-semibold tracking-[-0.015em] text-white sm:text-[15px]">{pillar.title}</h4>
                      <p className="mt-1.5 max-w-[32rem] text-xs leading-[1.65] text-slate-400 sm:text-[13px]">{pillar.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary sm:text-[9px]">Illustrative brand strip</p>
                <h4 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">Logo placeholders</h4>
              </div>
              <p className="max-w-[34rem] text-[11px] leading-5 text-slate-400 sm:text-right">
                Replace these sample marks with approved customer or supplier logos before publishing.
              </p>
            </div>
            <PartnerLogoMarquee />
          </div>
        </section>
      </div>
    </section>
  );
}
