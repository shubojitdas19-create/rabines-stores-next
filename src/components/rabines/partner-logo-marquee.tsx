"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

const sampleBrands = [
  { name: "NORTHLINE CNC", monogram: "NC", field: "Machining" },
  { name: "FERRUM INDUSTRIAL", monogram: "FI", field: "Tooling" },
  { name: "AXISFORGE", monogram: "AF", field: "Precision" },
  { name: "METRIX TOOLS", monogram: "MT", field: "Metrology" },
  { name: "TORQWORKS", monogram: "TW", field: "Workholding" },
  { name: "VECTOR TURNING", monogram: "VT", field: "CNC systems" },
  { name: "CUTFORM", monogram: "CF", field: "Cutting tools" },
  { name: "STEELBRIDGE", monogram: "SB", field: "Engineering" },
  { name: "FORGEPOINT", monogram: "FP", field: "Production" },
  { name: "G-CODE LAB", monogram: "GC", field: "Programming" },
  { name: "MACHINEX SYSTEMS", monogram: "MX", field: "Machine tools" },
  { name: "PRECISION CO.", monogram: "PC", field: "Measurement" },
];

export function PartnerLogoMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      <div className="partner-marquee overflow-hidden" role="region" aria-label="Illustrative sample brand logos">
        <div className="partner-marquee-track" data-paused={isPaused}>
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              aria-label={isDuplicate ? undefined : "Illustrative sample business wordmarks"}
              aria-hidden={isDuplicate}
              className="flex shrink-0 items-center gap-3 px-2 sm:gap-4 sm:px-4"
            >
              {sampleBrands.map((brand) => (
                <li key={`${isDuplicate}-${brand.name}`}>
                  <div className="flex h-[58px] min-w-[178px] items-center gap-3 border border-white/10 bg-white/[0.025] px-4">
                    <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center border border-primary/45 font-mono text-[10px] font-bold tracking-[-0.04em] text-primary">
                      {brand.monogram}
                    </span>
                    <span className="min-w-0">
                      <span className="block whitespace-nowrap text-[10px] font-semibold tracking-[0.055em] text-white/75 sm:text-[11px]">
                        {brand.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.15em] text-slate-500">
                        {brand.field}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <p className="max-w-[34rem] text-center font-mono text-[10px] uppercase tracking-[0.1em] text-slate-400">
          Placeholder names only — not current customers, partners, or endorsements
        </p>
        <button
          type="button"
          aria-label={isPaused ? "Resume logo animation" : "Pause logo animation"}
          aria-pressed={isPaused}
          onClick={() => setIsPaused((paused) => !paused)}
          className="partner-marquee-control inline-flex size-8 items-center justify-center border border-white/10 text-slate-400 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isPaused ? <Play aria-hidden="true" className="size-3" /> : <Pause aria-hidden="true" className="size-3" />}
        </button>
      </div>
    </div>
  );
}
