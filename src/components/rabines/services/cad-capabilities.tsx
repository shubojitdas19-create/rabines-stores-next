import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, FileText, Ruler } from "lucide-react";

const drawingSupport = [
  "2D manufacturing drawing creation or revision",
  "3D CAD model review for part and setup context",
  "Dimension, tolerance, and revision clarification",
];

const supportedFormats = ["PDF", "DWG", "DXF", "STEP", "IGES"];

export function CadCapabilities() {
  return (
    <section id="engineering-drawings" aria-labelledby="cad-title" className="scroll-mt-8 border-t border-[#d9dddf] bg-white py-12 text-[#171d21] sm:py-16 lg:py-[76px]">
      <div className="mx-auto grid max-w-[1800px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:px-16">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#737b80] sm:text-[10px]">
            <Ruler aria-hidden="true" className="size-4 text-primary" /> CAD &amp; engineering drawings <span className="text-primary">/</span> 2D + 3D
          </p>
          <h2 id="cad-title" className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-4xl">
            Clear drawings. Better-informed decisions.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#626b70] sm:text-[15px] sm:leading-7">
            Engineering drawing support helps define the part, its tolerances, and manufacturing intent before a machining or programming quote is finalized.
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            {drawingSupport.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-5 text-[#434c51]">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#d85f2d]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-[#e3e6e7] pt-4">
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#7a8286]">
              <FileText aria-hidden="true" className="size-3.5 text-primary" /> File formats for initial review
            </p>
            <ul aria-label="Accepted drawing formats" className="mt-3 flex flex-wrap gap-2">
              {supportedFormats.map((format) => (
                <li key={format} className="border border-[#d9dddf] bg-[#f4f6f6] px-2.5 py-1.5 font-mono text-[9px] font-semibold tracking-[0.08em] text-[#434c51]">{format}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-5 text-[#737b80]">Native CAD files are useful when available; a PDF is fine for an initial discussion.</p>
          </div>

          <Link href="#quote-form" className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-primary pb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#252d32] transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Send a drawing for review <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <figure className="relative aspect-[4/3] overflow-hidden border border-[#d9dddf] bg-[#dfe2e2]">
          <Image
            src="/images/categories/engineering-drawings.png"
            alt="Mechanical CAD model and manufacturing drawings on a drafting table"
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0c1116]/75 via-transparent to-transparent" />
          <figcaption className="absolute bottom-0 left-0 flex items-center gap-2 p-4 font-mono text-[9px] uppercase tracking-[0.12em] text-white sm:p-5">
            <span className="size-1.5 bg-primary" /> Engineering drawings / CAD support
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
