export type ToolCategory = "Turning" | "Milling" | "Drilling";
export type MaterialGrade = "Carbide" | "HSS";

export type CatalogProduct = {
  id: string;
  name: string;
  sku: string;
  category: ToolCategory;
  material?: MaterialGrade;
  inStock: boolean;
  price: number;
  priceUnit: string;
  image: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
};

export const toolCategories: ToolCategory[] = ["Turning", "Milling", "Drilling"];
export const materialGrades: MaterialGrade[] = ["Carbide", "HSS"];

export const sampleProducts: CatalogProduct[] = [
  {
    id: "cnmg-120404",
    name: "CNMG 120404 Carbide Insert",
    sku: "RBS-CI-CNMG-120404",
    category: "Turning",
    material: "Carbide",
    inStock: true,
    price: 1450,
    priceUnit: "10 pcs / pack",
    image: "/images/categories/shop-cnc-turning-inserts.png",
    imageAlt: "CNC turning insert and carbide inserts on a light gray studio background",
    specs: [
      { label: "Insert geometry", value: "CNMG 12 04 04" },
      { label: "Grade", value: "Carbide · P25 / P35 sample" },
      { label: "Coating", value: "TiCN / Al₂O₃ sample" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "cnmg-120408",
    name: "CNMG 120408 Carbide Insert",
    sku: "RBS-CI-CNMG-120408",
    category: "Turning",
    material: "Carbide",
    inStock: true,
    price: 1580,
    priceUnit: "10 pcs / pack",
    image: "/images/categories/shop-cnc-turning-inserts.png",
    imageAlt: "Indexable carbide turning insert set on a light gray studio background",
    specs: [
      { label: "Insert geometry", value: "CNMG 12 04 08" },
      { label: "Grade", value: "Carbide · P25 / P35 sample" },
      { label: "Application", value: "General-purpose turning" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "mclnr-2020k12",
    name: "MCLNR 2020K12 Turning Tool Holder",
    sku: "RBS-TH-MCLNR-2020K12",
    category: "Turning",
    inStock: true,
    price: 2890,
    priceUnit: "per holder",
    image: "/images/categories/shop-cnc-turning-holder.png",
    imageAlt: "Square-shank CNC turning tool holder on a light gray studio background",
    specs: [
      { label: "Shank size", value: "20 × 20 mm sample" },
      { label: "Insert family", value: "CNMG sample" },
      { label: "Clamping", value: "Top clamp sample" },
      { label: "Application", value: "External turning" },
    ],
  },
  {
    id: "wnmg-080408",
    name: "WNMG 080408 Carbide Insert",
    sku: "RBS-CI-WNMG-080408",
    category: "Turning",
    material: "Carbide",
    inStock: false,
    price: 1720,
    priceUnit: "10 pcs / pack",
    image: "/images/categories/shop-cnc-turning-inserts.png",
    imageAlt: "Indexable carbide inserts with precision cutting edges on a light gray background",
    specs: [
      { label: "Insert geometry", value: "WNMG 08 04 08" },
      { label: "Grade", value: "Carbide · M20 / P25 sample" },
      { label: "Application", value: "Finishing and medium turning" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "apkt-1604",
    name: "APKT 1604 Milling Insert",
    sku: "RBS-MI-APKT-1604",
    category: "Milling",
    material: "Carbide",
    inStock: true,
    price: 1920,
    priceUnit: "10 pcs / pack",
    image: "/images/categories/shop-cnc-milling-inserts.png",
    imageAlt: "Indexable carbide milling inserts and face mill on a light gray background",
    specs: [
      { label: "Insert geometry", value: "APKT 16 04 sample" },
      { label: "Grade", value: "Carbide · P30 sample" },
      { label: "Cutting style", value: "Positive rake sample" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "endmill-10mm",
    name: "4-Flute Solid Carbide End Mill · 10 mm",
    sku: "RBS-ME-4F-10",
    category: "Milling",
    material: "Carbide",
    inStock: true,
    price: 2950,
    priceUnit: "per tool",
    image: "/images/categories/shop-cnc-carbide-endmill.png",
    imageAlt: "Solid carbide four-flute end mill on a light gray studio background",
    specs: [
      { label: "Cutting diameter", value: "10 mm sample" },
      { label: "Flutes", value: "4" },
      { label: "Material", value: "Solid carbide sample" },
      { label: "Application", value: "Milling and profiling" },
    ],
  },
  {
    id: "er32-collet-set",
    name: "ER32 Collet Chuck Set",
    sku: "RBS-CH-ER32-SET",
    category: "Milling",
    inStock: true,
    price: 5470,
    priceUnit: "per set",
    image: "/images/categories/shop-cnc-collet-chuck.png",
    imageAlt: "Precision ER-style collet chuck and collets on a light gray studio background",
    specs: [
      { label: "System", value: "ER32 sample" },
      { label: "Holder interface", value: "BT40 sample" },
      { label: "Included", value: "Chuck and 3 collets" },
      { label: "Application", value: "Milling and drilling" },
    ],
  },
  {
    id: "hss-drill-10mm",
    name: "HSS Twist Drill · 10 mm",
    sku: "RBS-DR-HSS-10",
    category: "Drilling",
    material: "HSS",
    inStock: true,
    price: 590,
    priceUnit: "per drill",
    image: "/images/categories/shop-hss-drills.png",
    imageAlt: "Polished HSS twist drills on a light gray studio background",
    specs: [
      { label: "Diameter", value: "10 mm sample" },
      { label: "Material", value: "High-speed steel sample" },
      { label: "Point angle", value: "118° sample" },
      { label: "Application", value: "General-purpose drilling" },
    ],
  },
  {
    id: "hss-center-drill-3mm",
    name: "HSS Center Drill · 3 mm",
    sku: "RBS-DR-HSS-CD3",
    category: "Drilling",
    material: "HSS",
    inStock: false,
    price: 360,
    priceUnit: "per drill",
    image: "/images/categories/shop-hss-drills.png",
    imageAlt: "Polished high-speed steel center drill on a light gray studio background",
    specs: [
      { label: "Diameter", value: "3 mm sample" },
      { label: "Material", value: "High-speed steel sample" },
      { label: "Form", value: "Combined drill and countersink" },
      { label: "Application", value: "Centering and starting holes" },
    ],
  },
];
