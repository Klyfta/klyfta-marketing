import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Container } from "./Layout";
import { ImagePlaceholder } from "./ImagePlaceholder";

export type ProductSection = {
  key: string;
  bulletCount: number;
  imageCaption?: string;
};

export type ProductDeepPageProps = {
  namespace: string;
  sections: ProductSection[];
  hasStandards: boolean;
  backLinkHref?: string;
  heroImageCaption?: string;
};

export async function buildProductDeepPageMetadata({
  locale,
  namespace,
  slug,
}: {
  locale: string;
  namespace: string;
  slug: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const url = `https://verkio.eu/${locale}/product/${slug}`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/product/${slug}`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/product/${slug}`,
      },
    },
  };
}

function Hero({
  namespace,
  backLinkHref,
  imageCaption,
}: {
  namespace: string;
  backLinkHref: string;
  imageCaption?: string;
}) {
  const t = useTranslations(namespace);
  const text = (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
      <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 leading-[1.05]">
        {t("headline")}
      </h1>
      <p className="mt-6 text-lg text-gray-600 leading-relaxed">{t("body")}</p>
      <div className="mt-10 flex items-center gap-x-6">
        <Link
          href="/#waitlist"
          className="inline-flex justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
        >
          {t("cta")}
        </Link>
        <Link
          href={backLinkHref}
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          {t("backLink")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        {imageCaption ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">{text}</div>
            <div className="lg:col-span-6">
              <ImagePlaceholder caption={imageCaption} aspect="4-3" />
            </div>
          </div>
        ) : (
          text
        )}
      </Container>
    </section>
  );
}

function CapabilitySection({
  namespace,
  sectionKey,
  bulletCount,
  tone,
  imageCaption,
  imageSide,
}: {
  namespace: string;
  sectionKey: string;
  bulletCount: number;
  tone: "light" | "tinted";
  imageCaption?: string;
  imageSide: "left" | "right";
}) {
  const t = useTranslations(`${namespace}.sections.${sectionKey}`);
  const text = (
    <>
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 leading-tight">
          {t("headline")}
        </h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {t("body")}
        </p>
      </div>
      <ul
        role="list"
        className="mt-10 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
      >
        {Array.from({ length: bulletCount }).map((_, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-base text-gray-800"
          >
            <span
              aria-hidden="true"
              className="mt-3 inline-block h-px w-5 shrink-0 bg-gray-400"
            />
            <span className="leading-relaxed">{t(`bullets.${idx}`)}</span>
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <section
      className={`py-20 sm:py-28 ${tone === "tinted" ? "bg-gray-50" : "bg-white"}`}
    >
      <Container>
        {imageCaption ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div
              className={`lg:col-span-7 ${imageSide === "left" ? "lg:order-2" : ""}`}
            >
              {text}
            </div>
            <div
              className={`lg:col-span-5 ${imageSide === "left" ? "lg:order-1" : ""}`}
            >
              <ImagePlaceholder caption={imageCaption} aspect="4-3" />
            </div>
          </div>
        ) : (
          text
        )}
      </Container>
    </section>
  );
}

function StandardsRow({ namespace }: { namespace: string }) {
  const t = useTranslations(`${namespace}.standards`);
  const items = t.raw("items") as string[];
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-gray-900 leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {t("body")}
          </p>
        </div>
        <ul role="list" className="mt-10 flex flex-wrap gap-2 max-w-4xl">
          {items.map((s) => (
            <li
              key={s}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700"
            >
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ProductDeepPage({
  namespace,
  sections,
  hasStandards,
  backLinkHref = "/product",
  heroImageCaption,
}: ProductDeepPageProps) {
  return (
    <>
      <Hero
        namespace={namespace}
        backLinkHref={backLinkHref}
        imageCaption={heroImageCaption}
      />
      {sections.map((s, idx) => (
        <CapabilitySection
          key={s.key}
          namespace={namespace}
          sectionKey={s.key}
          bulletCount={s.bulletCount}
          tone={idx % 2 === 0 ? "light" : "tinted"}
          imageCaption={s.imageCaption}
          imageSide={idx % 2 === 0 ? "right" : "left"}
        />
      ))}
      {hasStandards && <StandardsRow namespace={namespace} />}
    </>
  );
}
