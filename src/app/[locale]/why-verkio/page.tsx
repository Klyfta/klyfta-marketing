import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { Principles } from "@/app/[locale]/components/Principles";
import { WhatWeDontHave } from "@/app/[locale]/components/WhatWeDontHave";
import { Residency } from "@/app/[locale]/components/Residency";
import { Comparison } from "@/app/[locale]/components/Comparison";
import { Faqs, FaqStructuredData } from "@/app/[locale]/components/Faqs";
import { FounderNote } from "@/app/[locale]/components/FounderNote";
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
  const t = await getTranslations({ locale, namespace: "whyVerkio" });
  const url = `https://verkio.eu/${locale}/why-verkio`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/why-verkio`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/why-verkio`,
      },
    },
  };
}

export default async function WhyVerkioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <FaqStructuredData locale={locale} />
      <Header />
      <main>
        <Principles />
        <WhatWeDontHave />
        <Residency />
        <Comparison />
        <Faqs />
        <FounderNote />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
