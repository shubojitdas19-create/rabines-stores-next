"use client";

import { useState } from "react";
import { LeadRequestDialog } from "@/components/rabines/lead-request-dialog";
import { MessageCircle, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/api/client";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = typeof product.basePrice === "number" ? product.basePrice : parseFloat(product.basePrice || "0");
  const inStock = product.inStock ?? true;
  const imageUrl = product.media && product.media.length > 0 ? product.media[0].url : "/images/categories/shop-cnc-turning-inserts.png";

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        variantId: product.variants && product.variants.length > 0 ? product.variants[0].id : undefined,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        price,
        image: imageUrl,
        category: product.category?.name,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = `Hello Rabines Stores, I would like to inquire about ${product.name} (SKU: ${product.sku || "N/A"}) at ${priceFormatter.format(price)}. Please share availability and bulk pricing.`;

  return (
    <div className="space-y-5">
      {/* Stock and Price */}
      <div className="flex items-center justify-between border-b border-[#eceeed] pb-4">
        <div>
          <span className="text-xs text-[#7a8286]">Current Price</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-mono text-3xl font-bold text-[#171d21]">
              {priceFormatter.format(price)}
            </span>
            {product.discountPrice && (
              <span className="font-mono text-sm text-[#7a8286] line-through">
                {priceFormatter.format(Number(product.discountPrice))}
              </span>
            )}
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${inStock ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          <span className={`size-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-slate-400"}`} />
          {inStock ? "In Stock" : "On Request"}
        </span>
      </div>

      {/* Quantity & Add to Cart */}
      <div>
        <label className="block text-xs font-medium text-[#7a8286] mb-2">Order Quantity</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-[#d9dddf] rounded bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="grid size-11 place-items-center text-[#596166] hover:bg-[#f3f4f2]"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-[44px] text-center font-mono text-sm font-semibold text-[#171d21]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="grid size-11 place-items-center text-[#596166] hover:bg-[#f3f4f2]"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex h-11 items-center justify-center gap-2 rounded bg-[#ef6b32] px-5 text-xs font-bold uppercase tracking-wider text-[#11171c] shadow transition-colors hover:bg-[#ff8750]"
          >
            <ShoppingBag className="size-4" />
            {added ? "Added to Cart ✓" : `Add to Cart · ${priceFormatter.format(price * quantity)}`}
          </button>
        </div>
      </div>

      {/* WhatsApp / B2B Quote Action */}
      <div className="pt-2 border-t border-[#eceeed]">
        <p className="text-xs text-[#7a8286] mb-2">For Bulk B2B Orders or Special Requirements:</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <a
            href={`https://wa.me/919002156266?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center gap-2 rounded border border-[#25D366] text-xs font-semibold text-[#1c8340] hover:bg-[#25D366]/10 transition-colors"
          >
            <MessageCircle className="size-4 text-[#25D366]" />
            Quote via WhatsApp
          </a>

          <LeadRequestDialog
            label="Request Specs RFQ"
            ariaLabel={`Ask about ${product.name}`}
            defaultProduct={`${product.name} (SKU: ${product.sku || "N/A"})`}
            showArrow
            className="flex h-10 items-center justify-center gap-2 rounded border border-[#d9dddf] text-xs font-semibold text-[#596166] hover:border-[#171d21] hover:text-[#171d21] transition-colors"
          />
        </div>
      </div>

      {/* Dispatch Notes */}
      <div className="rounded bg-[#f8f9f8] p-3 text-[11px] text-[#7a8286] space-y-1">
        <div className="flex items-center gap-1.5 font-medium text-[#343c40]">
          <Truck className="size-3.5 text-[#ef6b32]" />
          <span>Same-Day Dispatch from Howrah Hub</span>
        </div>
        <p>GST input tax credit invoice included with every order. Cash on Delivery (COD) supported pan-India.</p>
      </div>
    </div>
  );
}
