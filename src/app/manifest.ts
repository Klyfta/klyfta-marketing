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
    ],
  };
}
