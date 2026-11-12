"use client";

import { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, RotateCcw } from "lucide-react";
import { ProductCard } from "@/components/rabines/shop/product-card";
import { materialGrades, sampleProducts, toolCategories } from "@/components/rabines/shop/catalog-data";
import type { MaterialGrade, ToolCategory } from "@/components/rabines/shop/catalog-data";

type SortOrder = "featured" | "price-low" | "price-high" | "name";

export function ToolHolderCatalog() {
  const [selectedCategories, setSelectedCategories] = useState<ToolCategory[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<MaterialGrade[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");

  const visibleProducts = useMemo(() => {
    const filtered = sampleProducts.filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesGrade = selectedGrades.length === 0 || (product.material !== undefined && selectedGrades.includes(product.material));
      const matchesAvailability = !onlyInStock || product.inStock;
      return matchesCategory && matchesGrade && matchesAvailability;
    });

    if (sortOrder === "price-low") return filtered.sort((first, second) => first.price - second.price);
    if (sortOrder === "price-high") return filtered.sort((first, second) => second.price - first.price);
    if (sortOrder === "name") return filtered.sort((first, second) => first.name.localeCompare(second.name));
    return filtered;
  }, [onlyInStock, selectedCategories, selectedGrades, sortOrder]);

  const setCategoryFilter = (category: ToolCategory, checked: boolean) => {
    setSelectedCategories((current) => checked ? [...current, category] : current.filter((value) => value !== category));
  };

  const setGradeFilter = (grade: MaterialGrade, checked: boolean) => {
    setSelectedGrades((current) => checked ? [...current, grade] : current.filter((value) => value !== grade));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedGrades([]);
    setOnlyInStock(false);
    setSortOrder("featured");
  };

  const activeFilterCount = selectedCategories.length + selectedGrades.length + Number(onlyInStock);

  return (
    <section aria-label="CNC tool holder catalog" className="bg-[#f2f4f4] text-[#171d21]">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-7 px-5 py-8 sm:px-8 sm:py-10 xl:grid-cols-[264px_minmax(0,1fr)] xl:gap-10 xl:px-16 xl:py-12">
        <aside aria-label="Product filters" className="self-start border border-[#d9dddf] bg-white xl:sticky xl:top-6">
          <div className="flex items-center justify-between gap-3 border-b border-[#e6e8e9] px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-sm font-semibold text-[#171d21]">Filter products</h2>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#81898d]">
                {activeFilterCount ? `${activeFilterCount} active` : "Refine selection"}
              </p>
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#737b80] transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RotateCcw aria-hidden="true" className="size-3" />
              Clear
            </button>
          </div>

          <Accordion.Root type="multiple" defaultValue={["tool-category", "material-grade", "availability"]}>
            <Accordion.Item value="tool-category" className="border-b border-[#e6e8e9] px-4 sm:px-5">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#343c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  Tool Category
                  <ChevronDown aria-hidden="true" className="size-4 text-[#7a8286] transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden pb-4">
                <fieldset className="flex flex-col gap-3">
                  <legend className="sr-only">Filter by tool category</legend>
                  {toolCategories.map((category) => {
                    const checked = selectedCategories.includes(category);
                    const count = sampleProducts.filter((product) => product.category === category).length;
                    return (
                      <label key={category} className="flex cursor-pointer items-center gap-3 text-sm text-[#596166]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => setCategoryFilter(category, event.target.checked)}
                          className="size-4 accent-[#ef6b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        />
                        <span>{category}</span>
                        <span className="ml-auto font-mono text-[10px] text-[#959da1]">{count}</span>
                      </label>
                    );
                  })}
                </fieldset>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="material-grade" className="border-b border-[#e6e8e9] px-4 sm:px-5">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#343c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  Material Grade
                  <ChevronDown aria-hidden="true" className="size-4 text-[#7a8286] transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden pb-4">
                <fieldset className="flex flex-col gap-3">
                  <legend className="sr-only">Filter by material grade</legend>
                  {materialGrades.map((grade) => {
                    const checked = selectedGrades.includes(grade);
                    const count = sampleProducts.filter((product) => product.material === grade).length;
                    return (
                      <label key={grade} className="flex cursor-pointer items-center gap-3 text-sm text-[#596166]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => setGradeFilter(grade, event.target.checked)}
                          className="size-4 accent-[#ef6b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        />
                        <span>{grade}</span>
                        <span className="ml-auto font-mono text-[10px] text-[#959da1]">{count}</span>
                      </label>
                    );
                  })}
                </fieldset>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="availability" className="px-4 sm:px-5">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#343c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  Availability
                  <ChevronDown aria-hidden="true" className="size-4 text-[#7a8286] transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden pb-5">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#596166]">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(event) => setOnlyInStock(event.target.checked)}
                    className="size-4 accent-[#ef6b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                  <span>In Stock</span>
                  <span className="ml-auto font-mono text-[10px] text-[#959da1]">{sampleProducts.filter((product) => product.inStock).length}</span>
                </label>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 flex flex-col gap-4 border-b border-[#d9dddf] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a8286]">Precision tooling catalog</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#171d21]">{visibleProducts.length} sample {visibleProducts.length === 1 ? "product" : "products"}</h2>
            </div>
            <label className="flex items-center gap-3 text-[11px] font-medium text-[#70787d]">
              Sort by
              <select
                aria-label="Sort products"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                className="h-10 min-w-[172px] border border-[#d0d5d7] bg-white px-3 text-xs text-[#293136] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>

          {visibleProducts.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
              {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-[#cbd0d2] bg-white px-6 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a8286]">No matching tools</p>
              <p className="mt-2 max-w-sm text-sm text-[#596166]">Adjust or clear your filters to see more sample catalog items.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 bg-primary px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#14191d] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
