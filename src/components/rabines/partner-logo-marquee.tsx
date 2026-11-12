"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

const placeholderMarks = [
  "NORTHSTAR",
  "AXIS INDUSTRIES",
  "FORM & CUT",
  "VECTOR MOTION",
  "ORBITAL",
  "MONOLITH",
];

export function PartnerLogoMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      <div className="partner-marquee overflow-hidden" role="region" aria-label="Partner logo carousel">
        <div className="partner-marquee-track" data-paused={isPaused}>
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              aria-label={isDuplicate ? undefined : "Placeholder industry partner wordmarks"}
              aria-hidden={isDuplicate}
              className="flex shrink-0 items-center gap-x-10 px-5 sm:gap-x-14 sm:px-7 lg:gap-x-16"
            >
              {placeholderMarks.map((mark) => (
                <li
                  key={`${isDuplicate}-${mark}`}
                  className="whitespace-nowrap font-mono text-[12px] font-semibold tracking-[0.11em] text-white/50 sm:text-sm"
                >
                  {mark}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">
          Placeholder wordmarks — replace with approved client logos
        </p>
        <button
          type="button"
          aria-label={isPaused ? "Resume logo animation" : "Pause logo animation"}
          aria-pressed={isPaused}
          onClick={() => setIsPaused((paused) => !paused)}
          className="inline-flex size-8 items-center justify-center border border-white/10 text-slate-400 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isPaused ? <Play aria-hidden="true" className="size-3" /> : <Pause aria-hidden="true" className="size-3" />}
        </button>
      </div>
    </div>
  );
}
