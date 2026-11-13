import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { MainFooter } from "@/components/rabines/main-footer";
import { SiteHeader } from "@/components/rabines/site-header";
import { ProductImageGallery } from "@/components/rabines/shop/product-image-gallery";
import { ProductPurchasePanel } from "@/components/rabines/shop/product-purchase-panel";
import { ProductSpecificationTable } from "@/components/rabines/shop/product-specification-table";
import { getProductMake, sampleProducts } from "@/components/rabines/shop/catalog-data";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

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
    description: `View product details and sample pricing for ${product.name} from Rabines Stores.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main id="top" className="bg-[#f3f4f2] text-[#171d21]">
        <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-7 lg:px-10 lg:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#7a8286] sm:gap-2">
              <li><Link href="/#top" className="transition-colors hover:text-[#171d21]">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li><Link href="/#products" className="transition-colors hover:text-[#171d21]">Shop</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li><Link href="/shop/tool-holders" className="transition-colors hover:text-[#171d21]">Tool holders</Link></li>
              <li aria-hidden="true"><ChevronRight className="size-3" /></li>
              <li aria-current="page" className="max-w-[10rem] truncate font-medium text-[#343c40]">{product.name}</li>
            </ol>
          </nav>

          <header className="mt-4 grid gap-4 rounded-md border border-[#e0e3e2] bg-white p-4 sm:mt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5">
            <div className="min-w-0">
              <span className="inline-flex rounded-full bg-[#f3f4f2] px-3 py-1.5 text-xs font-medium text-[#626b70]">{product.category}</span>
              <h1 id="product-title" className="mt-2.5 max-w-4xl text-[25px] font-semibold leading-[1.14] tracking-[-0.04em] text-[#171d21] sm:text-3xl lg:text-[36px]">{product.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="text-[#7a8286]">Make: <span className="font-medium text-[#343c40]">{getProductMake(product)}</span></span>
                <span aria-hidden="true" className="text-[#c3c8ca]">·</span>
                <span className="text-[#7a8286]">SKU <span className="font-medium text-[#4c555a]">{product.sku}</span></span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 border-t border-[#eceeed] pt-3 sm:min-w-[210px] sm:flex-col sm:items-start sm:justify-center sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <div>
                <p className="text-xs font-medium text-[#7a8286]">Sample price</p>
                <p className="mt-0.5 text-[27px] font-semibold tracking-[-0.05em] text-[#171d21] sm:text-3xl">{priceFormatter.format(product.price)}</p>
              </div>
              <p className="pb-1 text-xs text-[#717a7f] sm:pb-0">{product.priceUnit}</p>
            </div>
          </header>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start lg:gap-6">
            <ProductImageGallery product={product} />
            <aside aria-label="Availability and product inquiry" className="rounded-md border border-[#e0e3e2] bg-white p-4 sm:p-5 lg:p-6">
              <ProductPurchasePanel product={product} />
            </aside>
          </div>

          <div className="mt-5">
            <ProductSpecificationTable product={product} />
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
