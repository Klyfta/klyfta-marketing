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
  const t = await getTranslations({ locale, namespace: "terms" });
  const url = `https://verkio.eu/${locale}/terms`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://verkio.eu/${l}/terms`]),
      ),
    },
  };
}

type Section = { heading: string; body: string };

function TermsContent() {
  const t = useTranslations("terms");
  const sections = t.raw("sections") as Section[];

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
          <p className="mt-4 text-sm text-gray-500">{t("lastUpdated")}</p>
          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            {t("intro")}
          </p>
        </div>

        <div className="mt-16 max-w-2xl space-y-12">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-medium text-gray-900">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base text-gray-600 leading-relaxed">
                {section.body.split("\n\n").map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl">
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

export default async function Terms({
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
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
