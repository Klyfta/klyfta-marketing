import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Container,
  Footer,
  Header,
} from "@/app/[locale]/components/Layout";
import {
  articles,
  articleSlugs,
} from "@/content/articles/registry";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articleSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles[slug];
  if (!article) {
    return { title: "Not found — Verkio" };
  }

  const url = `https://verkio.eu/${locale}/articles/${slug}`;
  const title = `${article.meta.title} — Verkio`;

  return {
    title,
    description: article.meta.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `https://verkio.eu/${l}/articles/${slug}`,
          ]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/articles/${slug}`,
      },
    },
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      url,
      type: "article",
      publishedTime: article.meta.publishedAt,
      modifiedTime: article.meta.lastModified,
      tags: article.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.description,
    },
  };
}

function ArticleStructuredData({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const article = articles[slug];
  if (!article) return null;

  const url = `https://verkio.eu/${locale}/articles/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.publishedAt,
    dateModified: article.meta.lastModified,
    author: { "@type": "Organization", name: "Verkio" },
    publisher: {
      "@type": "Organization",
      name: "Verkio",
      logo: { "@type": "ImageObject", url: "https://verkio.eu/icon" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: article.meta.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://verkio.eu/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `https://verkio.eu/${locale}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.meta.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = articles[slug];
  if (!article) notFound();

  const Body = article.default;

  return (
    <>
      <ArticleStructuredData slug={slug} locale={locale} />
      <Header />
      <main>
        <article className="py-16 sm:py-24 lg:py-32">
          <Container>
            <div className="max-w-2xl">
              <div className="flex items-center gap-x-4 text-xs font-mono uppercase tracking-wider text-brand-600">
                <Link href="/articles" className="hover:text-gray-900 transition-colors">
                  Articles
                </Link>
                <span className="text-gray-300">·</span>
                <time
                  dateTime={article.meta.publishedAt}
                  className="text-gray-400"
                >
                  {new Date(article.meta.publishedAt).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400">
                  {article.meta.readingMinutes} min read
                </span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 leading-[1.1]">
                {article.meta.title}
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {article.meta.description}
              </p>
            </div>

            <div className="mt-16 max-w-2xl article-body">
              <Body />
            </div>

            <div className="mt-16 max-w-2xl">
              <Link
                href="/articles"
                className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-gray-900 transition-colors"
              >
                ← All articles
              </Link>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
