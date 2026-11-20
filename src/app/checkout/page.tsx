"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, CreditCard, Loader2, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";
import { getStoreSettings, StoreSettings } from "@/lib/api/client";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

type RazorpayInstance = {
  open: () => void;
  on: (event: string, callback: (res: { error?: { description?: string } }) => void) => void;
};

interface RazorpayWindow extends Window {
  Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
}

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    const win = window as unknown as RazorpayWindow;
    if (win.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const { cart, clearCart, cartTotal, totalItems } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    totalAmount: number;
    paymentMethod: string;
  } | null>(null);

  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: "Rabines Stores",
    currency: "INR",
    isCodEnabled: true,
    paymentProvider: "none",
    flatShippingRate: 150,
  });

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    companyName: "",
    addressLine: "",
    city: "Howrah",
    state: "West Bengal",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getStoreSettings();
        setStoreSettings(settings);
        if (!settings.isCodEnabled && settings.paymentProvider !== "none") {
          setPaymentMethod("ONLINE");
        } else {
          setPaymentMethod("COD");
        }
      } catch (e) {
        console.warn("Failed to load store settings", e);
      }
    }
    loadSettings();
  }, []);

  const shippingRate = Number(storeSettings.flatShippingRate || 150);
  const finalTotal = cartTotal + shippingRate;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const fullAddress = [
        formData.companyName ? `Company: ${formData.companyName}` : "",
        formData.addressLine,
        formData.city,
        `${formData.state} - ${formData.pincode}`,
      ]
        .filter(Boolean)
        .join(", ");

      const payload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: fullAddress,
        totalAmount: finalTotal,
        paymentMethod: paymentMethod,
        items: cart.map((item) => ({
          productId: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || "rabines-stores";

      const res = await fetch(`${backendUrl}/api/storefront/${storeSlug}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Checkout failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Handle Razorpay Online payment
      if (paymentMethod === "ONLINE" && data.razorpayOrderId) {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          alert("Failed to load payment gateway. Please check your internet connection.");
          setIsSubmitting(false);
          return;
        }

        const options = {
          key: data.gatewayKeyId,
          amount: Math.round(finalTotal * 100),
          currency: "INR",
          name: storeSettings.storeName || "Rabines Stores",
          description: `Order ${data.orderNumber}`,
          order_id: data.razorpayOrderId,
          handler: function () {
            setOrderSuccess({
              orderNumber: data.orderNumber,
              totalAmount: finalTotal,
              paymentMethod: "ONLINE (Paid)",
            });
            clearCart();
            setIsSubmitting(false);
          },
          prefill: {
            name: formData.customerName,
            email: formData.customerEmail,
            contact: formData.customerPhone,
          },
          theme: { color: "#ef6b32" },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            },
          },
        };

        const win = window as unknown as RazorpayWindow;
        if (!win.Razorpay) {
          alert("Payment gateway constructor unavailable.");
          setIsSubmitting(false);
          return;
        }

        const rzp = new win.Razorpay(options);
        rzp.on("payment.failed", function (response: { error?: { description?: string } }) {
          alert(`Payment failed: ${response.error?.description || "Unknown error"}`);
          setIsSubmitting(false);
        });
        rzp.open();
        return;
      }

      // Cash on Delivery success
      setOrderSuccess({
        orderNumber: data.orderNumber,
        totalAmount: finalTotal,
        paymentMethod: "Cash on Delivery (COD)",
      });
      clearCart();
    } catch (error) {
      console.error("Checkout submission failed", error);
      alert("Failed to process order. Please verify connection to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-[75vh] bg-[#f3f4f2] text-[#171d21]">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {orderSuccess ? (
            /* Order Success View */
            <div className="mx-auto max-w-xl rounded-md border border-[#e0e3e2] bg-white p-6 sm:p-10 text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="size-9" />
              </div>
              <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Order Placed Successfully
              </p>
              <h1 className="mt-1 text-2xl font-bold text-[#171d21] sm:text-3xl">
                Thank You for Your Order!
              </h1>
              <p className="mt-2 text-sm text-[#7a8286]">
                Your tool order has been received and registered directly in our Howrah dispatch queue.
              </p>

              <div className="mt-6 rounded-md border border-[#eceeed] bg-[#f8f9f8] p-4 text-left">
                <div className="flex justify-between text-xs py-1 border-b border-[#eceeed]">
                  <span className="text-[#7a8286]">Order Reference:</span>
                  <span className="font-mono font-semibold text-[#171d21]">{orderSuccess.orderNumber}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-[#eceeed]">
                  <span className="text-[#7a8286]">Payment Mode:</span>
                  <span className="font-medium text-[#171d21]">{orderSuccess.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-[#7a8286]">Total Amount:</span>
                  <span className="font-mono font-bold text-[#ef6b32]">
                    {priceFormatter.format(orderSuccess.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={`https://wa.me/919002156266?text=${encodeURIComponent(
                    `Hello Rabines Stores, I placed Order #${orderSuccess.orderNumber} for ${priceFormatter.format(
                      orderSuccess.totalAmount
                    )}. Please confirm dispatch timeline.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 bg-[#25D366] px-5 text-xs font-bold text-white uppercase tracking-wider rounded transition-colors hover:bg-[#20ba59]"
                >
                  Confirm on WhatsApp
                </a>
                <Link
                  href="/shop/tool-holders"
                  className="inline-flex h-11 items-center justify-center border border-[#d9dddf] px-5 text-xs font-semibold text-[#596166] hover:text-[#171d21] hover:border-[#171d21] rounded transition-colors"
                >
                  Return to Store
                </Link>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart Redirect View */
            <div className="mx-auto max-w-md rounded-md border border-[#e0e3e2] bg-white p-8 text-center">
              <h2 className="text-xl font-semibold text-[#171d21]">No items in checkout</h2>
              <p className="mt-2 text-sm text-[#7a8286]">
                Please add products to your cart before proceeding to checkout.
              </p>
              <Link
                href="/shop/tool-holders"
                className="mt-6 inline-flex h-11 items-center justify-center bg-[#ef6b32] px-6 text-xs font-bold uppercase tracking-wider text-[#11171c] hover:bg-[#ff8750]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            /* Checkout Form */
            <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
              {/* Customer and Shipping Details Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-md border border-[#e0e3e2] bg-white p-5 sm:p-7">
                  <div className="flex items-center gap-2 border-b border-[#eceeed] pb-4">
                    <Truck className="size-5 text-[#ef6b32]" />
                    <h2 className="text-base font-semibold text-[#171d21]">
                      1. Workshop &amp; Delivery Information
                    </h2>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="e.g. Ramesh Chandra"
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9+() .-]{10,20}"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        placeholder="+91 98000 00000"
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        Email Address (for Invoicing) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        placeholder="workshop@company.com"
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        Company / Workshop Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Howrah Precision Engineering Works"
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        Factory / Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.addressLine}
                        onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                        placeholder="Plot No, Industrial Estate, Street"
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#596166] mb-1">
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="711101"
                        className="h-11 w-full rounded border border-[#d9dddf] px-3 text-sm text-[#171d21] outline-none focus:border-[#ef6b32]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="rounded-md border border-[#e0e3e2] bg-white p-5 sm:p-7">
                  <div className="flex items-center gap-2 border-b border-[#eceeed] pb-4">
                    <CreditCard className="size-5 text-[#ef6b32]" />
                    <h2 className="text-base font-semibold text-[#171d21]">
                      2. Payment Method
                    </h2>
                  </div>

                  <div className="mt-4 space-y-3">
                    {storeSettings.isCodEnabled && (
                      <label className={`flex cursor-pointer items-start gap-3 rounded border p-4 transition-colors ${paymentMethod === "COD" ? "border-[#ef6b32] bg-orange-50/20" : "border-[#d9dddf] hover:border-[#171d21]"}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                          className="mt-1 accent-[#ef6b32]"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#171d21]">
                            Cash on Delivery (COD)
                          </p>
                          <p className="mt-0.5 text-xs text-[#7a8286]">
                            Pay via Cash or UPI upon receiving the tooling package at your workshop.
                          </p>
                        </div>
                      </label>
                    )}

                    {storeSettings.paymentProvider !== "none" && (
                      <label className={`flex cursor-pointer items-start gap-3 rounded border p-4 transition-colors ${paymentMethod === "ONLINE" ? "border-[#ef6b32] bg-orange-50/20" : "border-[#d9dddf] hover:border-[#171d21]"}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ONLINE"
                          checked={paymentMethod === "ONLINE"}
                          onChange={() => setPaymentMethod("ONLINE")}
                          className="mt-1 accent-[#ef6b32]"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#171d21]">
                            Online Payment (UPI, Cards, NetBanking)
                          </p>
                          <p className="mt-0.5 text-xs text-[#7a8286]">
                            Secure instant processing via Razorpay gateway with immediate GST invoice receipt.
                          </p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded bg-[#ef6b32] px-6 text-sm font-bold uppercase tracking-wider text-[#11171c] shadow transition-colors hover:bg-[#ff8750] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Processing Order...
                    </>
                  ) : (
                    `Place Order · ${priceFormatter.format(finalTotal)}`
                  )}
                </button>
              </form>

              {/* Order Review Sidebar */}
              <div className="h-fit space-y-5">
                <div className="rounded-md border border-[#e0e3e2] bg-white p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-[#171d21] border-b border-[#eceeed] pb-3">
                    Order Summary ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </h3>

                  <ul className="divide-y divide-[#eceeed] max-h-[300px] overflow-y-auto">
                    {cart.map((item) => (
                      <li key={item.id} className="flex gap-3 py-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded bg-[#f3f4f2] border border-[#e0e3e2]">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 text-xs font-semibold text-[#171d21]">{item.name}</p>
                          <p className="text-[10px] text-[#7a8286]">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-mono text-xs font-semibold text-[#171d21]">
                          {priceFormatter.format(item.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-[#eceeed] pt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-[#596166]">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium text-[#171d21]">{priceFormatter.format(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#596166]">
                      <span>Shipping Fee</span>
                      <span className="font-mono font-medium text-[#171d21]">{priceFormatter.format(shippingRate)}</span>
                    </div>
                    <div className="border-t border-[#eceeed] pt-3 flex justify-between text-sm font-bold text-[#171d21]">
                      <span>Total Amount</span>
                      <span className="font-mono text-lg text-[#ef6b32]">{priceFormatter.format(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-[#e0e3e2] bg-white p-4 text-xs text-[#7a8286] space-y-2">
                  <div className="flex items-center gap-2 text-[#343c40] font-semibold">
                    <ShieldCheck className="size-4 text-[#ef6b32]" /> Rabines Quality Guarantee
                  </div>
                  <p className="text-[11px] leading-4">
                    All tools are inspected for taper accuracy and insert seat concentricity before packing.
                  </p>
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
