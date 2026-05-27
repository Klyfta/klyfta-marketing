import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { Suite } from "@/app/[locale]/components/Suite";
import { Capabilities } from "@/app/[locale]/components/Capabilities";
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
  const t = await getTranslations({ locale, namespace: "product" });
  const url = `https://verkio.eu/${locale}/product`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/product`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/product`,
      },
    },
  };
}

export default async function ProductPage({
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
        <Suite />
        <Capabilities />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
