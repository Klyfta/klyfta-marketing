import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Container,
  Footer,
  Header,
} from "@/app/[locale]/components/Layout";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap" });
  const url = `https://verkio.eu/${locale}/roadmap`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://verkio.eu/${l}/roadmap`]),
      ),
    },
  };
}

const roadmapItems = ["wiki", "messaging", "webmail"] as const;

function RoadmapList() {
  const t = useTranslations("roadmap");
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-600">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 leading-tight">
            {t("headline")}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t("subhead")}</p>
        </div>

        <ol className="mt-16 max-w-2xl">
          {roadmapItems.map((key, idx) => (
            <li
              key={key}
              className={`relative pl-10 pb-12 ${
                idx === roadmapItems.length - 1 ? "" : "border-l border-gray-200"
              } ${idx > 0 ? "" : ""}`}
            >
              <span className="absolute left-0 top-1 -translate-x-1/2 flex h-3 w-3 rounded-full bg-brand-600 ring-4 ring-white" />
              <div className="text-xs font-mono uppercase tracking-wider text-brand-600">
                {t(`items.${key}.date`)}
              </div>
              <h2 className="mt-2 text-xl font-medium text-gray-900">
                {t(`items.${key}.name`)}
              </h2>
              <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-xl">
                {t(`items.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-gray-900 transition-colors"
          >
            ← {t("backLink")}
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default async function Roadmap({
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
        <RoadmapList />
      </main>
      <Footer />
    </>
  );
}
