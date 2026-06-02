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

const NAMESPACE = "forItAdmins";
const SLUG = "it-admins";

const HERO_IMAGE = "Admin console with audit log, DPA, and subprocessor list";
const sections: ProductSection[] = [
  { key: "procurement", bulletCount: 5, imageCaption: "DPA preview side-by-side with the subprocessor list" },
  { key: "residency", bulletCount: 4, imageCaption: "EU data residency map highlighting Hetzner regions" },
  { key: "identityAndAccess", bulletCount: 5, imageCaption: "SAML configuration screen with Okta as IdP" },
  { key: "migration", bulletCount: 4, imageCaption: "Mail import dashboard showing Microsoft 365 source" },
  { key: "ops", bulletCount: 4, imageCaption: "Restore drill log with the latest verified recovery" },
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

export default async function ForItAdminsPage({
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
