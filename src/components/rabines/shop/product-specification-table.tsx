import { ChevronDown } from "lucide-react";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

export function ProductSpecificationTable({ product }: { product: CatalogProduct }) {
  if (product.specs.length === 0) return null;

  return (
    <details className="group overflow-hidden rounded-md border border-[#e0e3e2] bg-white">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-5">
        <span>
          <span className="block text-sm font-semibold text-[#252d32]">Product details</span>
          <span className="mt-0.5 block text-xs text-[#858c90]">Specifications and extra information</span>
        </span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-[#7a8286] transition-transform group-open:rotate-180" />
      </summary>

      <dl className="grid gap-x-8 border-t border-[#eceeed] px-4 sm:grid-cols-2 sm:px-5">
        {product.specs.map((specification) => (
          <div key={specification.label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 border-b border-[#eceeed] py-3 last:border-b-0 sm:gap-4">
            <dt className="text-xs text-[#7a8286]">{specification.label}</dt>
            <dd className="text-right text-xs font-medium text-[#343c40]">{specification.value}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-[#eceeed] bg-[#f8f9f8] px-4 py-3 text-[10px] leading-5 text-[#858c90] sm:px-5">
        Values are illustrative sample data. Confirm product details with Rabines Stores before ordering.
      </p>
    </details>
  );
}
