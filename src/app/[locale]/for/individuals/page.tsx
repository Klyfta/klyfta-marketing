import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import {
  ProductDeepPage,
  buildProductDeepPageMetadata,
  type ProductSection,
} from "@/app/[locale]/components/ProductDeepPage";
import { WaitlistCta } from "@/app/[locale]/components/WaitlistCta";

const NAMESPACE = "forIndividuals";
const SLUG = "individuals";

const HERO_IMAGE = "Verkio web app open on a laptop with the inbox in view";
const sections: ProductSection[] = [
  { key: "core", bulletCount: 5, imageCaption: "Webmail, calendar, contacts, and files in one suite" },
  { key: "privacy", bulletCount: 4, imageCaption: "Settings page with AI and engagement metrics explicitly absent" },
  { key: "yourDomain", bulletCount: 4, imageCaption: "Add-your-domain wizard with EU DNS auto-setup" },
  { key: "migration", bulletCount: 4, imageCaption: "Import wizard pulling from Gmail with a progress bar" },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildProductDeepPageMetadata({
    locale,
    namespace: NAMESPACE,
    slug: `for/${SLUG}`,
  });
}

export default async function ForIndividualsPage({
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
        <ProductDeepPage
          namespace={NAMESPACE}
          sections={sections}
          hasStandards={false}
          backLinkHref="/"
          heroImageCaption={HERO_IMAGE}
        />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
