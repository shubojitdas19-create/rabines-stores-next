import type { MetadataRoute } from "next";
import { getStoreCategories, getStoreProducts } from "@/lib/api/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rabinesstores.in";
  const now = new Date();

  // 1. Core High-Priority Landing & Hub Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop/tool-holders`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 2. Dynamic Product Pages (All CNC tool holders, inserts, end mills, etc.)
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getStoreProducts();
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/shop/tool-holders/${product.slug || product.id}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Failed to generate product sitemap entries:", error);
  }

  // 3. Category Query Routes
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await getStoreCategories();
    categoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/shop/tool-holders?category=${encodeURIComponent(cat.slug || cat.name)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to generate category sitemap entries:", error);
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
