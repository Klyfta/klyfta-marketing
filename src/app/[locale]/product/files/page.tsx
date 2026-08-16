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

const NAMESPACE = "productFiles";
const SLUG = "files";

const HERO_IMAGE = "File browser with a public share dialog open";
const sections: ProductSection[] = [
  { key: "privateShared", bulletCount: 5, imageCaption: "Folder tree showing private and shared folders side by side" },
  { key: "encryption", bulletCount: 4, imageCaption: "Per-file key wrapping flow with Vault Transit annotated" },
  { key: "uploads", bulletCount: 4, imageCaption: "Multi-GB upload with resumable progress indicator" },
  { key: "sharing", bulletCount: 4, imageCaption: "Share link creation dialog with password and expiry options" },
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

export default async function ProductFilesPage({
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
