export type FallbackProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: { id: string; name: string; slug: string };
  brand?: string;
  description: string;
  basePrice: number;
  discountPrice?: number;
  isFeatured: boolean;
  inStock: boolean;
  media: { id: string; url: string; mediaType: "image" | "video"; sortOrder: number }[];
  specifications: { label: string; value: string }[];
};

export const FALLBACK_CATEGORIES = [
  { id: "cat-turning", name: "Turning Tools", slug: "turning-tools" },
  { id: "cat-milling", name: "Milling Tools", slug: "milling-tools" },
  { id: "cat-drilling", name: "Drilling Tools", slug: "drilling-tools" },
  { id: "cat-holders", name: "CNC Tool Holders", slug: "cnc-tool-holders" },
  { id: "cat-inserts", name: "Cutting Inserts", slug: "cutting-inserts" },
  { id: "cat-jaws", name: "Lathe Jaws", slug: "lathe-jaws" },
  { id: "cat-accessories", name: "Machine Accessories", slug: "machine-accessories" },
];

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: "cnmg-120404",
    name: "CNMG 120404 Carbide Insert",
    slug: "cnmg-120404",
    sku: "RBS-CI-CNMG-120404",
    brand: "Rabines Precision",
    category: { id: "cat-inserts", name: "Cutting Inserts", slug: "cutting-inserts" },
    description: "High-precision indexable CNMG 120404 carbide turning inserts engineered for steel and cast iron machining.",
    basePrice: 1450,
    discountPrice: 1350,
    isFeatured: true,
    inStock: true,
    media: [
      { id: "m-1", url: "/images/categories/shop-cnc-turning-inserts.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Insert geometry", value: "CNMG 12 04 04" },
      { label: "Grade", value: "Carbide · P25 / P35" },
      { label: "Coating", value: "TiCN / Al2O3" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "cnmg-120408",
    name: "CNMG 120408 Carbide Insert",
    slug: "cnmg-120408",
    sku: "RBS-CI-CNMG-120408",
    brand: "Rabines Precision",
    category: { id: "cat-inserts", name: "Cutting Inserts", slug: "cutting-inserts" },
    description: "Heavy-duty CNMG 120408 indexable carbide insert with 0.8mm nose radius for medium to rough turning passes.",
    basePrice: 1580,
    discountPrice: 1480,
    isFeatured: true,
    inStock: true,
    media: [
      { id: "m-2", url: "/images/categories/shop-cnc-turning-inserts.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Insert geometry", value: "CNMG 12 04 08" },
      { label: "Grade", value: "Carbide · P25 / P35" },
      { label: "Application", value: "General-purpose turning" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "mclnr-2020k12",
    name: "MCLNR 2020K12 Turning Tool Holder",
    slug: "mclnr-2020k12",
    sku: "RBS-TH-MCLNR-2020K12",
    brand: "Rabines Precision",
    category: { id: "cat-holders", name: "CNC Tool Holders", slug: "cnc-tool-holders" },
    description: "Rigid square shank external turning tool holder for CNMG inserts with high clamping force.",
    basePrice: 2890,
    discountPrice: 2650,
    isFeatured: true,
    inStock: true,
    media: [
      { id: "m-3", url: "/images/categories/shop-cnc-turning-holder.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Shank size", value: "20 × 20 mm" },
      { label: "Insert family", value: "CNMG 1204" },
      { label: "Clamping", value: "Top clamp" },
      { label: "Application", value: "External turning" },
    ],
  },
  {
    id: "wnmg-080408",
    name: "WNMG 080408 Carbide Insert",
    slug: "wnmg-080408",
    sku: "RBS-CI-WNMG-080408",
    brand: "Rabines Precision",
    category: { id: "cat-inserts", name: "Cutting Inserts", slug: "cutting-inserts" },
    description: "Trigon double-sided WNMG 080408 turning insert with 6 cutting edges for superior economy.",
    basePrice: 1720,
    discountPrice: 1620,
    isFeatured: false,
    inStock: true,
    media: [
      { id: "m-4", url: "/images/categories/shop-cnc-turning-inserts.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Insert geometry", value: "WNMG 08 04 08" },
      { label: "Grade", value: "Carbide · M20 / P25" },
      { label: "Application", value: "Finishing and medium turning" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "apkt-1604",
    name: "APKT 1604 Milling Insert",
    slug: "apkt-1604",
    sku: "RBS-MI-APKT-1604",
    brand: "Rabines Precision",
    category: { id: "cat-milling", name: "Milling Tools", slug: "milling-tools" },
    description: "Positive rake APKT 1604 indexable shoulder milling insert providing smooth low-resistance cutting.",
    basePrice: 1920,
    discountPrice: 1790,
    isFeatured: true,
    inStock: true,
    media: [
      { id: "m-5", url: "/images/categories/shop-cnc-milling-inserts.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Insert geometry", value: "APKT 16 04" },
      { label: "Grade", value: "Carbide · P30" },
      { label: "Cutting style", value: "Positive rake" },
      { label: "Pack size", value: "10 inserts" },
    ],
  },
  {
    id: "endmill-10mm",
    name: "4-Flute Solid Carbide End Mill · 10 mm",
    slug: "endmill-10mm",
    sku: "RBS-ME-4F-10",
    brand: "Rabines Precision",
    category: { id: "cat-milling", name: "Milling Tools", slug: "milling-tools" },
    description: "Micro-grain solid carbide 4-flute end mill with AlTiN coating for high-speed side milling.",
    basePrice: 2950,
    discountPrice: 2700,
    isFeatured: true,
    inStock: true,
    media: [
      { id: "m-6", url: "/images/categories/shop-cnc-carbide-endmill.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Cutting diameter", value: "10 mm" },
      { label: "Flutes", value: "4" },
      { label: "Material", value: "Solid carbide" },
      { label: "Application", value: "Milling and profiling" },
    ],
  },
  {
    id: "er32-collet-set",
    name: "ER32 Collet Chuck Set",
    slug: "er32-collet-set",
    sku: "RBS-CH-ER32-SET",
    brand: "Rabines Precision",
    category: { id: "cat-accessories", name: "Machine Accessories", slug: "machine-accessories" },
    description: "BT40 ER32 precision collet chuck holder kit complete with spanner wrench and collets.",
    basePrice: 5470,
    discountPrice: 4990,
    isFeatured: true,
    inStock: true,
    media: [
      { id: "m-7", url: "/images/categories/shop-cnc-collet-chuck.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "System", value: "ER32" },
      { label: "Holder interface", value: "BT40" },
      { label: "Included", value: "Chuck, collets, nut & wrench" },
      { label: "Application", value: "Milling and drilling" },
    ],
  },
  {
    id: "hss-drill-10mm",
    name: "HSS Twist Drill · 10 mm",
    slug: "hss-drill-10mm",
    sku: "RBS-DR-HSS-10",
    brand: "Rabines Precision",
    category: { id: "cat-drilling", name: "Drilling Tools", slug: "drilling-tools" },
    description: "Industrial high-speed steel twist drill with 118-degree point angle.",
    basePrice: 590,
    discountPrice: 520,
    isFeatured: false,
    inStock: true,
    media: [
      { id: "m-8", url: "/images/categories/shop-hss-drills.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Diameter", value: "10 mm" },
      { label: "Material", value: "High-speed steel (HSS)" },
      { label: "Point angle", value: "118°" },
      { label: "Application", value: "General-purpose drilling" },
    ],
  },
  {
    id: "hss-center-drill-3mm",
    name: "HSS Center Drill · 3 mm",
    slug: "hss-center-drill-3mm",
    sku: "RBS-DR-HSS-CD3",
    brand: "Rabines Precision",
    category: { id: "cat-drilling", name: "Drilling Tools", slug: "drilling-tools" },
    description: "Double-ended 60-degree high-speed steel combined drill and countersink for lathe center hole locating.",
    basePrice: 360,
    discountPrice: 320,
    isFeatured: false,
    inStock: true,
    media: [
      { id: "m-9", url: "/images/categories/shop-hss-drills.png", mediaType: "image", sortOrder: 0 }
    ],
    specifications: [
      { label: "Diameter", value: "3 mm" },
      { label: "Material", value: "High-speed steel (HSS)" },
      { label: "Form", value: "Combined drill and countersink" },
      { label: "Application", value: "Centering and starting holes" },
    ],
  },
];

export const FALLBACK_REVIEWS = [
  {
    id: "rev-1",
    customerName: "Subhasis Mondal",
    location: "Baltikuri Industrial Area, Howrah",
    rating: 5,
    text: "The CNMG 120408 inserts we ordered for our lathe shop lasted nearly 30% longer on EN8 steel than the previous brand. Consistent tool quality and on-time delivery across Howrah.",
    adminReply: "Thank you Subhasis! Glad the carbide grade delivered superior tool life for your machining runs.",
    isVerified: true,
    createdAt: "2024-02-12T10:00:00.000Z",
  },
  {
    id: "rev-2",
    customerName: "Rajesh Sharma",
    location: "Kolkata Leather Complex, Bantala",
    rating: 5,
    text: "Ordered ER32 collet sets and turning tool holders. Runout is well within 0.005mm and clamping rigidity is solid. Outstanding technical guidance from the Rabines team.",
    adminReply: "Appreciate the feedback, Rajesh. Looking forward to supporting your upcoming tooling batches.",
    isVerified: true,
    createdAt: "2024-03-01T14:30:00.000Z",
  },
];
