"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";

const links = [
  { label: "CNC services", href: "#services" },
  { label: "Tooling & inserts", href: "#tooling" },
  { label: "Engineering", href: "#engineering" },
  { label: "Resources", href: "#resources" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#11171c] text-white">
      <div className="mx-auto flex h-[76px] max-w-[1800px] items-center justify-between gap-5 px-5 sm:px-8 xl:px-16">
        <a href="#top" aria-label="Rabines Stores home" className="group flex shrink-0 items-center gap-3">
          <span className="relative grid size-11 place-items-center border border-[#f06b31]/55 bg-[#f06b31]/10 text-[#ff7b3c] transition-colors group-hover:bg-[#f06b31]/20">
            <span className="font-mono text-sm font-bold tracking-[-0.16em]">RS</span>
            <span className="absolute -bottom-px -right-px size-2 border border-[#11171c] bg-[#f06b31]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-[0.15em]">RABINES</span>
            <span className="mt-1 text-[9px] font-medium tracking-[0.34em] text-slate-400">STORES · HOWRAH</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="group flex items-center gap-1.5 text-[13px] font-medium text-slate-300 transition-colors hover:text-white">
              {link.label}
              {link.label === "CNC services" && <ChevronDown aria-hidden="true" className="size-3.5 text-slate-500 transition-transform group-hover:translate-y-0.5" />}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#search" aria-label="Search catalog" className="grid size-10 place-items-center border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"><Search aria-hidden="true" className="size-[17px]" /></a>
          <a href="https://wa.me/919002156266?text=Hello%20Rabines%20Stores%2C%20I%27d%20like%20to%20request%20a%20quote." target="_blank" rel="noreferrer" className="group flex h-10 items-center gap-2 bg-[#ef6b32] px-4 text-[12px] font-bold uppercase tracking-[0.09em] text-[#14191d] transition-colors hover:bg-[#ff8750]">
            Request a quote <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="grid size-11 place-items-center border border-white/15 text-white lg:hidden">
          {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      <div className="hidden border-t border-white/5 bg-[#0c1115] px-5 py-2 text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400 sm:block">
        Precision tooling · industrial supply · pan-India dispatch
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full border-b border-white/10 bg-[#11171c] p-5 shadow-2xl lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {links.map((link, index) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className={`py-4 text-sm font-medium text-slate-200 transition-colors hover:text-[#ff7b3c] ${index !== links.length - 1 ? "border-b border-white/10" : ""}`}>
                {link.label}
              </a>
            ))}
          </nav>
          <a href="https://wa.me/919002156266?text=Hello%20Rabines%20Stores%2C%20I%27d%20like%20to%20request%20a%20quote." className="mt-5 flex h-12 items-center justify-center gap-2 bg-[#ef6b32] text-sm font-bold uppercase tracking-wider text-[#14191d]">
            Request a quote <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      )}
    </header>
  );
}
