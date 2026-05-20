import type { ReactNode } from "react";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  lastModified: string;
  readingMinutes: number;
  tags: string[];
  draft?: boolean;
};

export type ArticleModule = {
  meta: ArticleMeta;
  default: () => ReactNode;
};
