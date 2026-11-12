import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";

const categories = [
  {
    title: "CNC Tool Holders",
    subtitle: "Turning, Milling & Drilling",
    image: "/images/categories/cnc-tool-holders.png",
    alt: "Precision CNC turning tools, boring bars and milling cutters on a steel workbench",
  },
  {
    title: "Cutting Inserts",
    subtitle: "Carbide & Cermet Grades",
    image: "/images/categories/cutting-inserts.png",
    alt: "A selection of carbide and cermet cutting inserts in multiple machining geometries",
  },
  {
    title: "Lathe Jaws",
    subtitle: "Hard, Soft & Special Jaws",
    image: "/images/categories/lathe-jaws.png",
    alt: "A three-jaw lathe chuck with precision-machined hard and soft chuck jaws",
  },
  {
    title: "Machine Accessories",
    subtitle: "Collets, Spares & Boring Bars",
    image: "/images/categories/machine-accessories.png",
    alt: "CNC collets, a collet chuck, boring bars and precision machine spares",
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
              Explore dependable CNC cutting tools and machine accessories for machinists, workshops and production teams.
            </p>
          </div>
          <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 lg:block">
            Rabines Stores <span className="mx-2 text-primary">/</span> Product ranges 01—04
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
          {categories.map((category, index) => (
            <article key={category.title} className="group overflow-hidden border border-border bg-card text-card-foreground transition-colors duration-300 hover:border-primary focus-within:border-primary">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#20282e]">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055] group-focus-within:scale-[1.055]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0c1116]/95 via-[#0c1116]/10 to-[#0c1116]/5" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
                    <span className="size-1.5 bg-primary" /> Range 0{index + 1}
                  </p>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-white sm:text-[22px]">{category.title}</h3>
                  <p className="mt-1 text-xs text-white/75 sm:text-[13px]">{category.subtitle}</p>
                </div>
              </div>
              <div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4 sm:px-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Browse category</span>
                <LeadRequestDialog
                  label="View range"
                  ariaLabel={`View ${category.title} range`}
                  defaultProduct={category.title}
                  showArrow
                  className="group/view-range inline-flex h-10 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-card-foreground transition-all duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-within:translate-x-0 md:group-focus-within:opacity-100"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 border-l-2 border-primary/70 pl-4 text-xs leading-5 text-slate-500 sm:mt-7">
          <ArrowUpRight aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-primary" />
          Not sure which tool fits your machine? Choose a range and tell us what you&apos;re working on.
        </div>
      </div>
    </section>
  );
}
