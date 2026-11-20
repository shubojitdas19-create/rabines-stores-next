import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Loader2 } from "lucide-react";
import { MainFooter } from "@/components/rabines/main-footer";
import { SiteHeader } from "@/components/rabines/site-header";
import { ProductImageGallery } from "@/components/rabines/shop/product-image-gallery";
import { ProductPurchasePanel } from "@/components/rabines/shop/product-purchase-panel";
import { ProductSpecificationTable } from "@/components/rabines/shop/product-specification-table";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/json-ld";
import { getStoreProductBySlug, getStoreProducts } from "@/lib/api/client";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await getStoreProducts();
    return products.map((product) => ({ id: product.slug || product.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getStoreProductBySlug(id);

  if (!product) return { title: "Product Not Found | Rabines Stores" };

  const price = typeof product.basePrice === "number" ? product.basePrice : parseFloat(product.basePrice || "0");
  const brand = product.brand || "Rabines Precision";
  const categoryName = product.category?.name || "CNC Tooling";
  const productUrl = `https://rabines-stores.in/shop/tool-holders/${product.slug || product.id}`;
  const images =
    product.media && product.media.length > 0
      ? product.media.map((m) => (m.url.startsWith("http") ? m.url : `https://rabines-stores.in${m.url}`))
      : ["https://rabines-stores.in/images/categories/cnc-tool-holders.png"];

  return {
    title: `${product.name} | ${brand}`,
    description:
      product.description ||
      `Buy industrial-grade ${product.name} (${brand}) from Rabines Stores at ₹${price}. Engineered for precision CNC turning & milling. Fast dispatch across India.`,
    keywords: [
      product.name,
      product.sku || "",
      brand,
      categoryName,
      "CNC tooling India",
      "precision industrial tooling",
      "buy CNC tools online",
      "Howrah CNC suppliers",
    ].filter(Boolean),
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} - ${brand} | Rabines Stores`,
      description:
        product.description ||
        `Buy ${product.name} starting at ₹${price}. Industrial-grade CNC tooling tested for high rigidity and precision tolerances.`,
      url: productUrl,
      images: images.map((url) => ({ url, alt: product.name })),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Rabines Stores`,
      description: `Buy ${product.name} (${brand}) starting at ₹${price}. Fast shipping & Cash on Delivery in India.`,
      images: images,
    },
  };
}

async function ProductDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getStoreProductBySlug(id);
  if (!product) notFound();

  const price = typeof product.basePrice === "number" ? product.basePrice : parseFloat(product.basePrice || "0");
  const categoryName = product.category?.name || "CNC Tooling";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop/tool-holders" },
    { name: categoryName, url: `/shop/tool-holders?category=${encodeURIComponent(categoryName)}` },
    { name: product.name, url: `/shop/tool-holders/${product.slug || product.id}` },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-7 lg:px-10 lg:pb-20">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#7a8286] sm:gap-2">
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
          <li>
            <Link
              href={`/shop/tool-holders?category=${encodeURIComponent(categoryName)}`}
              className="transition-colors hover:text-[#171d21]"
            >
              {categoryName}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-3" />
          </li>
          <li aria-current="page" className="font-medium text-[#343c40] truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </li>
        </ol>
      </nav>

      <header className="mt-4 border-b border-[#e0e3e2] pb-4 sm:flex sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="text-xs font-mono font-medium text-[#ef6b32]">
            {product.brand || "Rabines Precision"}
            {product.sku && <span className="text-[#899297]"> · SKU: {product.sku}</span>}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#171d21] sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1 text-xs text-[#717a7f]">
            Verified for CNC lathe &amp; machining center operations. Standard shank tolerances.
          </p>
        </div>

        <div className="mt-3 flex items-baseline justify-between border-t border-dashed border-[#e0e3e2] pt-3 sm:mt-0 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <div>
            <p className="text-xs font-medium text-[#7a8286]">Online &amp; Retail Price</p>
            <p className="mt-0.5 text-[27px] font-semibold tracking-[-0.05em] text-[#171d21] sm:text-3xl font-mono">
              {priceFormatter.format(price)}
            </p>
          </div>
          <p className="pb-1 text-xs text-[#717a7f] sm:pb-0">Direct Factory Dispatch</p>
        </div>
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-start lg:gap-6">
        <ProductImageGallery product={product} />
        <aside aria-label="Availability and order placement" className="rounded-md border border-[#e0e3e2] bg-white p-4 sm:p-5 lg:p-6">
          <ProductPurchasePanel product={product} />
        </aside>
      </div>

      <div className="mt-5">
        <ProductSpecificationTable product={product} />
      </div>
    </div>
  );
}

function ProductDetailLoading() {
  return (
    <div className="mx-auto flex min-h-[500px] max-w-[1440px] items-center justify-center p-12">
      <Loader2 className="size-8 animate-spin text-[#ef6b32]" />
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="top" className="bg-[#f3f4f2] text-[#171d21]">
        <Suspense fallback={<ProductDetailLoading />}>
          <ProductDetailContent params={params} />
        </Suspense>
      </main>
      <MainFooter />
    </>
  );
}
