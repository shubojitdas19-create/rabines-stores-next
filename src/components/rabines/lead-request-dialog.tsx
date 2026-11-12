"use client";

import { type FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Check, MessageCircle, X } from "lucide-react";

type LeadRequestDialogProps = {
  label: string;
  className: string;
  ariaLabel?: string;
  defaultProduct?: string;
  showArrow?: boolean;
};

const fields = "h-11 w-full border border-white/15 bg-[#11171c] px-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#ff7040] focus:ring-2 focus:ring-[#ff7040]/20";
const labelClass = "mb-1.5 block text-xs font-medium text-slate-300";
const productOptions = [
  "CNC Tool Holders",
  "Cutting Inserts",
  "Lathe Jaws",
  "Machine Accessories",
  "CNC Services",
  "CNC Program Solutions",
  "Custom Setup or Bulk Tooling",
  "Engineering Drawings",
  "Engineering Instruments",
  "Measuring Instruments",
  "CNC Programming or Drawings",
  "Not sure — I need guidance",
];

export function LeadRequestDialog({ label, className, ariaLabel, defaultProduct = "", showArrow = false }: LeadRequestDialogProps) {
  const [open, setOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const product = String(formData.get("product") ?? "").trim();
    const quantity = String(formData.get("quantity") ?? "").trim();
    const requirement = String(formData.get("requirement") ?? "").trim();

    const message = [
      "Hello Rabines Stores, I would like help with a tooling or engineering enquiry.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      company && `Company / workshop: ${company}`,
      `Looking for: ${product}`,
      quantity && `Approx. quantity: ${quantity}`,
      `Requirement: ${requirement}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/919002156266?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOpen(false);
    event.currentTarget.reset();
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" aria-label={ariaLabel} className={className}>
          {label}
          {showArrow && <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover/view-range:-translate-y-0.5 group-hover/view-range:translate-x-0.5" />}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm" />
        <Dialog.Content className="lead-dialog-content fixed inset-x-0 bottom-0 top-auto z-50 mx-auto max-h-[92svh] w-full max-w-[560px] overflow-y-auto border border-white/10 bg-[#171e23] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-white shadow-[0_-20px_80px_rgba(0,0,0,0.45)] sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(560px,calc(100vw-40px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.17em] text-[#ff8050]">
                <span className="size-1.5 bg-[#ff7040]" /> Tools &amp; engineering enquiry · no obligation
              </p>
              <Dialog.Title className="text-2xl font-semibold tracking-tight sm:text-[28px]">Tell us what you need.</Dialog.Title>
              <Dialog.Description className="mt-2 max-w-[420px] text-sm leading-6 text-slate-400">
                Share a few details so our team can help with the right product or technical service. Your message opens in WhatsApp after you submit.
              </Dialog.Description>
            </div>
            <Dialog.Close aria-label="Close enquiry form" className="grid size-9 shrink-0 place-items-center border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white">
              <X aria-hidden="true" className="size-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="lead-name">Your name <span className="text-[#ff8050]">*</span></label>
                <input className={fields} id="lead-name" name="name" autoComplete="name" placeholder="e.g. Amit Das" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="lead-phone">Phone number <span className="text-[#ff8050]">*</span></label>
                <input className={fields} id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+() .-]{8,20}" title="Enter a valid phone number" placeholder="+91 90000 00000" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="lead-company">Company or workshop <span className="text-slate-500">(optional)</span></label>
                <input className={fields} id="lead-company" name="company" autoComplete="organization" placeholder="Your business name" />
              </div>
              <div>
                <label className={labelClass} htmlFor="lead-product">What are you looking for? <span className="text-[#ff8050]">*</span></label>
                <select className={`${fields} appearance-none`} id="lead-product" name="product" defaultValue={defaultProduct} required>
                  <option value="" disabled>Select a product or service</option>
                  {defaultProduct && !productOptions.includes(defaultProduct) && <option value={defaultProduct}>{defaultProduct}</option>}
                  {productOptions.map((productOption) => <option key={productOption} value={productOption}>{productOption}</option>)}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
              <div>
                <label className={labelClass} htmlFor="lead-quantity">Approx. quantity <span className="text-slate-500">(optional)</span></label>
                <input className={fields} id="lead-quantity" name="quantity" type="number" min="1" inputMode="numeric" placeholder="e.g. 10" />
              </div>
              <div>
                <label className={labelClass} htmlFor="lead-requirement">What should we know? <span className="text-[#ff8050]">*</span></label>
                <input className={fields} id="lead-requirement" name="requirement" placeholder="Part number, machine, or project brief" required />
              </div>
            </div>

            <p className="flex items-start gap-2 text-[11px] leading-5 text-slate-500">
              <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-[#ff8050]" />
              Your details are added to a WhatsApp message for Rabines Stores. Nothing is sent until you submit.
            </p>
            <button type="submit" className="group mt-1 flex h-12 items-center justify-center gap-2 bg-[#ef6b32] px-5 text-xs font-bold uppercase tracking-[0.1em] text-[#11171c] transition-colors hover:bg-[#ff8750]">
              <MessageCircle aria-hidden="true" className="size-4" /> Continue to WhatsApp <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
