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

const NAMESPACE = "productApi";
const SLUG = "api";

const HERO_IMAGE = "Swagger UI showing /api/v1 endpoints";
const sections: ProductSection[] = [
  { key: "rest", bulletCount: 5, imageCaption: "Code editor with a typed API client generated from the OpenAPI spec" },
  { key: "webhooks", bulletCount: 4, imageCaption: "Dead-letter queue dashboard with retry inspector" },
  { key: "jmap", bulletCount: 4, imageCaption: "JMAP client library connecting through the Verkio passthrough" },
  { key: "auditLog", bulletCount: 4, imageCaption: "Audit log streaming dashboard with event filters" },
  { key: "production", bulletCount: 4, imageCaption: "API key management dashboard with rotation controls" },
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

export default async function ProductApiPage({
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
