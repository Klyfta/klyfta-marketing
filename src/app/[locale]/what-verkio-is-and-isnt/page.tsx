import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { IsAndIsnt } from "@/app/[locale]/components/IsAndIsnt";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "isAndIsnt" });
  const url = `https://verkio.eu/${locale}/what-verkio-is-and-isnt`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `https://verkio.eu/${l}/what-verkio-is-and-isnt`,
          ]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/what-verkio-is-and-isnt`,
      },
    },
  };
}

export default async function WhatVerkioIsAndIsntPage({
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
        <IsAndIsnt />
      </main>
      <Footer />
    </>
  );
}
