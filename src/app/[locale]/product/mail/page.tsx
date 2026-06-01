import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Container, Footer, Header } from "@/app/[locale]/components/Layout";
import { WaitlistCta } from "@/app/[locale]/components/WaitlistCta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productMail" });
  const url = `https://verkio.eu/${locale}/product/mail`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/product/mail`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/product/mail`,
      },
    },
  };
}

type SectionKey = "webmail" | "shared" | "rules" | "aliases" | "domains";
const sectionTones: Record<SectionKey, "light" | "tinted"> = {
  webmail: "light",
  shared: "tinted",
  rules: "light",
  aliases: "tinted",
  domains: "light",
};
const sectionBulletCount: Record<SectionKey, number> = {
  webmail: 5,
  shared: 6,
  rules: 4,
  aliases: 5,
  domains: 5,
};
const sectionKeys: SectionKey[] = [
  "webmail",
  "shared",
  "rules",
  "aliases",
  "domains",
];

function Hero() {
  const t = useTranslations("productMail");
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 leading-[1.05]">
            {t("headline")}
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            {t("body")}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/#waitlist"
              className="inline-flex justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              {t("cta")}
            </Link>
            <Link
              href="/product"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("backLink")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CapabilitySection({ sectionKey }: { sectionKey: SectionKey }) {
  const t = useTranslations(`productMail.sections.${sectionKey}`);
  const tone = sectionTones[sectionKey];
  const bulletCount = sectionBulletCount[sectionKey];
  return (
    <section
      className={`py-20 sm:py-28 ${tone === "tinted" ? "bg-gray-50" : "bg-white"}`}
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {t("body")}
          </p>
        </div>
        <ul
          role="list"
          className="mt-10 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
        >
          {Array.from({ length: bulletCount }).map((_, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-base text-gray-800"
            >
              <span
                aria-hidden="true"
                className="mt-3 inline-block h-px w-5 shrink-0 bg-gray-400"
              />
              <span className="leading-relaxed">{t(`bullets.${idx}`)}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function StandardsRow() {
  const t = useTranslations("productMail.standards");
  const standards = t.raw("items") as string[];
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-gray-900 leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {t("body")}
          </p>
        </div>
        <ul
          role="list"
          className="mt-10 flex flex-wrap gap-2 max-w-4xl"
        >
          {standards.map((s) => (
            <li
              key={s}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700"
            >
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default async function ProductMailPage({
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
        <Hero />
        {sectionKeys.map((key) => (
          <CapabilitySection key={key} sectionKey={key} />
        ))}
        <StandardsRow />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
