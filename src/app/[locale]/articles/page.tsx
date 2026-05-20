import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Container,
  Footer,
  Header,
} from "@/app/[locale]/components/Layout";
import { articlesSortedByDate } from "@/content/articles/registry";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `https://verkio.eu/${locale}/articles`;

  return {
    title: "Articles — Verkio",
    description:
      "Writing on data sovereignty, EU-resident infrastructure, GDPR, and the choices behind a European work suite.",
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/articles`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/articles`,
      },
    },
  };
}

function ArticleList() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-600">Articles</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 leading-tight">
            Notes from building a sovereign EU work suite.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Writing on data sovereignty, EU-resident infrastructure, GDPR,
            and the engineering choices behind Verkio.
          </p>
        </div>

        <ul className="mt-16 max-w-3xl divide-y divide-gray-200 border-t border-gray-200">
          {articlesSortedByDate.map(({ meta }) => (
            <li key={meta.slug} className="py-8">
              <Link
                href={`/articles/${meta.slug}`}
                className="group block"
              >
                <div className="flex items-center gap-x-4 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <time dateTime={meta.publishedAt}>
                    {new Date(meta.publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{meta.readingMinutes} min read</span>
                </div>
                <h2 className="mt-3 text-xl font-medium text-gray-900 group-hover:text-brand-600 transition-colors">
                  {meta.title}
                </h2>
                <p className="mt-2 text-base text-gray-600 leading-relaxed">
                  {meta.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-gray-900 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default async function ArticlesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main>
        <ArticleList />
      </main>
      <Footer />
    </>
  );
}
