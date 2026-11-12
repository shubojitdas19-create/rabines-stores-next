"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="group overflow-hidden border border-[#d9dddf] bg-white transition-colors duration-200 hover:border-primary">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e7e9e9]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 639px) 92vw, (max-width: 1279px) 45vw, 28vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        />
        <span className="absolute left-3 top-3 border border-black/10 bg-white/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.13em] text-[#3e4549]">
          {product.category}
        </span>
        <span
          className={`absolute right-3 top-3 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] ${product.inStock ? "bg-[#e5eee8]/95 text-[#315b43]" : "bg-white/90 text-[#737a7e]"}`}
        >
          {product.inStock ? "In stock" : "Backorder"}
        </span>

        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-200 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          <ProductSpecsDialog product={product} />
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-[0.08em] text-[#7a8286]">SKU {product.sku}</p>
        <h2 className="mt-2 min-h-[3rem] text-[15px] font-semibold leading-6 tracking-[-0.02em] text-[#171d21]">
          <Link href={`/shop/tool-holders/${product.id}`} className="transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {product.name}
          </Link>
        </h2>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#e6e8e9] pt-3.5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#858c90]">Sample price</p>
            <p className="mt-1 text-[18px] font-semibold tracking-tight text-[#171d21]">{priceFormatter.format(product.price)}</p>
          </div>
          <p className="max-w-[6rem] text-right text-[10px] leading-4 text-[#7a8286]">{product.priceUnit}</p>
        </div>
        <Link href={`/shop/tool-holders/${product.id}`} className="mt-3 flex min-h-10 items-center justify-between border-t border-[#e6e8e9] pt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-[#343c40] transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Full product details <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
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
          className="flex w-full items-center justify-between bg-primary px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#14191d] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>View Specs</span>
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#081014]/75 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[min(92vw,38rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-white/10 bg-[#11171c] text-white shadow-2xl focus:outline-none">
          <div className="flex items-start justify-between gap-6 border-b border-white/10 p-5 sm:p-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">{product.category} · Sample catalog</p>
              <Dialog.Title className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{product.name}</Dialog.Title>
              <Dialog.Description className="mt-2 font-mono text-xs text-slate-400">SKU {product.sku}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close product specifications"
                className="grid size-9 shrink-0 place-items-center border border-white/15 text-slate-300 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
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
            <p className="mt-5 text-xs leading-5 text-slate-400">
              Demonstration specifications only. Confirm the exact grade, dimensions, pricing, and availability with Rabines Stores before ordering.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
