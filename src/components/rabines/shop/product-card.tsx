"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: CatalogProduct }) {
  const keySpecs = product.specs.slice(0, 2);

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#d9dddf] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ef6b32] hover:shadow-[0_12px_30px_rgba(17,23,28,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e7e9e9]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 639px) 92vw, (max-width: 1279px) 45vw, 28vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        />
        <span className="absolute left-3 top-3 border border-black/10 bg-white/95 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[#3e4549]">
          {product.category}
        </span>
        <span className={`absolute right-3 top-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] ${product.inStock ? "bg-[#e5eee8]/95 text-[#315b43]" : "bg-white/95 text-[#737a7e]"}`}>
          <span aria-hidden="true" className={`size-1.5 rounded-full ${product.inStock ? "bg-[#4e8a63]" : "bg-[#939a9e]"}`} />
          {product.inStock ? "In stock" : "Backorder"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#81898d]">SKU {product.sku}</p>
          <h2 className="mt-2 min-h-[3.25rem] text-[15px] font-semibold leading-[1.55] tracking-[-0.02em] text-[#171d21] sm:text-base">
            <Link href={`/shop/tool-holders/${product.id}`} className="transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {product.name}
            </Link>
          </h2>
        </div>

        {keySpecs.length > 0 && (
          <dl className="mt-4 grid grid-cols-2 gap-2">
            {keySpecs.map((spec) => (
              <div key={spec.label} className="min-w-0 border-l-2 border-[#e4e7e8] bg-[#f6f7f7] px-2.5 py-2">
                <dt className="truncate font-mono text-[8px] uppercase tracking-[0.08em] text-[#81898d]">{spec.label}</dt>
                <dd className="mt-1 truncate text-[11px] font-medium text-[#343c40]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3 border-t border-[#e6e8e9] pt-3.5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#858c90]">Sample price</p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-[#171d21]">{priceFormatter.format(product.price)}</p>
            </div>
            <p className="max-w-[7rem] text-right text-[10px] leading-4 text-[#7a8286]">{product.priceUnit}</p>
          </div>

          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Link href={`/shop/tool-holders/${product.id}`} className="inline-flex min-h-11 items-center justify-between gap-2 bg-[#171e23] px-3 text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#29343a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              Product details <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-primary" />
            </Link>
            <ProductSpecsDialog product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductSpecsDialog({ product }: { product: CatalogProduct }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`View specifications for ${product.name}`}
          className="inline-flex min-h-11 items-center justify-center border border-[#d9dddf] bg-white px-3 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#343c40] transition-colors hover:border-[#171d21] hover:text-[#171d21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Quick specs
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#081014]/75 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85dvh] w-[min(92vw,38rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-white/10 bg-[#11171c] text-white shadow-2xl focus:outline-none">
          <div className="flex items-start justify-between gap-6 border-b border-white/10 p-5 sm:p-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">{product.category} · Sample catalog</p>
              <Dialog.Title className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{product.name}</Dialog.Title>
              <Dialog.Description className="mt-2 font-mono text-xs text-slate-400">SKU {product.sku}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close product specifications" className="grid size-10 shrink-0 place-items-center border border-white/15 text-slate-300 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <X aria-hidden="true" className="size-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="p-5 sm:p-7">
            <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="border-b border-white/10 py-3">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{spec.label}</dt>
                  <dd className="mt-1 text-sm text-slate-200">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-5 text-slate-400">Demonstration specifications only. Confirm the exact grade, dimensions, pricing, and availability with Rabines Stores before ordering.</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
