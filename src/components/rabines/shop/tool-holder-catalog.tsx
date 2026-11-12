"use client";

import { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, ChevronDown, ListFilter, RotateCcw, Search, X } from "lucide-react";
import { ProductCard } from "@/components/rabines/shop/product-card";
import { materialGrades, sampleProducts, toolCategories } from "@/components/rabines/shop/catalog-data";
import type { MaterialGrade, ToolCategory } from "@/components/rabines/shop/catalog-data";

type SortOrder = "featured" | "price-low" | "price-high" | "name";

type FilterProps = {
  selectedCategories: ToolCategory[];
  selectedGrades: MaterialGrade[];
  onlyInStock: boolean;
  activeFilterCount: number;
  setCategoryFilter: (category: ToolCategory, checked: boolean) => void;
  setGradeFilter: (grade: MaterialGrade, checked: boolean) => void;
  setOnlyInStock: (checked: boolean) => void;
  clearFilters: () => void;
};

function FilterPanelHeader({ activeFilterCount, clearFilters }: Pick<FilterProps, "activeFilterCount" | "clearFilters">) {
  return (
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
        className="inline-flex min-h-9 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#737b80] transition-colors hover:text-[#d85f2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <RotateCcw aria-hidden="true" className="size-3" />
        Clear
      </button>
    </div>
  );
}

function FilterSections({
  selectedCategories,
  selectedGrades,
  onlyInStock,
  setCategoryFilter,
  setGradeFilter,
  setOnlyInStock,
  compact = false,
}: FilterProps & { compact?: boolean }) {
  return (
    <Accordion.Root type="multiple" defaultValue={compact ? [] : ["tool-category", "material-grade", "availability"]}>
      <Accordion.Item value="tool-category" className="border-b border-[#e6e8e9] px-4 sm:px-5">
        <Accordion.Header>
          <Accordion.Trigger className="group flex min-h-12 w-full items-center justify-between py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#343c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
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
                <label key={category} className="flex min-h-8 cursor-pointer items-center gap-3 text-sm text-[#596166]">
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
          <Accordion.Trigger className="group flex min-h-12 w-full items-center justify-between py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#343c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
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
                <label key={grade} className="flex min-h-8 cursor-pointer items-center gap-3 text-sm text-[#596166]">
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
          <Accordion.Trigger className="group flex min-h-12 w-full items-center justify-between py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[#343c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Availability
            <ChevronDown aria-hidden="true" className="size-4 text-[#7a8286] transition-transform group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden pb-5">
          <label className="flex min-h-8 cursor-pointer items-center gap-3 text-sm text-[#596166]">
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
  );
}

