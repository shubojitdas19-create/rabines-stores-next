import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

export function ProductPurchasePanel({ product }: { product: CatalogProduct }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#252d32]">Availability</p>
        <span className={`inline-flex items-center gap-2 text-sm font-medium ${product.inStock ? "text-[#487453]" : "text-[#727a7e]"}`}>
          <span aria-hidden="true" className={`size-2 rounded-full ${product.inStock ? "bg-[#5d996a]" : "bg-[#9ba2a5]"}`} />
          {product.inStock ? "In stock" : "Backorder"}
        </span>
      </div>

      <LeadRequestDialog
        label="Ask about this product"
        ariaLabel={`Ask about ${product.name}`}
        defaultProduct={`${product.name} · SKU ${product.sku}`}
        showArrow
        className="mt-4 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-md bg-primary px-4 text-sm font-semibold text-[#171d21] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
      <p className="mt-3 text-[11px] leading-5 text-[#858c90]">This is a sample catalog. Confirm the make, price, and availability with Rabines Stores before ordering.</p>
    </div>
  );
}
