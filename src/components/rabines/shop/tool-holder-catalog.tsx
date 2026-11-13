"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { ProductCard } from "@/components/rabines/shop/product-card";
import { getProductMake, sampleProducts, toolCategories } from "@/components/rabines/shop/catalog-data";
import type { ToolCategory } from "@/components/rabines/shop/catalog-data";

type SortOrder = "featured" | "price-low" | "price-high" | "name";
type CategoryFilter = "All" | ToolCategory;

const categoryFilters: CategoryFilter[] = ["All", ...toolCategories];

export function ToolHolderCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const filtered = sampleProducts.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const searchableText = `${product.name} ${product.sku} ${product.category} ${getProductMake(product)}`.toLocaleLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });

    if (sortOrder === "price-low") return filtered.sort((first, second) => first.price - second.price);
    if (sortOrder === "price-high") return filtered.sort((first, second) => second.price - first.price);
    if (sortOrder === "name") return filtered.sort((first, second) => first.name.localeCompare(second.name));
    return filtered;
  }, [searchQuery, selectedCategory, sortOrder]);

  const hasFilters = selectedCategory !== "All" || Boolean(searchQuery.trim());

  function clearFilters() {
    setSelectedCategory("All");
    setSearchQuery("");
  }

  return (
    <section id="catalog" aria-label="CNC tool holder catalog" className="scroll-mt-6 bg-[#f3f4f2] text-[#171d21]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#7a8286]">Find the right fit</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#171d21] sm:text-3xl">Shop tool holders</h2>
          </div>
          <p className="pb-1 text-xs text-[#7a8286]" aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div role="group" aria-label="Filter by category" className="flex gap-2 overflow-x-auto pb-1">
            {categoryFilters.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isSelected ? "bg-[#171e23] text-white" : "border border-[#d9dddf] bg-white text-[#596166] hover:border-[#171e23] hover:text-[#171e23]"}`}
                >
                  {category === "All" ? "All products" : category}
                </button>
              );
            })}
          </div>

          <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_220px]">
            <label className="relative min-w-0">
              <span className="sr-only">Search products by name, make, or SKU</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#858c90]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products"
                className="h-11 w-full rounded-md border border-[#d9dddf] bg-white pl-10 pr-3 text-sm text-[#293136] outline-none transition-colors placeholder:text-[#9aa1a4] focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="flex h-11 items-center justify-between gap-3 rounded-md border border-[#d9dddf] bg-white px-3 text-xs text-[#7a8286]">
              <span>Sort by</span>
              <select
                aria-label="Sort products"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                className="min-w-0 flex-1 bg-transparent text-sm text-[#293136] outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>

          {hasFilters && (
            <div className="flex items-center justify-between gap-3 text-xs text-[#7a8286]">
              <span>Showing {visibleProducts.length} results</span>
              <button type="button" onClick={clearFilters} className="inline-flex min-h-9 items-center gap-1.5 font-medium text-[#343c40] underline underline-offset-4 hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Clear filters <ArrowRight aria-hidden="true" className="size-3" />
              </button>
            </div>
          )}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="mt-5 rounded-md border border-dashed border-[#cbd0d2] bg-white px-5 py-14 text-center">
            <h3 className="text-base font-semibold text-[#171d21]">No products found</h3>
            <p className="mt-1.5 text-sm text-[#717a7f]">Try another search or browse all products.</p>
            <button type="button" onClick={clearFilters} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-[#171d21] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              Show all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
