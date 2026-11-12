"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useState } from "react";

export function PartnerLogoMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      <div className="partner-marquee overflow-hidden" role="region" aria-label="Partner logo carousel">
        <div className="partner-marquee-track" data-paused={isPaused}>
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              aria-label={isDuplicate ? undefined : "Partner logos from the confirmed client reference"}
              aria-hidden={isDuplicate}
              className="flex shrink-0 items-center px-5 sm:px-7"
            >
              <li>
                <Image
                  src="/images/categories/reference-brand-strip.png"
                  alt={isDuplicate ? "" : "Six partner logos from the confirmed Rabines Stores reference"}
                  width={820}
                  height={38}
                  className="h-[38px] w-[820px] max-w-none object-contain"
                />
              </li>
            </ul>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">
          Partner marks reproduced from the confirmed reference
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
