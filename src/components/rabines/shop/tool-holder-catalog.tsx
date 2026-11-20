"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { ProductCard } from "@/components/rabines/shop/product-card";
import { getStoreProducts, getStoreCategories, Product, StoreCategory } from "@/lib/api/client";

type SortOrder = "featured" | "price-low" | "price-high" | "name";

export function ToolHolderCatalog({
  initialProducts = [],
  initialCategories = [],
}: {
  initialProducts?: Product[];
  initialCategories?: StoreCategory[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<StoreCategory[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [loading, setLoading] = useState(initialProducts.length === 0);

  useEffect(() => {
    async function loadData() {
      try {
        const [prods, cats] = await Promise.all([
          getStoreProducts(),
          getStoreCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (e) {
        console.warn("Could not fetch catalog from backend", e);
      } finally {
        setLoading(false);
      }
    }
    if (initialProducts.length === 0) {
      loadData();
    }
  }, [initialProducts.length]);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.slug === selectedCategory ||
        product.category?.name === selectedCategory;

      const searchableText = `${product.name} ${product.sku || ""} ${product.category?.name || ""} ${product.brand || ""}`.toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });

    if (sortOrder === "price-low") {
      return [...filtered].sort((a, b) => Number(a.basePrice) - Number(b.basePrice));
    }
    if (sortOrder === "price-high") {
      return [...filtered].sort((a, b) => Number(b.basePrice) - Number(a.basePrice));
    }
    if (sortOrder === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [products, searchQuery, selectedCategory, sortOrder]);

  const hasFilters = selectedCategory !== "All" || Boolean(searchQuery.trim());

  function clearFilters() {
    setSelectedCategory("All");
    setSearchQuery("");
  }

  return (
    <section id="catalog" aria-label="CNC tool catalog" className="scroll-mt-6 bg-[#f3f4f2] text-[#171d21]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#7a8286]">Toolroom Catalog &amp; Store</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#171d21] sm:text-3xl">
              Precision CNC Machining Tools
            </h2>
          </div>
          <p className="pb-1 text-xs text-[#7a8286]" aria-live="polite">
            {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {/* Category Filter Pills */}
          <div role="group" aria-label="Filter by category" className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              aria-pressed={selectedCategory === "All"}
              onClick={() => setSelectedCategory("All")}
              className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef6b32] ${
                selectedCategory === "All"
                  ? "bg-[#171e23] text-white"
                  : "border border-[#d9dddf] bg-white text-[#596166] hover:border-[#171e23] hover:text-[#171e23]"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.slug || selectedCategory === category.name;
              return (
                <button
                  key={category.id || category.slug}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category.slug || category.name)}
                  className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef6b32] ${
                    isSelected
                      ? "bg-[#171e23] text-white"
                      : "border border-[#d9dddf] bg-white text-[#596166] hover:border-[#171e23] hover:text-[#171e23]"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_220px]">
            <label className="relative min-w-0">
              <span className="sr-only">Search tools by name, brand, or SKU</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#858c90]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, inserts, holders, or SKUs..."
                className="h-11 w-full rounded-md border border-[#d9dddf] bg-white pl-10 pr-3 text-sm text-[#293136] outline-none transition-colors placeholder:text-[#9aa1a4] focus:border-[#ef6b32] focus:ring-2 focus:ring-[#ef6b32]/20"
              />
            </label>

            <label className="flex h-11 items-center justify-between gap-3 rounded-md border border-[#d9dddf] bg-white px-3 text-xs text-[#7a8286]">
              <span>Sort by</span>
              <select
                aria-label="Sort products"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="min-w-0 flex-1 bg-transparent text-sm text-[#293136] outline-none focus-visible:ring-2 focus-visible:ring-[#ef6b32]"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>

          {hasFilters && (
            <div className="flex items-center justify-between gap-3 text-xs text-[#7a8286]">
              <span>Showing {visibleProducts.length} matching items</span>
              <button
                type="button"
                onClick={clearFilters}
                className="text-[#ef6b32] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-[#ef6b32]" />
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="mt-8 rounded-md border border-[#e0e3e2] bg-white p-10 text-center">
            <p className="text-base font-semibold text-[#171d21]">No tools found</p>
            <p className="mt-1 text-xs text-[#7a8286]">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex h-9 items-center justify-center rounded bg-[#171e23] px-4 text-xs font-semibold text-white hover:bg-[#29343a]"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
