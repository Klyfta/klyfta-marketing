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

const NAMESPACE = "productMessaging";
const SLUG = "messaging";

const HERO_IMAGE = "Messaging channel with threaded conversation in view";
const sections: ProductSection[] = [
  { key: "channels", bulletCount: 4, imageCaption: "Channel sidebar with public and private channels listed" },
  { key: "inSuite", bulletCount: 4, imageCaption: "Universal search results spanning mail, calendar, messages, and wiki" },
  { key: "noNoise", bulletCount: 4, imageCaption: "Notification settings panel with per-channel toggles" },
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
    slug: SLUG,
  });
}

export default async function ProductMessagingPage({
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
          heroImageCaption={HERO_IMAGE}
        />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