export function ToolHolderCatalog() {
  const [selectedCategories, setSelectedCategories] = useState<ToolCategory[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<MaterialGrade[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const filtered = sampleProducts.filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesGrade = selectedGrades.length === 0 || (product.material !== undefined && selectedGrades.includes(product.material));
      const matchesAvailability = !onlyInStock || product.inStock;
      const matchesSearch = !query || `${product.name} ${product.sku} ${product.category} ${product.material ?? ""}`.toLocaleLowerCase().includes(query);
      return matchesCategory && matchesGrade && matchesAvailability && matchesSearch;
    });

    if (sortOrder === "price-low") return filtered.sort((first, second) => first.price - second.price);
    if (sortOrder === "price-high") return filtered.sort((first, second) => second.price - first.price);
    if (sortOrder === "name") return filtered.sort((first, second) => first.name.localeCompare(second.name));
    return filtered;
  }, [onlyInStock, searchQuery, selectedCategories, selectedGrades, sortOrder]);

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
    setSearchQuery("");
  };

  const activeFilterCount = selectedCategories.length + selectedGrades.length + Number(onlyInStock) + Number(Boolean(searchQuery.trim()));
  const filterProps: FilterProps = {
    selectedCategories,
    selectedGrades,
    onlyInStock,
    activeFilterCount,
    setCategoryFilter,
    setGradeFilter,
    setOnlyInStock,
    clearFilters,
  };

  return (
    <section id="catalog" aria-label="CNC tool holder catalog" className="scroll-mt-6 bg-[#f2f4f4] text-[#171d21]">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-5 px-5 py-7 sm:px-8 sm:py-10 xl:grid-cols-[264px_minmax(0,1fr)] xl:gap-10 xl:px-16 xl:py-12">
        <aside aria-label="Product filters" className="hidden self-start border border-[#d9dddf] bg-white xl:sticky xl:top-6 xl:block">
          <FilterPanelHeader activeFilterCount={activeFilterCount} clearFilters={clearFilters} />
          <FilterSections {...filterProps} />
        </aside>

        <div className="min-w-0">
          <div className="mb-5 border-b border-[#d9dddf] pb-5">
            <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#7a8286]">Precision tooling catalog</p>
                <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-[#171d21] sm:text-2xl">
                  {visibleProducts.length} <span className="font-normal text-[#717a7f]">sample {visibleProducts.length === 1 ? "product" : "products"}</span>
                </h2>
              </div>
              <span className="hidden border-l-2 border-primary pl-3 font-mono text-[9px] uppercase leading-4 tracking-[0.1em] text-[#7a8286] sm:block">Browse by fit<br />and material</span>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search tools by name or SKU</span>
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#858c90]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search tool name or SKU"
                  className="h-11 w-full border border-[#d0d5d7] bg-white pl-10 pr-3 text-sm text-[#293136] outline-none transition-colors placeholder:text-[#9aa1a4] focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <div className="flex items-center gap-2.5 sm:shrink-0">
                <Dialog.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <Dialog.Trigger asChild>
                    <button type="button" className="inline-flex h-11 flex-1 items-center justify-center gap-2 border border-[#cbd1d3] bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#343c40] transition-colors hover:border-[#171d21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:hidden">
                      <ListFilter aria-hidden="true" className="size-4" />
                      Filters
                      {activeFilterCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-[#171d21] font-mono text-[9px] text-white">{activeFilterCount}</span>}
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-[#081014]/60 backdrop-blur-[2px]" />
                    <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto border-t border-[#d9dddf] bg-white pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl outline-none sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[min(26rem,92vw)] sm:border-l sm:border-t-0">
                      <div className="flex items-center justify-between gap-3 border-b border-[#e6e8e9] px-4 py-4 sm:px-6">
                        <div>
                          <Dialog.Title className="text-base font-semibold text-[#171d21]">Filter products</Dialog.Title>
                          <Dialog.Description className="mt-1 text-xs text-[#7a8286]">Choose a category, material, or availability.</Dialog.Description>
                        </div>
                        <Dialog.Close asChild>
                          <button type="button" aria-label="Close filters" className="grid size-10 shrink-0 place-items-center border border-[#d9dddf] text-[#596166] transition-colors hover:border-[#171d21] hover:text-[#171d21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            <X aria-hidden="true" className="size-4" />
                          </button>
                        </Dialog.Close>
                      </div>
                      <FilterPanelHeader activeFilterCount={activeFilterCount} clearFilters={clearFilters} />
                      <FilterSections {...filterProps} compact />
                      <div className="sticky bottom-0 border-t border-[#e6e8e9] bg-white p-4 sm:p-6">
                        <Dialog.Close asChild>
                          <button type="button" className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#171d21] px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#2d373d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            <Check aria-hidden="true" className="size-4 text-primary" />
                            Show {visibleProducts.length} {visibleProducts.length === 1 ? "result" : "results"}
                          </button>
                        </Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>

                <label className="flex h-11 min-w-0 flex-1 items-center justify-between gap-2 border border-[#d0d5d7] bg-white px-3 text-[10px] font-medium text-[#70787d] sm:min-w-[198px] sm:flex-none">
                  <span className="shrink-0">Sort</span>
                  <select
                    aria-label="Sort products"
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                    className="min-w-0 flex-1 bg-transparent text-xs text-[#293136] outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {visibleProducts.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
              {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-[#cbd0d2] bg-white px-6 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7a8286]">No matching tools</p>
              <p className="mt-2 max-w-sm text-sm text-[#596166]">Adjust your search or filters to see more sample catalog items.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 min-h-11 bg-primary px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#14191d] transition-colors hover:bg-[#ff8750] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
