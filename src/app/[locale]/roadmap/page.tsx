import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Container,
  Footer,
  Header,
} from "@/app/[locale]/components/Layout";
import { RoadmapRequestModal } from "@/app/components/RoadmapRequestModal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap" });
  const url = `https://verkio.eu/${locale}/roadmap`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/roadmap`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/roadmap`,
      },
    },
  };
}

type RoadmapSize = "major" | "minor";
type RoadmapStatus = "implemented";

const roadmapItems: { key: string; size: RoadmapSize; status?: RoadmapStatus }[] = [
  { key: "emailAliases", size: "minor", status: "implemented" },
  { key: "wiki", size: "major" },
  { key: "domainAutoSetup", size: "minor", status: "implemented" },
  { key: "messaging", size: "major" },
  { key: "webmail", size: "major" },
  { key: "migration", size: "major" },
  { key: "ssoScim", size: "major" },
  { key: "schedule", size: "minor" },
  { key: "auditLog", size: "minor", status: "implemented" },
  { key: "publicApi", size: "major", status: "implemented" },
  { key: "eidasSigning", size: "major" },
  { key: "calendarPolls", size: "minor" },
  { key: "mobileApps", size: "major" },
  { key: "sharedMailbox", size: "major" },
  { key: "sendLaterSnooze", size: "minor" },
  { key: "compliance", size: "major" },
  { key: "realtimeDocs", size: "major" },
  { key: "transactionalEmail", size: "major" },
  { key: "sieveFilters", size: "minor" },
  { key: "ediscovery", size: "major" },
];

function RoadmapList() {
  const t = useTranslations("roadmap");
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-600">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 leading-tight">
            {t("headline")}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t("subhead")}</p>
          <div className="mt-8">
            <RoadmapRequestModal />
          </div>
        </div>

        <ol className="mt-16 max-w-2xl">
          {roadmapItems.map(({ key, size, status }, idx) => {
            const isMajor = size === "major";
            const isLast = idx === roadmapItems.length - 1;
            const isImplemented = status === "implemented";
            const note = t.has(`items.${key}.note`)
              ? t(`items.${key}.note`)
              : null;
            return (
              <li
                key={key}
                className={`relative pl-10 ${isLast ? "" : "border-l border-gray-200"} ${
                  isMajor ? "pb-12" : "pb-8"
                } ${isImplemented ? "opacity-50" : ""}`}
              >
                {isImplemented ? (
                  <span className="absolute left-0 top-0.5 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 ring-4 ring-white">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2.5 6.5l2.5 2.5 4.5-5" />
                    </svg>
                  </span>
                ) : isMajor ? (
                  <span className="absolute left-0 top-1 -translate-x-1/2 flex h-3 w-3 rounded-full bg-brand-600 ring-4 ring-white" />
                ) : (
                  <span className="absolute left-0 top-2 -translate-x-1/2 flex h-2 w-2 rounded-full border-2 border-brand-300 bg-white ring-4 ring-white" />
                )}
                <div
                  className={`font-mono uppercase tracking-wider flex items-center gap-2 ${
                    isMajor ? "text-xs text-brand-600" : "text-[10px] text-gray-400"
                  }`}
                >
                  <span>{t(`items.${key}.date`)}</span>
                  {isImplemented && (
                    <span className="text-[10px] text-green-700">
                      · {t("statusImplemented")}
                    </span>
                  )}
                </div>
                <h2
                  className={`mt-2 font-medium text-gray-900 ${
                    isMajor ? "text-xl" : "text-base"
                  }`}
                >
                  {t(`items.${key}.name`)}
                </h2>
                <p
                  className={`mt-3 leading-relaxed max-w-xl ${
                    isMajor ? "text-base text-gray-600" : "text-sm text-gray-500"
                  }`}
                >
                  {t(`items.${key}.description`)}
                </p>
                {note && (
                  <p className="mt-2 text-xs text-gray-400 max-w-xl">
                    * {note}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-gray-900 transition-colors"
          >
            ← {t("backLink")}
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default async function Roadmap({
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
        <RoadmapList />
      </main>
      <Footer />
    </>
  );
}
