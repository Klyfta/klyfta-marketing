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

const NAMESPACE = "productSignIn";
const SLUG = "sign-in-with-verkio";

const HERO_IMAGE = "Sign in with Verkio button rendered on a third-party site";
const sections: ProductSection[] = [
  { key: "euIdentity", bulletCount: 4, imageCaption: "OIDC consent screen with per-scope toggles" },
  { key: "openStandard", bulletCount: 4, imageCaption: "Identity broker config showing Verkio alongside Google and Apple" },
  { key: "consent", bulletCount: 4, imageCaption: "Connected apps dashboard with one-click revoke buttons" },
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

export default async function ProductSignInPage({
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
