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

const NAMESPACE = "forTeams";
const SLUG = "teams";

const HERO_IMAGE = "Team dashboard with shared mailbox, calendar, and wiki tiles";
const sections: ProductSection[] = [
  { key: "shared", bulletCount: 5, imageCaption: "Shared inbox with team assignment and internal notes panel" },
  { key: "onboardOff", bulletCount: 4, imageCaption: "Member offboarding flow with 30-day forwarding setup" },
  { key: "audit", bulletCount: 4, imageCaption: "Audit log filter view with SIEM webhook destinations" },
  { key: "standards", bulletCount: 4, imageCaption: "Thunderbird configured against Verkio over IMAP" },
  { key: "oneBill", bulletCount: 4, imageCaption: "Subscription dashboard showing one suite replacing five tools" },
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

export default async function ForTeamsPage({
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
