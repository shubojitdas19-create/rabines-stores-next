"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

export function ProductImageGallery({ product }: { product: CatalogProduct }) {
  return (
    <div>
      <Dialog.Root>
        <div className="relative aspect-[4/3] overflow-hidden border border-[#d9dddf] bg-[#e8ebeb]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-3 top-3 border border-black/10 bg-white/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.13em] text-[#3e4549]">{product.category}</span>
          <Dialog.Trigger asChild>
            <button type="button" aria-label={`Zoom product image of ${product.name}`} className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-2 border border-black/10 bg-white/95 px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#252d32] shadow-sm transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Expand aria-hidden="true" className="size-4" /> Zoom image
            </button>
          </Dialog.Trigger>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Dialog.Trigger asChild>
            <button type="button" aria-label={`Open enlarged view of ${product.name}`} aria-current="true" className="relative size-[68px] shrink-0 overflow-hidden border-2 border-primary bg-[#e8ebeb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Image src={product.image} alt="" fill sizes="68px" className="object-cover" />
            </button>
          </Dialog.Trigger>
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4d565b]">01 <span className="text-[#92999d]">/ 01</span></p>
            <p className="mt-1 text-xs text-[#7a8286]">Product view · Select to enlarge</p>
          </div>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[#081014]/85 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-3 z-50 flex flex-col border border-white/15 bg-[#11171c] p-3 text-white shadow-2xl sm:inset-8 sm:p-5 lg:inset-12">
            <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
              <div>
                <Dialog.Title className="text-sm font-semibold sm:text-base">{product.name}</Dialog.Title>
                <Dialog.Description className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-slate-400">SKU {product.sku} · Enlarged product view</Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button type="button" aria-label="Close image zoom" className="grid size-10 shrink-0 place-items-center border border-white/20 text-slate-300 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <X aria-hidden="true" className="size-4" />
                </button>
              </Dialog.Close>
            </div>
            <div className="relative min-h-0 flex-1 bg-[#e8ebeb]">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="96vw"
                className="object-contain"
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
