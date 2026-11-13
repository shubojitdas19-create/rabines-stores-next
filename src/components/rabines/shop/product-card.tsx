import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";
import { getProductMake } from "@/components/rabines/shop/catalog-data";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[#e0e3e2] bg-white transition-shadow duration-200 hover:shadow-[0_10px_26px_rgba(17,23,28,0.09)]">
      <Link href={`/shop/tool-holders/${product.id}`} aria-label={`View ${product.name}`} className="relative block aspect-square overflow-hidden bg-[#eceeed]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 639px) 48vw, (max-width: 1023px) 31vw, 23vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-[#596166] sm:left-3 sm:top-3 sm:text-[9px]">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div>
          <h3 className="line-clamp-2 min-h-[2.7rem] text-[12px] font-semibold leading-[1.4] tracking-[-0.015em] text-[#171d21] sm:min-h-[3rem] sm:text-[15px]">
            <Link href={`/shop/tool-holders/${product.id}`} className="transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[10px] leading-4 text-[#7a8286] sm:text-xs">
            Make: <span className="font-medium text-[#4c555a]">{getProductMake(product)}</span>
          </p>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-end justify-between gap-1.5 border-t border-[#eceeed] pt-2.5 sm:gap-2 sm:pt-3">
            <div className="min-w-0">
              <p className="text-[8px] text-[#858c90] sm:text-[9px]">Sample price</p>
              <p className="mt-0.5 text-[16px] font-semibold tracking-[-0.04em] text-[#171d21] sm:text-xl">{priceFormatter.format(product.price)}</p>
            </div>
            <p className="max-w-[5.5rem] text-right text-[8px] leading-3.5 text-[#7a8286] sm:text-[10px] sm:leading-4">{product.priceUnit}</p>
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-1.5">
            <span className={`inline-flex min-w-0 items-center gap-1 text-[8px] font-medium sm:text-[10px] ${product.inStock ? "text-[#487453]" : "text-[#727a7e]"}`}>
              <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${product.inStock ? "bg-[#5d996a]" : "bg-[#9ba2a5]"}`} />
              {product.inStock ? "In stock" : "Backorder"}
            </span>
            <Link href={`/shop/tool-holders/${product.id}`} className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-md bg-[#171e23] px-2.5 text-[8px] font-semibold text-white transition-colors hover:bg-[#29343a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-10 sm:px-3 sm:text-[10px]">
              View <ArrowRight aria-hidden="true" className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
