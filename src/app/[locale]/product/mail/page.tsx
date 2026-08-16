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

const NAMESPACE = "productMail";
const SLUG = "mail";

const HERO_IMAGE = "Webmail with the three-pane inbox view";
const sections: ProductSection[] = [
  { key: "webmail", bulletCount: 5, imageCaption: "Keyboard shortcut overlay open over the inbox" },
  { key: "shared", bulletCount: 6, imageCaption: "Shared mailbox with assignment panel and status badges" },
  { key: "rules", bulletCount: 4, imageCaption: "Visual rule builder editor with a Sieve preview" },
  { key: "aliases", bulletCount: 5, imageCaption: "Alias and forwarding settings screen" },
  { key: "domains", bulletCount: 5, imageCaption: "Domain auto-setup wizard with DNS record list" },
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
        <ProductDeepPage
          namespace={NAMESPACE}
          sections={sections}
          hasStandards={true}
          heroImageCaption={HERO_IMAGE}
        />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
