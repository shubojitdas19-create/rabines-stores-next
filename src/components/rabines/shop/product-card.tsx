"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/api/client";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const imageUrl = product.media && product.media.length > 0 ? product.media[0].url : "/images/categories/shop-cnc-turning-inserts.png";
  const categoryName = product.category?.name || "CNC Tooling";
  const price = typeof product.basePrice === "number" ? product.basePrice : parseFloat(product.basePrice || "0");
  const inStock = product.inStock ?? true;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      variantId: product.variants && product.variants.length > 0 ? product.variants[0].id : undefined,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: price,
      image: imageUrl,
      category: categoryName,
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[#e0e3e2] bg-white transition-shadow duration-200 hover:shadow-[0_10px_26px_rgba(17,23,28,0.09)]">
      <Link href={`/shop/tool-holders/${product.slug || product.id}`} aria-label={`View ${product.name}`} className="relative block aspect-square overflow-hidden bg-[#eceeed]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 48vw, (max-width: 1023px) 31vw, 23vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-[#596166] sm:left-3 sm:top-3 sm:text-[9px]">
          {categoryName}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div>
          <h3 className="line-clamp-2 min-h-[2.7rem] text-[12px] font-semibold leading-[1.4] tracking-[-0.015em] text-[#171d21] sm:min-h-[3rem] sm:text-[15px]">
            <Link href={`/shop/tool-holders/${product.slug || product.id}`} className="transition-colors hover:text-[#ef6b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[10px] leading-4 text-[#7a8286] sm:text-xs">
            Make: <span className="font-medium text-[#4c555a]">{product.brand || "Rabines Precision"}</span>
          </p>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-end justify-between gap-1.5 border-t border-[#eceeed] pt-2.5 sm:gap-2 sm:pt-3">
            <div className="min-w-0">
              <p className="text-[8px] text-[#858c90] sm:text-[9px]">Price</p>
              <p className="mt-0.5 text-[16px] font-semibold tracking-[-0.04em] text-[#171d21] sm:text-xl">
                {priceFormatter.format(price)}
              </p>
            </div>
            {product.sku && (
              <p className="max-w-[7rem] truncate text-right font-mono text-[8px] leading-3.5 text-[#7a8286] sm:text-[9px]">
                {product.sku}
              </p>
            )}
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-1.5">
            <span className={`inline-flex min-w-0 items-center gap-1 text-[8px] font-medium sm:text-[10px] ${inStock ? "text-[#487453]" : "text-[#727a7e]"}`}>
              <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${inStock ? "bg-[#5d996a]" : "bg-[#9ba2a5]"}`} />
              {inStock ? "In stock" : "Backorder"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
                className="inline-flex size-9 sm:size-10 items-center justify-center rounded-md border border-[#d9dddf] bg-white text-[#171d21] transition-colors hover:border-[#ef6b32] hover:text-[#ef6b32]"
              >
                <ShoppingBag className="size-3.5" />
              </button>
              <Link
                href={`/shop/tool-holders/${product.slug || product.id}`}
                className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-md bg-[#171e23] px-2.5 text-[8px] font-semibold text-white transition-colors hover:bg-[#ef6b32] hover:text-[#11171c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-10 sm:px-3 sm:text-[10px]"
              >
                View <ArrowRight aria-hidden="true" className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
