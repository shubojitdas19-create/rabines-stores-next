"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, Star, X, Loader2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { getStoreReviews, submitStoreReview, StoreReview } from "@/lib/api/client";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getStoreReviews();
        setReviews(data);
      } catch (e) {
        console.warn("Error fetching reviews", e);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await submitStoreReview({
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        rating: form.rating,
        text: form.text,
      });

      if (res.success) {
        setSuccessMsg("Thank you! Your review has been submitted to the Rabines team.");
        setForm({ name: "", email: "", phone: "", location: "", rating: 5, text: "" });
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMsg("");
        }, 2500);
      } else {
        alert(res.error || "Failed to submit review.");
      }
    } catch {
      alert("Network error submitting review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-white/10 bg-[#0e1419] py-14 text-white sm:py-16">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 xl:px-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#ef6b32]">
              <span className="size-2 bg-[#ef6b32]" /> Verified Feedback
            </p>
            <h2 id="reviews-title" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Machinist &amp; Workshop Reviews
            </h2>
            <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
              Real machining feedback from manufacturing units and toolrooms across India.
            </p>
          </div>

          <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 border border-[#ef6b32] px-4 text-xs font-bold uppercase tracking-wider text-[#ef6b32] transition-colors hover:bg-[#ef6b32] hover:text-[#11171c]"
              >
                <MessageSquare className="size-3.5" /> Write a Review
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[90vh] w-full max-w-[500px] -translate-y-1/2 overflow-y-auto border border-white/10 bg-[#171e23] p-6 text-white shadow-2xl focus:outline-none sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <Dialog.Title className="text-xl font-semibold text-white">Share Your Feedback</Dialog.Title>
                    <Dialog.Description className="mt-1 text-xs text-slate-400">
                      Help other machinists and lathe operators choose the right tooling.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button type="button" className="text-slate-400 hover:text-white" aria-label="Close modal">
                      <X className="size-4" />
                    </button>
                  </Dialog.Close>
                </div>

                {successMsg ? (
                  <div className="mt-6 rounded border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-emerald-400">
                    <CheckCircle2 className="mx-auto size-8" />
                    <p className="mt-2 text-sm font-medium">{successMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="mt-5 space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1">Your Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Subhasis Mondal"
                        className="h-10 w-full border border-white/15 bg-[#10161a] px-3 text-white outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-slate-300 mb-1">Email *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="name@workshop.com"
                          className="h-10 w-full border border-white/15 bg-[#10161a] px-3 text-white outline-none focus:border-[#ef6b32]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">Phone *</label>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98000 00000"
                          className="h-10 w-full border border-white/15 bg-[#10161a] px-3 text-white outline-none focus:border-[#ef6b32]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Workshop / Location</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Baltikuri, Howrah"
                        className="h-10 w-full border border-white/15 bg-[#10161a] px-3 text-white outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setForm({ ...form, rating: star })}
                            className="p-1 text-amber-400"
                            aria-label={`${star} Stars`}
                          >
                            <Star className={`size-5 ${star <= form.rating ? "fill-amber-400" : "stroke-slate-600"}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">Your Machining Experience *</label>
                      <textarea
                        required
                        rows={3}
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        placeholder="Mention tool life, insert finish, cutting performance..."
                        className="w-full border border-white/15 bg-[#10161a] p-3 text-white outline-none focus:border-[#ef6b32]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex h-11 w-full items-center justify-center gap-2 bg-[#ef6b32] font-bold uppercase tracking-wider text-[#11171c] transition-colors hover:bg-[#ff8750] disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                  </form>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex min-h-[140px] items-center justify-center">
            <Loader2 className="size-6 animate-spin text-[#ef6b32]" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev) => (
            <div key={rev.id} className="flex flex-col justify-between rounded border border-white/10 bg-[#141b20] p-5">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-3.5 ${i < rev.rating ? "fill-amber-400" : "stroke-slate-600"}`} />
                    ))}
                  </div>
                  {rev.isVerified && (
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase text-emerald-400">
                      <CheckCircle2 className="size-3" /> Verified Order
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-300 italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="text-xs font-semibold text-white">{rev.customerName}</p>
                {rev.location && <p className="font-mono text-[10px] text-slate-400">{rev.location}</p>}

                {rev.adminReply && (
                  <div className="mt-3 rounded border-l-2 border-[#ef6b32] bg-white/[0.03] p-2.5 text-[11px] text-slate-300">
                    <span className="font-semibold text-[#ef6b32]">Rabines Stores Response:</span> {rev.adminReply}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
