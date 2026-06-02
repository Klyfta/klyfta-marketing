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

const NAMESPACE = "forDevelopers";
const SLUG = "developers";

const HERO_IMAGE = "Code editor with a generated Verkio API client";
const sections: ProductSection[] = [
  { key: "restApi", bulletCount: 5, imageCaption: "Swagger UI for /api/v1 with example responses" },
  { key: "webhooks", bulletCount: 4, imageCaption: "Webhook delivery log with HMAC verification check" },
  { key: "auditApi", bulletCount: 4, imageCaption: "SIEM dashboard receiving Verkio audit events live" },
  { key: "futureSignIn", bulletCount: 4, imageCaption: "Sign in with Verkio button on a developer demo site" },
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

export default async function ForDevelopersPage({
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
