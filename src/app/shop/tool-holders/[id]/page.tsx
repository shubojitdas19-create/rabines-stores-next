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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:gap-8">
            <ProductImageGallery product={product} />

            <section aria-labelledby="product-title" className="border border-[#d9dddf] bg-white p-4 sm:p-6 lg:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#171e23] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">{product.category}</span>
                <span className={`px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${product.inStock ? "bg-[#e5eee8] text-[#315b43]" : "bg-[#eceeef] text-[#737a7e]"}`}>
                  {product.inStock ? "Sample status · in stock" : "Sample status · backorder"}
                </span>
              </div>
              <h1 id="product-title" className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#171d21] sm:text-3xl">{product.name}</h1>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#7a8286]">SKU {product.sku}</p>
              <ProductPurchasePanel product={product} />
              <div className="mt-5">
                <ProductSpecificationTable product={product} />
              </div>
            </section>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
