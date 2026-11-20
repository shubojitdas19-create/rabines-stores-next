"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, totalItems, clearCart } = useCart();

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-[#f3f4f2] text-[#171d21]">
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-[#7a8286] sm:gap-2">
              <li>
                <Link href="/#top" className="transition-colors hover:text-[#171d21]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3" />
              </li>
              <li>
                <Link href="/shop/tool-holders" className="transition-colors hover:text-[#171d21]">
                  Shop
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3" />
              </li>
              <li aria-current="page" className="font-medium text-[#343c40]">
                Shopping Cart
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-[#e0e3e2] pb-5">
            <div>
              <p className="text-xs font-medium text-[#7a8286]">Tooling Order Review</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#171d21] sm:text-4xl">
                Your Tooling Cart
              </h1>
            </div>
            <p className="text-xs font-mono text-[#7a8286]">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center rounded-md border border-[#e0e3e2] bg-white p-12 text-center">
              <div className="grid size-16 place-items-center rounded-full bg-[#f3f4f2] text-[#7a8286]">
                <ShoppingBag className="size-8" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#171d21]">Your cart is currently empty</h2>
              <p className="mt-2 max-w-md text-sm text-[#7a8286]">
                Add carbide inserts, tool holders, boring bars or collets to configure your order.
              </p>
              <Link
                href="/shop/tool-holders"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-[#ef6b32] px-6 text-xs font-bold uppercase tracking-wider text-[#11171c] transition-colors hover:bg-[#ff8750]"
              >
                Explore Tool Catalog
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* Items List */}
              <div className="rounded-md border border-[#e0e3e2] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-[#eceeed] pb-4">
                  <h2 className="text-sm font-semibold text-[#171d21]">Configured Items</h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <ul className="divide-y divide-[#eceeed]">
                  {cart.map((item) => (
                    <li key={item.id} className="grid gap-4 py-5 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                      <div className="relative aspect-square size-20 overflow-hidden rounded bg-[#f3f4f2] border border-[#e0e3e2]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <Link
                          href={`/shop/tool-holders/${item.slug || item.id}`}
                          className="font-semibold text-sm text-[#171d21] hover:text-[#ef6b32] transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.sku && (
                          <p className="mt-1 font-mono text-[11px] uppercase text-[#7a8286]">
                            SKU: {item.sku}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-[#7a8286]">
                          Unit: {priceFormatter.format(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                        <div className="flex items-center border border-[#d9dddf] rounded bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="grid size-8 place-items-center text-[#596166] hover:bg-[#f3f4f2]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-[32px] text-center font-mono text-xs font-semibold text-[#171d21]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="grid size-8 place-items-center text-[#596166] hover:bg-[#f3f4f2]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-semibold text-[#171d21]">
                            {priceFormatter.format(item.price * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#7a8286] hover:text-red-600 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="h-fit rounded-md border border-[#e0e3e2] bg-white p-5 sm:p-6">
                <h2 className="text-base font-semibold text-[#171d21] border-b border-[#eceeed] pb-4">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-[#596166]">
                    <span>Items Subtotal</span>
                    <span className="font-mono font-medium text-[#171d21]">
                      {priceFormatter.format(cartTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#596166]">
                    <span>Shipping Estimate</span>
                    <span className="font-mono font-medium text-[#171d21]">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="border-t border-[#eceeed] pt-3 flex justify-between text-sm font-semibold text-[#171d21]">
                    <span>Estimated Total</span>
                    <span className="font-mono text-lg text-[#ef6b32]">
                      {priceFormatter.format(cartTotal)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/checkout"
                    className="flex h-12 w-full items-center justify-center gap-2 bg-[#ef6b32] px-4 text-xs font-bold uppercase tracking-wider text-[#11171c] transition-colors hover:bg-[#ff8750]"
                  >
                    Proceed to Checkout <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/shop/tool-holders"
                    className="flex h-10 w-full items-center justify-center border border-[#d9dddf] text-xs font-semibold text-[#596166] hover:text-[#171d21] hover:border-[#171d21] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 border-t border-[#eceeed] pt-4 text-[11px] text-[#7a8286] space-y-1.5">
                  <p>✓ All India Dispatch directly from Howrah tool hub</p>
                  <p>✓ Cash on Delivery (COD) &amp; GST Invoicing available</p>
                  <p>✓ Technical fit guarantee before dispatch</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <MainFooter />
    </>
  );
}
