import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rabines Stores | Precision CNC Tooling & Machining",
    short_name: "Rabines Stores",
    description: "Industrial CNC tool holders, carbide turning & milling inserts, solid carbide end mills, and precision machining solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#11171c",
    theme_color: "#ef6b32",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/rabines-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/rabines-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
