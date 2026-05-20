import type { ArticleModule } from "./types";
import * as cloudAct from "./us-cloud-act-eu-businesses";

const modules: ArticleModule[] = [cloudAct];

export const articles: Record<string, ArticleModule> = Object.fromEntries(
  modules.filter((m) => !m.meta.draft).map((m) => [m.meta.slug, m]),
);

export const articleSlugs = Object.keys(articles);

export const articlesSortedByDate = Object.values(articles).sort((a, b) =>
  b.meta.publishedAt.localeCompare(a.meta.publishedAt),
);
