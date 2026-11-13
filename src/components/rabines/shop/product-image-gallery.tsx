"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

export function ProductImageGallery({ product }: { product: CatalogProduct }) {
  return (
    <Dialog.Root>
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#e8ebeb]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
        <Dialog.Trigger asChild>
          <button type="button" aria-label={`View a larger image of ${product.name}`} className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white/95 text-[#252d32] shadow-sm transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <Expand aria-hidden="true" className="size-4" />
          </button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#081014]/85 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-3 z-50 flex flex-col rounded-md border border-white/15 bg-[#11171c] p-3 text-white shadow-2xl outline-none sm:inset-8 sm:p-5 lg:inset-12">
          <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
            <div>
              <Dialog.Title className="text-sm font-semibold sm:text-base">{product.name}</Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-slate-400">Product image</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close image" className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 text-slate-300 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <X aria-hidden="true" className="size-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded bg-[#e8ebeb]">
            <Image src={product.image} alt={product.imageAlt} fill sizes="96vw" className="object-contain" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
