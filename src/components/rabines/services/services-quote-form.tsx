"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { ArrowUpRight, FileText, Paperclip, Trash2 } from "lucide-react";

type QuoteFile = File & { key: string };

const supportedExtensions = new Set(["pdf", "dwg", "dxf", "step", "stp", "iges", "igs"]);
const maxFileCount = 5;
const maxFileSize = 25 * 1024 * 1024;
const fieldClass = "h-12 w-full border border-white/15 bg-[#0d1419] px-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-[11px] font-medium text-slate-300";

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function formatFileSize(size: number) {
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function ServicesQuoteForm() {
  const [files, setFiles] = useState<QuoteFile[]>([]);
  const [fileError, setFileError] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.currentTarget.files ?? []);
    const invalidType = incomingFiles.filter((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      return !supportedExtensions.has(extension);
    });
    const oversized = incomingFiles.filter((file) => file.size > maxFileSize);
    const validFiles = incomingFiles.filter((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      return supportedExtensions.has(extension) && file.size <= maxFileSize;
    });
    const remainingSlots = Math.max(0, maxFileCount - files.length);
    const acceptedFiles = validFiles.slice(0, remainingSlots).map((file) => Object.assign(file, { key: fileKey(file) }));
    const messages = [
      invalidType.length ? "Use PDF, DWG, DXF, STEP, or IGES files." : "",
      oversized.length ? "Each file must be 25 MB or smaller." : "",
      validFiles.length > remainingSlots ? `You can attach up to ${maxFileCount} files.` : "",
    ].filter(Boolean);

    setFiles((current) => [...current, ...acceptedFiles]);
    setFileError(messages.join(" "));
    setSubmissionMessage("");
    setWhatsAppUrl("");
    event.currentTarget.value = "";
  }

  function removeFile(key: string) {
    setFiles((current) => current.filter((file) => file.key !== key));
    setFileError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const quantity = String(formData.get("quantity") ?? "").trim();
    const targetDate = String(formData.get("targetDate") ?? "").trim();
    const projectBrief = String(formData.get("projectBrief") ?? "").trim();
    const drawingNames = files.length ? files.map((file) => file.name).join(", ") : "I will share the drawing in WhatsApp";

    const message = [
      "Hello Rabines Stores, I would like a quote for an engineering project.",
      `Name: ${name}`,
      `Email: ${email}`,
      company && `Company / workshop: ${company}`,
      phone && `Phone: ${phone}`,
      `Service: ${service}`,
      quantity && `Estimated quantity: ${quantity}`,
      targetDate && `Target completion date: ${targetDate}`,
      `Drawing file(s): ${drawingNames}`,
      `Project brief: ${projectBrief}`,
      "I will attach the drawing file(s) in this WhatsApp conversation.",
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/919002156266?text=${encodeURIComponent(message)}`;
    setWhatsAppUrl(url);
    setSubmissionMessage("Your project brief is ready. Attach the drawing file(s) in WhatsApp before sending.");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="quote-form" aria-labelledby="quote-title" className="scroll-mt-4 bg-[#11171c] py-12 text-white sm:py-16 lg:py-[76px]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 sm:text-[10px]">
              <span aria-hidden="true" className="size-2 bg-primary" /> Start a project <span className="text-primary">/</span> Quote request
            </p>
            <h2 id="quote-title" className="max-w-xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-[42px]">
              Upload a drawing. Get a considered quote.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300 sm:text-[15px] sm:leading-7">
              Share the part, service, and target date. The team can review scope, machine fit, and timing before confirming a quote.
            </p>

            <div className="mt-6 border-l-2 border-primary bg-white/[0.04] p-4">
              <p className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                <Paperclip aria-hidden="true" className="size-3.5 text-primary" /> Drawing files
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">PDF, DWG, DXF, STEP, and IGES are accepted for this quote brief. Native CAD files help when available.</p>
            </div>
          </div>

          <div className="border border-white/10 bg-[#171e23] p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="service-quote-name">Your name <span className="text-primary">*</span></label>
                  <input className={fieldClass} id="service-quote-name" name="name" autoComplete="name" placeholder="Full name" required />
                </div>
                <div>
                  <label className={labelClass} htmlFor="service-quote-email">Work email <span className="text-primary">*</span></label>
                  <input className={fieldClass} id="service-quote-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
                </div>
                <div>
                  <label className={labelClass} htmlFor="service-quote-company">Company / workshop <span className="text-slate-500">(optional)</span></label>
                  <input className={fieldClass} id="service-quote-company" name="company" autoComplete="organization" placeholder="Business name" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="service-quote-phone">Phone <span className="text-slate-500">(optional)</span></label>
                  <input className={fieldClass} id="service-quote-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 90000 00000" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="service-quote-service">Service needed <span className="text-primary">*</span></label>
                  <select className={`${fieldClass} appearance-none`} id="service-quote-service" name="service" defaultValue="" required>
                    <option value="" disabled>Select a service</option>
                    <option>CNC Machining</option>
                    <option>CNC Programming</option>
                    <option>Engineering Drawings / CAD</option>
                    <option>Combined project / not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="service-quote-quantity">Estimated quantity <span className="text-slate-500">(optional)</span></label>
                  <input className={fieldClass} id="service-quote-quantity" name="quantity" type="number" min="1" inputMode="numeric" placeholder="e.g. 25 parts" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="service-quote-date">Target completion date <span className="text-slate-500">(optional)</span></label>
                  <input className={`${fieldClass} [color-scheme:dark]`} id="service-quote-date" name="targetDate" type="date" />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="service-quote-files">Upload drawing <span className="text-slate-500">(optional for initial discussion)</span></label>
                <div className="border border-dashed border-white/20 bg-[#0d1419] p-4 transition-colors focus-within:border-primary sm:p-5">
                  <label htmlFor="service-quote-files" className="flex cursor-pointer flex-col items-start gap-2">
                    <span className="flex size-10 items-center justify-center border border-primary/40 bg-primary/10 text-primary"><FileText aria-hidden="true" className="size-5" /></span>
                    <span className="text-sm font-semibold text-white">Choose drawing files</span>
                    <span id="drawing-helper" className="text-[11px] leading-5 text-slate-400">PDF, DWG, DXF, STEP, or IGES · up to 5 files · 25 MB each</span>
                    <input
                      className="mt-2 block w-full max-w-full text-xs text-slate-400 file:mr-3 file:border-0 file:bg-primary file:px-3 file:py-2 file:font-mono file:text-[9px] file:font-semibold file:uppercase file:tracking-[0.1em] file:text-[#11171c] hover:file:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      id="service-quote-files"
                      name="drawings"
                      type="file"
                      accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs"
                      multiple
                      aria-describedby="drawing-helper drawing-error"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p id="drawing-error" role="alert" className={`mt-2 min-h-4 text-[11px] leading-4 ${fileError ? "text-[#ff9a72]" : "text-transparent"}`}>
                  {fileError}
                </p>
                {files.length > 0 && (
                  <ul aria-label="Selected drawing files" className="mt-2 flex flex-col gap-2">
                    {files.map((file) => (
                      <li key={file.key} className="flex items-center justify-between gap-3 border border-white/10 bg-white/[0.03] px-3 py-2">
                        <span className="min-w-0 truncate text-xs text-slate-300">{file.name} <span className="font-mono text-[9px] text-slate-500">· {formatFileSize(file.size)}</span></span>
                        <button type="button" aria-label={`Remove ${file.name}`} onClick={() => removeFile(file.key)} className="grid size-8 shrink-0 place-items-center text-slate-400 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                          <Trash2 aria-hidden="true" className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="service-quote-brief">Project brief <span className="text-primary">*</span></label>
                <textarea
                  className="min-h-[120px] w-full resize-y border border-white/15 bg-[#0d1419] px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="service-quote-brief"
                  name="projectBrief"
                  placeholder="Material, dimensions, tolerances, finish, machine/controller details, or other requirements..."
                  required
                />
              </div>

              <p className="text-[11px] leading-5 text-slate-400">
                This form prepares a WhatsApp message only. Files are not uploaded or stored on this page; attach selected drawings in the WhatsApp conversation before sending.
              </p>

              {submissionMessage && (
                <div role="status" aria-live="polite" className="border border-primary/35 bg-primary/10 p-3 text-xs leading-5 text-slate-200">
                  {submissionMessage}{" "}
                  {whatsAppUrl && <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">Continue to WhatsApp <ArrowUpRight aria-hidden="true" className="size-3.5" /></a>}
                </div>
              )}

              <button type="submit" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#11171c] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#171e23] sm:w-auto sm:self-start sm:px-7 sm:text-[11px]">
                Prepare quote request <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
