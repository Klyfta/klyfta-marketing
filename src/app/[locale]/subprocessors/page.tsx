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
  const t = await getTranslations({ locale, namespace: "subprocessors" });
  const url = `https://verkio.eu/${locale}/subprocessors`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `https://verkio.eu/${l}/subprocessors`,
          ]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/subprocessors`,
      },
    },
  };
}

type Row = {
  vendor: string;
  purposeKey: "hetzner" | "mollie";
  country: string;
  dpaUrl: string;
};

const ROWS: Row[] = [
  {
    vendor: "Hetzner Online GmbH",
    purposeKey: "hetzner",
    country: "Germany (EU)",
    dpaUrl: "https://www.hetzner.com/legal/order-processing",
  },
  {
    vendor: "Mollie B.V.",
    purposeKey: "mollie",
    country: "Netherlands (EU)",
    dpaUrl: "https://www.mollie.com/data-processing-agreement",
  },
];

function SubprocessorsContent() {
  const t = useTranslations("subprocessors");

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

        <div className="mt-12 max-w-3xl overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-900">
                  {t("columns.vendor")}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">
                  {t("columns.purpose")}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">
                  {t("columns.country")}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">
                  {t("columns.dpa")}
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.vendor} className="border-t border-gray-200">
                  <td className="px-4 py-3 font-medium text-gray-900 align-top">
                    {row.vendor}
                  </td>
                  <td className="px-4 py-3 text-gray-600 align-top">
                    {t(`purposes.${row.purposeKey}`)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 align-top whitespace-nowrap">
                    {row.country}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <a
                      href={row.dpaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:text-gray-900 underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors"
                    >
                      {t("dpaLink")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 max-w-2xl">
          <h2 className="text-xl font-medium text-gray-900">
            {t("noticeHeading")}
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            {t.rich("noticeBody", {
              email: (chunks) => (
                <a
                  href="mailto:subprocessors@verkio.eu"
                  className="text-gray-900 underline underline-offset-4 decoration-1 hover:decoration-2"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
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

export default async function Subprocessors({
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
        <SubprocessorsContent />
      </main>
      <Footer />
    </>
  );
}
