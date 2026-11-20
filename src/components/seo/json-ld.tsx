import type { Product } from "@/lib/api/client";

const BASE_URL = "https://rabinesstores.in";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${BASE_URL}/#organization`,
    name: "Rabines Stores",
    legalName: "Rabines Precision Engineering & Stores",
    alternateName: ["Rabines Precision", "Rabines CNC Tools", "Rabines Engineering"],
    url: BASE_URL,
    logo: `${BASE_URL}/images/rabines-logo.png`,
    image: `${BASE_URL}/images/cnc-machining-hero.png`,
    description:
      "Premier manufacturer and supplier of precision CNC tool holders, carbide turning & milling inserts, solid carbide end mills, and custom engineering machining solutions across India.",
    telephone: "+91-9002156266",
    email: "storesrabines@gmail.com",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash on Delivery, UPI, Net Banking, Debit Card, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrial Estate, Dasnagar",
      addressLocality: "Howrah",
      addressRegion: "West Bengal",
      postalCode: "711105",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.5958,
      longitude: 88.2636,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "CNC Tool Holders",
      "Carbide Inserts",
      "End Mills",
      "Collet Chucks",
      "CNC Turning",
      "VMC Milling",
      "Precision Engineering",
      "G-Code CNC Programming",
      "CAD/CAM Drawings",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9002156266",
      contactType: "sales and customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Bengali"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Rabines Stores",
    alternateName: "Rabines Stores - Precision CNC Tooling & Machining",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/shop/tool-holders?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const price =
    typeof product.basePrice === "number"
      ? product.basePrice
      : parseFloat(product.basePrice || "0");
  const productUrl = `${BASE_URL}/shop/tool-holders/${product.slug || product.id}`;
  const images =
    product.media && product.media.length > 0
      ? product.media.map((m) => (m.url.startsWith("http") ? m.url : `${BASE_URL}${m.url}`))
      : [`${BASE_URL}/images/categories/cnc-tool-holders.png`];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    image: images,
    description:
      product.description ||
      `Industrial-grade ${product.name} manufactured by Rabines Precision. Engineered for high rigidity, precision tolerances, and extended tool life on CNC turning and milling centers.`,
    sku: product.sku || product.slug || product.id,
    mpn: product.sku || product.slug || product.id,
    brand: {
      "@type": "Brand",
      name: product.brand || "Rabines Precision",
    },
    category: product.category?.name || "CNC Tooling & Inserts",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "28",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: price.toFixed(2),
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Rabines Stores",
        url: BASE_URL,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "150.00",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "d",
          },
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Precision CNC Machining, Programming & CAD/CAM Engineering",
    provider: {
      "@type": "Store",
      name: "Rabines Stores",
      url: BASE_URL,
      telephone: "+91-9002156266",
      email: "storesrabines@gmail.com",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Industrial Machining & Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Precision CNC Machining & Turning Job Work",
            description: "High-precision CNC lathe turning and 3-axis / 4-axis VMC milling job work with tight dimensional tolerances (±0.005 mm).",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CNC G-Code Programming & Cycle Optimization",
            description: "Production-ready G-code generation, cycle time reduction, toolpath simulation for Fanuc, Siemens, and Haas CNC controls.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "2D & 3D CAD/CAM Drawing & Prototyping",
            description: "Manufacturing-grade 2D engineering drawings with GD&T and 3D parametric CAD modeling from customer sketches or samples.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ItemListJsonLd({
  items,
  name,
}: {
  items: { name: string; url: string; price?: number | string; image?: string }[];
  name: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
      ...(item.image ? { image: item.image.startsWith("http") ? item.image : `${BASE_URL}${item.image}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
