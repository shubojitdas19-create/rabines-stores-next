"use client";

import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, totalItems } = useCart();

  return (
    <Dialog.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col border-l border-white/10 bg-[#141b20] text-white shadow-2xl focus:outline-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="size-5 text-[#ef6b32]" />
              <Dialog.Title className="text-base font-semibold tracking-tight text-white">
                Shopping Cart ({totalItems})
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close cart"
                className="grid size-9 place-items-center border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="grid size-14 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-400">
                  <ShoppingBag className="size-7" />
                </div>
                <p className="mt-4 text-base font-medium text-white">Your cart is empty</p>
                <p className="mt-1 text-xs text-slate-400">
                  Explore CNC tool holders, carbide inserts, and machine spares.
                </p>
                <Link
                  href="/shop/tool-holders"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-flex h-10 items-center justify-center gap-2 bg-[#ef6b32] px-5 text-xs font-bold uppercase tracking-wider text-[#11171c] transition-colors hover:bg-[#ff8750]"
                >
                  Browse Tools
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-white/10">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="relative size-18 shrink-0 overflow-hidden rounded bg-[#1e272e] border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/shop/tool-holders/${item.slug || item.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="line-clamp-1 text-sm font-semibold text-white transition-colors hover:text-[#ef6b32]"
                          >
                            {item.name}
                          </Link>
                          {item.sku && (
                            <p className="font-mono text-[10px] uppercase text-slate-400">
                              SKU: {item.sku}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-slate-400 transition-colors hover:text-red-400"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-white/15 bg-[#0e1418]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="grid size-7 place-items-center text-slate-300 hover:bg-white/10"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-[28px] text-center font-mono text-xs font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="grid size-7 place-items-center text-slate-300 hover:bg-white/10"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <p className="font-mono text-sm font-semibold text-[#ef6b32]">
                          {priceFormatter.format(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 bg-[#0d1317] p-5 sm:p-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-base font-semibold text-white">
                  {priceFormatter.format(cartTotal)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Shipping &amp; GST calculated at checkout.
              </p>

              <div className="mt-4 flex flex-col gap-2.5">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex h-12 w-full items-center justify-center gap-2 bg-[#ef6b32] px-4 text-xs font-bold uppercase tracking-wider text-[#11171c] transition-colors hover:bg-[#ff8750]"
                >
                  Proceed to Checkout <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex h-10 w-full items-center justify-center border border-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/5"
                >
                  View Full Cart
                </Link>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
