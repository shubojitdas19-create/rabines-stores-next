"use client";

import { useState } from "react";
import Image from "next/image";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Shop", href: "/shop/tool-holders" },
  { label: "Products & tools", href: "/#products" },
  { label: "CNC services", href: "/#services" },
  { label: "Engineering support", href: "/#engineering" },
  { label: "About Rabines", href: "/#about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-white/10 bg-[#11171c] text-white">
      <div className="mx-auto flex h-[78px] max-w-[1800px] items-center justify-between gap-4 px-4 sm:px-7 xl:px-14">
        <a href="/#top" aria-label="Rabines Stores home" className="flex shrink-0 items-center">
          <Image src="/images/rabines-logo.png" alt="Rabines Stores" width={78} height={76} priority className="h-[70px] w-[70px] object-contain" />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex 2xl:gap-8">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-[13px] font-medium text-slate-300 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex xl:hidden">
          <nav aria-label="Main navigation" className="flex items-center gap-4">
            {links.slice(0, 3).map((link) => (
              <a key={link.label} href={link.href} className="text-xs font-medium text-slate-300 transition-colors hover:text-white">{link.label}</a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center lg:flex">
          <LeadRequestDialog label="Request a quote" className="group flex h-10 items-center gap-2 bg-[#ef6b32] px-4 text-[12px] font-bold uppercase tracking-[0.09em] text-[#14191d] transition-colors hover:bg-[#ff8750]" />
        </div>

        <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="grid size-11 place-items-center border border-white/15 text-white lg:hidden">
          {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
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
          <LeadRequestDialog label="Request a quote" className="mt-5 flex h-12 w-full items-center justify-center gap-2 bg-[#ef6b32] text-sm font-bold uppercase tracking-wider text-[#14191d] transition-colors hover:bg-[#ff8750]" />
        </div>
      )}
    </header>
  );
}
