import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/rabines/cart/cart-drawer";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#11171c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rabinesstores.in"),
  title: {
    default: "Rabines Stores | Precision CNC Tool Holders, Carbide Inserts & Machining",
    template: "%s | Rabines Stores",
  },
  description:
    "Rabines Stores is India's premier manufacturer and supplier of precision CNC tool holders, carbide turning & milling inserts, solid carbide end mills, and custom machining job work. Serving machine shops and manufacturers nationwide from Howrah, West Bengal.",
  applicationName: "Rabines Stores",
  authors: [{ name: "Rabines Precision Engineering", url: "https://rabinesstores.in" }],
  generator: "Next.js",
  keywords: [
    // Brand Variations
    "Rabines Stores",
    "Rabines Precision",
    "Rabines CNC Tools",
    "Rabines Engineering Howrah",
    "Rabines Tools India",
    // CNC Tool Holders
    "CNC tool holders",
    "turning tool holder",
    "external turning holder",
    "MCLNR 2020K12",
    "milling chuck",
    "collet chuck set",
    "ER32 collet chuck",
    "BT40 tool holder",
    "BT50 tool holder",
    "boring bars",
    "side lock holders",
    // Carbide Inserts & Cutting Tools
    "carbide inserts",
    "carbide turning inserts",
    "carbide milling inserts",
    "CNMG 120408 insert",
    "CNMG 120404 insert",
    "WNMG 080408 insert",
    "APKT 1604 milling insert",
    "solid carbide end mill",
    "4 flute carbide end mill",
    "HSS twist drill",
    "HSS center drill",
    // Machining Services & Job Work
    "precision CNC machining services",
    "CNC lathe turning job work Howrah",
    "VMC milling job work Kolkata",
    "CNC programming solutions",
    "Fanuc G-code optimization",
    "Siemens CNC programming",
    "CAD CAM 2D 3D engineering drawings",
    "custom lathe soft jaws",
    // B2B & Commercial Search Terms
    "CNC tools manufacturer India",
    "buy CNC tooling online India",
    "industrial tooling supplier",
    "machine shop supplies India",
    "cutting tools wholesale Howrah",
    "precision engineering tools",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Rabines Precision",
  publisher: "Rabines Stores",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Rabines Stores | Precision CNC Tool Holders, Carbide Inserts & Machining",
    description:
      "Industrial-grade CNC tool holders, carbide inserts, end mills, and precision machining job work. Tested for high rigidity and precision tolerances. Fast dispatch across India.",
    url: "https://rabinesstores.in",
    siteName: "Rabines Stores",
    images: [
      {
        url: "/images/cnc-machining-hero.png",
        width: 1200,
        height: 630,
        alt: "Rabines Stores - Precision CNC Tooling & Machining Solutions",
      },
      {
        url: "/images/rabines-logo.png",
        width: 600,
        height: 600,
        alt: "Rabines Stores Brand Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabines Stores | Precision CNC Tool Holders & Machining",
    description:
      "Industrial CNC tool holders, carbide inserts, end mills, and precision machining services across India. Order online or request quotes via WhatsApp.",
    images: ["/images/cnc-machining-hero.png"],
    creator: "@rabinesstores",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/rabines-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/rabines-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "Industrial & Scientific > CNC Tooling & Precision Machining",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
