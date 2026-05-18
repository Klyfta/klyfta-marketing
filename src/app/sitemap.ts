import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const paths = ["", "/roadmap", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `https://verkio.eu/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority:
        path === "" ? (locale === routing.defaultLocale ? 1.0 : 0.9) : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}${path}`]),
        ),
      },
    })),
  );
}
