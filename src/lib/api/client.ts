import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS, FALLBACK_REVIEWS } from "./fallback-data";

export type ProductMedia = {
  id: string;
  url: string;
  mediaType: "image" | "video";
  sortOrder: number;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  sku?: string | null;
  priceOverride?: string | number | null;
  stockQuantity: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  description: string | null;
  basePrice: string | number;
  discountPrice?: string | number | null;
  isFeatured: boolean;
  categoryId: string | null;
  category?: ProductCategory | null;
  media: ProductMedia[];
  variants?: ProductVariant[];
  specifications?: ProductSpecification[] | null;
  brand?: string | null;
  inStock?: boolean;
};

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
};

export type StoreReview = {
  id: string;
  customerName: string;
  location?: string | null;
  rating: number;
  text: string;
  adminReply?: string | null;
  isVerified: boolean;
  createdAt: string;
};

export type StoreSettings = {
  storeName?: string;
  currency?: string;
  themeColor?: string;
  isCodEnabled: boolean;
  paymentProvider: string;
  flatShippingRate?: string | number;
  gatewayKeyId?: string | null;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const STORE_ID = process.env.STORE_ID || process.env.NEXT_PUBLIC_STORE_ID || "9d075f24-8d07-4af7-a59d-e9b60ec936e4";
const STORE_SLUG = process.env.NEXT_PUBLIC_STORE_SLUG || "rabines-stores";

export async function fetchStorefront(endpoint: string, options?: RequestInit) {
  if (!STORE_ID) {
    console.warn("STORE_ID is missing from environment variables.");
    return null;
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const separator = cleanEndpoint.includes("?") ? "&" : "?";
  const url = `${BACKEND_URL}/api/storefront/${cleanEndpoint}${separator}storeId=${STORE_ID}`;

  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    };

    if (typeof window === "undefined") {
      Object.assign(fetchOptions, { next: { revalidate: 30 } });
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      console.warn(`[Storefront API] ${cleanEndpoint} returned status ${response.status}`);
      return null;
    }

    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.warn(`[Storefront API] Notice for ${cleanEndpoint}:`, (error as Error)?.message || error);
    return null;
  }
}

// 1. Fetch Products
export async function getStoreProducts(categorySlug?: string, limit: number = 30, search?: string, sortBy?: string): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (categorySlug && categorySlug !== "all" && categorySlug !== "All") query.append("category", categorySlug);
    if (search) query.append("q", search);
    if (sortBy) query.append("sortBy", sortBy);
    query.append("limit", limit.toString());

    const data = await fetchStorefront(`products?${query.toString()}`);
    if (Array.isArray(data) && data.length > 0) {
      return data.map((p) => normalizeProduct(p));
    }
  } catch {
    // Handled below with fallback
  }

  // Fallback
  let filtered = [...FALLBACK_PRODUCTS];
  if (categorySlug && categorySlug !== "all" && categorySlug !== "All") {
    filtered = filtered.filter((p) => p.category?.slug === categorySlug || p.category?.name.toLowerCase().includes(categorySlug.toLowerCase()));
  }
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term));
  }
  return filtered.map((p) => normalizeProduct(p as unknown as Product));
}

// 2. Fetch Single Product
export async function getStoreProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await fetchStorefront(`products?slug=${slug}`);
    if (Array.isArray(data) && data.length > 0) return normalizeProduct(data[0]);
    if (data && typeof data === "object" && !Array.isArray(data)) return normalizeProduct(data);
  } catch {
    // Handled below with fallback
  }

  const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  return fallback ? normalizeProduct(fallback as unknown as Product) : null;
}

// 3. Fetch Categories
export async function getStoreCategories(): Promise<StoreCategory[]> {
  try {
    const data = await fetchStorefront("filters");
    if (data && Array.isArray(data.categories) && data.categories.length > 0) {
      return data.categories;
    }
  } catch {
    // Handled below with fallback
  }

  return FALLBACK_CATEGORIES;
}

// 4. Fetch Store Settings
export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/storefront/${STORE_SLUG}/settings`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Default fallback
  }

  return {
    storeName: "Rabines Stores",
    currency: "INR",
    isCodEnabled: true,
    paymentProvider: "none",
    flatShippingRate: 150,
  };
}

// 5. Fetch Reviews
export async function getStoreReviews(): Promise<StoreReview[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/storefront/${STORE_SLUG}/reviews`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Handled below with fallback
  }

  return FALLBACK_REVIEWS;
}

// 6. Submit Review
export async function submitStoreReview(payload: {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  rating: number;
  text: string;
  productId?: string;
}) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/storefront/${STORE_SLUG}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (e) {
    console.error("Failed to submit review:", e);
    return { success: false, error: "Network error submitting review" };
  }
}

// 7. Submit Checkout Order
export async function submitStoreOrder(payload: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  totalAmount: number;
  paymentMethod: "COD" | "ONLINE";
  items: { productId: string; variantId?: string; quantity: number; price: number }[];
}) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/storefront/${STORE_SLUG}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (e) {
    console.error("Failed to submit order:", e);
    return { success: false, error: "Failed to connect to checkout service." };
  }
}

// 8. Submit Lead to Tenant Portal
export async function submitStoreLead(payload: {
  name: string;
  phone: string;
  address?: string;
  message?: string;
}) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/storefront/${STORE_SLUG}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        address: payload.address?.trim() || "Howrah, West Bengal",
        message: payload.message?.trim() || "",
      }),
    });
    return await res.json();
  } catch (e) {
    console.error("Failed to submit lead:", e);
    return { success: false, error: "Network error submitting consultation request" };
  }
}

// Helper to normalize product format
function normalizeProduct(raw: unknown): Product {
  const p = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  let specs: ProductSpecification[] = [];
  if (typeof p.specifications === "string") {
    try {
      specs = JSON.parse(p.specifications);
    } catch {
      specs = [];
    }
  } else if (Array.isArray(p.specifications)) {
    specs = p.specifications as ProductSpecification[];
  }

  const variants = Array.isArray(p.variants) ? (p.variants as ProductVariant[]) : [];
  const firstVariant = variants.length > 0 ? variants[0] : null;
  const sku = firstVariant?.sku || (typeof p.sku === "string" ? p.sku : `RBS-${String(p.slug || "").toUpperCase()}`);
  const inStock = firstVariant ? firstVariant.stockQuantity > 0 : Boolean(p.inStock ?? true);
  const media = Array.isArray(p.media) && p.media.length > 0 ? (p.media as ProductMedia[]) : [{ id: "def", url: "/images/categories/shop-cnc-turning-inserts.png", mediaType: "image" as const, sortOrder: 0 }];

  return {
    id: String(p.id || ""),
    name: String(p.name || ""),
    slug: String(p.slug || ""),
    sku,
    description: typeof p.description === "string" ? p.description : null,
    basePrice: Number(p.basePrice || 0),
    discountPrice: p.discountPrice ? Number(p.discountPrice) : undefined,
    isFeatured: Boolean(p.isFeatured),
    categoryId: typeof p.categoryId === "string" ? p.categoryId : null,
    category: (p.category && typeof p.category === "object" ? p.category : null) as ProductCategory | null,
    brand: typeof p.brand === "string" ? p.brand : "Rabines Precision",
    media,
    variants,
    specifications: specs,
    inStock,
  };
}
