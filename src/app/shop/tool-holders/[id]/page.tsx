import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Info } from "lucide-react";
import { MainFooter } from "@/components/rabines/main-footer";
import { SiteHeader } from "@/components/rabines/site-header";
import { ProductImageGallery } from "@/components/rabines/shop/product-image-gallery";
import { ProductPurchasePanel } from "@/components/rabines/shop/product-purchase-panel";
import { ProductSpecificationTable } from "@/components/rabines/shop/product-specification-table";
import { sampleProducts } from "@/components/rabines/shop/catalog-data";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

function getProduct(id: string) {
  return sampleProducts.find((product) => product.id === id);
}

export function generateStaticParams() {
  return sampleProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) return { title: "Product not found | Rabines Stores" };

  return {
    title: `${product.name} | Rabines Stores`,
    description: `Review sample dimensions and technical specifications for ${product.name}. Confirm manufacturer dimensions, pricing, and availability before ordering.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main id="top" className="bg-[#f2f4f4] text-[#171d21]">
        <div className="mx-auto max-w-[1800px] px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:px-16 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-5 sm:mb-7">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#7a8286] sm:text-[10px]">
              <li><Link href="/#top" className="transition-colors hover:text-[#171d21]">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li><Link href="/#products" className="transition-colors hover:text-[#171d21]">Shop</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li><Link href="/shop/tool-holders" className="transition-colors hover:text-[#171d21]">Tool Holders</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li aria-current="page" className="max-w-[12rem] truncate text-[#d85f2d]">{product.name}</li>
            </ol>
          </nav>

          <div role="note" className="mb-5 flex items-start gap-2.5 border border-[#e9c2ad] bg-[#fff5ef] px-3.5 py-3 text-[10px] leading-5 text-[#704b39] sm:mb-6 sm:items-center sm:px-4">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary sm:mt-0" />
            <p>Sample catalog detail — dimensions, prices, and availability below are illustrative, not verified Rabines product data. Confirm the manufacturer specification before ordering.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-start lg:gap-x-8 lg:gap-y-6">
            <header className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#171e23] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white">{product.category}</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] ${product.inStock ? "bg-[#e5eee8] text-[#315b43]" : "bg-[#eceeef] text-[#737a7e]"}`}>
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${product.inStock ? "bg-[#4e8a63]" : "bg-[#939a9e]"}`} />
                  {product.inStock ? "Sample status · in stock" : "Sample status · backorder"}
                </span>
              </div>
              <h1 id="product-title" className="mt-3 max-w-4xl text-[26px] font-semibold leading-[1.12] tracking-[-0.045em] text-[#171d21] sm:text-3xl lg:text-[40px]">{product.name}</h1>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#7a8286] sm:text-[10px]">SKU {product.sku}</p>
            </header>

            <div className="min-w-0 lg:row-start-2">
              <ProductImageGallery product={product} />
            </div>

            <aside aria-label="Purchase options" className="h-fit border border-[#d9dddf] bg-white lg:row-start-2 lg:sticky lg:top-6">
              <div className="flex items-center justify-between gap-3 border-b border-[#e6e8e9] bg-[#f7f8f8] px-4 py-3 sm:px-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-[#616a6f]">Purchase options</p>
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#90979b]">Sample pricing</span>
              </div>
              <div className="p-4 sm:p-6">
                <ProductPurchasePanel product={product} />
              </div>
            </aside>

            <div className="min-w-0 lg:col-span-2">
              <ProductSpecificationTable product={product} />
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
