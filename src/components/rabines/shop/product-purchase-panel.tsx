"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

export function ProductPurchasePanel({ product }: { product: CatalogProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartNotice, setCartNotice] = useState("");

  function addToCart() {
    setCartQuantity((current) => current + quantity);
    setCartNotice(`${quantity} ${quantity === 1 ? "item" : "items"} added to the demo cart. No order has been placed.`);
  }

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#858c90]">Sample price</p>
          <p className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[#171d21]">₹{product.price.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs text-[#7a8286]">{product.priceUnit}</p>
        </div>
        <label className="shrink-0 text-right" htmlFor={`product-quantity-${product.id}`}>
          <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.1em] text-[#7a8286]">Quantity</span>
          <input
            id={`product-quantity-${product.id}`}
            aria-label={`Quantity of ${product.name}`}
            className="h-11 w-[5.25rem] border border-[#d0d5d7] bg-white px-2 text-center text-sm text-[#252d32] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            type="number"
            min="1"
            max="9999"
            step="1"
            inputMode="numeric"
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Math.min(9999, Number(event.target.value) || 1)))}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <button type="button" onClick={addToCart} className="group inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-bold uppercase tracking-[0.09em] text-[#11171c] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <ShoppingCart aria-hidden="true" className="size-4" /> Add to Cart{cartQuantity > 0 ? ` (${cartQuantity})` : ""}
        </button>
        <LeadRequestDialog
          label="WhatsApp Quote / Bulk Inquiry"
          ariaLabel={`Request a WhatsApp quote for ${product.name}`}
          defaultProduct={`${product.name} · SKU ${product.sku}`}
          showArrow
          className="group inline-flex min-h-12 items-center justify-center gap-2 border border-[#252d32] bg-[#171e23] px-3 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {cartNotice && (
        <p role="status" aria-live="polite" className="mt-3 flex items-start gap-2 border border-[#d9dddf] bg-[#f5f6f6] px-3 py-2.5 text-xs leading-5 text-[#4c565b]">
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#3d7554]" /> {cartNotice}
        </p>
      )}
      <p className="mt-3 text-[10px] leading-4 text-[#858c90]">Sample catalog only. Confirm price, exact dimensions, and availability before ordering.</p>
    </div>
  );
}
