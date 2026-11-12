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
    {
      label: "Shank size",
      value: findSpec(product, ["Shank size"]) ?? (isHolder ? "Not provided in sample catalog" : "Not applicable to this item"),
    },
    {
      label: "Overall length",
      value: findSpec(product, ["Overall length"]) ?? "Not provided in sample catalog",
    },
    {
      label: "Insert compatibility",
      value: insertCompatibility ?? (isInsert || isEndMill ? "Not applicable to this item" : "Not provided in sample catalog"),
    },
    {
      label: "Material",
      value: material ? `${material}${product.material ? " · sample data" : ""}` : "Not specified in sample catalog",
    },
  ];
}

export function ProductSpecificationTable({ product }: { product: CatalogProduct }) {
  const keySpecifications = getKeySpecifications(product);
  const consumedLabels = new Set(["shank size", "overall length", "insert compatibility", "insert family", "material"]);
  if (!product.material && !findSpec(product, ["Material"])) consumedLabels.add("grade");
  const additionalSpecifications = product.specs.filter((specification) => !consumedLabels.has(specification.label.toLowerCase()));

  return (
    <section aria-labelledby="technical-specifications-title" className="border border-[#d9dddf] bg-white">
      <div className="border-b border-[#d9dddf] bg-[#171e23] px-4 py-4 text-white sm:px-6">
        <p className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
          <Ruler aria-hidden="true" className="size-3.5 text-primary" /> Dimensions &amp; fit
        </p>
        <h2 id="technical-specifications-title" className="text-lg font-semibold tracking-tight sm:text-xl">Technical specifications</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {keySpecifications.map((specification, index) => (
          <div key={specification.label} className={`min-h-[88px] px-4 py-4 sm:px-6 ${index < 2 ? "border-b border-[#e6e8e9]" : ""} ${index % 2 === 0 ? "sm:border-r sm:border-r-[#e6e8e9]" : ""}`}>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#7a8286]">{specification.label}</p>
            <p className="mt-2 text-sm font-semibold leading-5 text-[#171d21]">{specification.value}</p>
          </div>
        ))}
      </div>

      {additionalSpecifications.length > 0 && (
        <div className="border-t border-[#d9dddf]">
          <h3 className="px-4 pb-1 pt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[#70787d] sm:px-6">Additional item specifications</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Additional technical specifications for {product.name}</caption>
              <tbody>
                {additionalSpecifications.map((specification) => (
                  <tr key={specification.label} className="border-b border-[#e6e8e9] last:border-b-0">
                    <th scope="row" className="w-[42%] px-4 py-3 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-[#7a8286] sm:w-1/3 sm:px-6">{specification.label}</th>
                    <td className="px-4 py-3 text-sm leading-5 text-[#343c40] sm:px-6">{specification.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
