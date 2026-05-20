import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { articlesSortedByDate } from "@/content/articles/registry";

const paths = ["", "/roadmap", "/privacy", "/terms", "/articles"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      paths.map((path) => ({
        url: `https://verkio.eu/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority:
          path === ""
            ? locale === routing.defaultLocale
              ? 1.0
              : 0.9
            : path === "/articles"
              ? 0.6
              : 0.7,
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((l) => [l, `https://verkio.eu/${l}${path}`]),
            ),
            "x-default": `https://verkio.eu/${routing.defaultLocale}${path}`,
          },
        },
      })),
  );

  const articleEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      articlesSortedByDate.map(({ meta }) => ({
        url: `https://verkio.eu/${locale}/articles/${meta.slug}`,
        lastModified: new Date(meta.lastModified),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((l) => [
                l,
                `https://verkio.eu/${l}/articles/${meta.slug}`,
              ]),
            ),
            "x-default": `https://verkio.eu/${routing.defaultLocale}/articles/${meta.slug}`,
          },
        },
      })),
  );

  return [...staticEntries, ...articleEntries];
}
