import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Verkio",
    short_name: "Verkio",
    description:
      "Fast, focused, European. Mail, calendar, contacts, docs, and wikis — one unified suite, hosted in the EU.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b5f7f",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
