import Link from "next/link";
import { ArrowLeft, Search, Wrench } from "lucide-react";
import { SiteHeader } from "@/components/rabines/site-header";
import { MainFooter } from "@/components/rabines/main-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-[#11171c] px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-[#171e23] border border-[#263138] text-[#ef6b32]">
            <Wrench className="size-7" />
          </div>
          <p className="mt-4 text-xs font-mono font-medium uppercase tracking-widest text-[#ef6b32]">
            Error 404 · Item Not Found
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Tooling or Page Not Found
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#9ba3a8]">
            The tool holder, insert model, or page you are looking for may have been moved, renamed, or is temporarily out of catalog.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop/tool-holders"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#ef6b32] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#d85c25]"
            >
              <Search className="size-4" />
              Browse Tool Catalog
            </Link>
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-[#2a353c] bg-[#171e23] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#d0d7dc] transition hover:bg-[#202930] hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
