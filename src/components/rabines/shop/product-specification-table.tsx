import { Ruler } from "lucide-react";
import type { CatalogProduct } from "@/components/rabines/shop/catalog-data";

function findSpec(product: CatalogProduct, labels: string[]) {
  const acceptedLabels = new Set(labels.map((label) => label.toLowerCase()));
  return product.specs.find((spec) => acceptedLabels.has(spec.label.toLowerCase()))?.value;
}

function getKeySpecifications(product: CatalogProduct) {
  const isHolder = product.name.toLowerCase().includes("holder");
  const isInsert = product.name.toLowerCase().includes("insert");
  const isEndMill = product.name.toLowerCase().includes("end mill");
  const material = product.material ?? findSpec(product, ["Material", "Grade"]);
  const insertCompatibility = findSpec(product, ["Insert compatibility", "Insert family"]);

  return [
    { label: "Shank size", value: findSpec(product, ["Shank size"]) ?? (isHolder ? "Not provided in sample catalog" : "Not applicable to this item") },
    { label: "Overall length", value: findSpec(product, ["Overall length"]) ?? "Not provided in sample catalog" },
    { label: "Insert compatibility", value: insertCompatibility ?? (isInsert || isEndMill ? "Not applicable to this item" : "Not provided in sample catalog") },
    { label: "Material", value: material ? `${material}${product.material ? " · sample data" : ""}` : "Not specified in sample catalog" },
  ];
}

export function ProductSpecificationTable({ product }: { product: CatalogProduct }) {
  const consumedLabels = new Set(["shank size", "overall length", "insert compatibility", "insert family", "material", "grade"]);
  const additionalSpecifications = product.specs.filter((specification) => !consumedLabels.has(specification.label.toLowerCase()));
  const specifications = [...getKeySpecifications(product), ...additionalSpecifications];

  return (
    <section aria-labelledby="technical-specifications-title" className="overflow-hidden border border-[#d9dddf] bg-white">
      <div className="flex items-center gap-4 border-b border-[#d9dddf] bg-[#171e23] px-4 py-4 text-white sm:px-6 sm:py-5">
        <span className="grid size-10 shrink-0 place-items-center border border-white/10 bg-white/5">
          <Ruler aria-hidden="true" className="size-4 text-primary" />
        </span>
        <div>
          <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-400">Dimensions &amp; fit</p>
          <h2 id="technical-specifications-title" className="text-lg font-semibold tracking-tight sm:text-xl">Technical specifications</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left">
          <caption className="sr-only">Technical specifications for {product.name}. Values are sample catalog data.</caption>
          <thead className="sr-only">
            <tr><th scope="col">Specification</th><th scope="col">Value</th></tr>
          </thead>
          <tbody>
            {specifications.map((specification, index) => (
              <tr key={specification.label} className={`border-b border-[#e6e8e9] last:border-b-0 ${index < 4 ? "bg-[#fbfbfa]" : ""}`}>
                <th scope="row" className="w-[42%] px-3 py-3.5 font-mono text-[8px] font-medium uppercase leading-4 tracking-[0.08em] text-[#717a7f] sm:w-1/3 sm:px-6 sm:py-4 sm:text-[9px] sm:tracking-[0.1em]">{specification.label}</th>
                <td className="px-3 py-3.5 text-xs font-medium leading-5 text-[#252d32] sm:px-6 sm:py-4 sm:text-sm">{specification.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-[#e6e8e9] bg-[#f7f8f8] px-4 py-3 text-[10px] leading-5 text-[#717a7f] sm:px-6">
        Values shown are illustrative sample data. Confirm manufacturer dimensions, grade, and compatibility before ordering.
      </p>
    </section>
  );
}
