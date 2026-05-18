import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { WaitlistForm } from "@/app/components/WaitlistForm";
import { Comparison } from "./components/Comparison";
import { Container, Footer, Header } from "./components/Layout";

function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center">
          <div className="relative z-10 lg:col-span-4 max-w-md">
            <p className="text-sm font-semibold text-brand-600">
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 leading-[1.1]">
              {t("headline")}
            </h1>
            <p className="mt-6 text-base text-gray-600">{t("body1")}</p>
            <p className="mt-4 text-base text-gray-600">{t("body2")}</p>
          </div>
          <div className="hidden lg:block lg:col-span-7 lg:col-start-6 lg:-ml-4 xl:-ml-12">
            <Image
              src="/images/draft.png"
              alt=""
              width={1400}
              height={1400}
              priority
              className="w-full h-auto scale-110 origin-right"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function MailIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function CalendarIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ContactsIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </svg>
  );
}

function DocumentIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 14h6M9 17h4" />
    </svg>
  );
}

function WikiIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="11"
        height="14"
        rx="1.5"
        fill="rgb(17 24 39)"
      />
      <rect
        x="6"
        y="5"
        width="11"
        height="14"
        rx="1.5"
        fill="rgb(17 24 39)"
      />
      <rect
        x="10"
        y="8"
        width="11"
        height="14"
        rx="1.5"
        fill="rgb(17 24 39)"
      />
    </svg>
  );
}

const suiteKeys = [
  "mail",
  "calendar",
  "contacts",
  "documents",
  "wikis",
] as const;
const suiteIcons = {
  mail: MailIcon,
  calendar: CalendarIcon,
  contacts: ContactsIcon,
  documents: DocumentIcon,
  wikis: WikiIcon,
};

function Suite() {
  const t = useTranslations("suite");
  return (
    <section id="suite" className="bg-gray-900 py-20 sm:py-32">
      <Container>
        <div>
          <p className="text-sm font-semibold text-brand-300">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-white">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-400">{t("subhead")}</p>
        </div>
        <ul
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {suiteKeys.map((key) => {
            const Icon = suiteIcons[key];
            return (
              <li key={key} className="flex flex-col items-center text-center p-8">
                <Icon className="h-20 w-20 text-brand-300" />
                <h3 className="mt-6 text-base font-semibold text-white">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {t(`items.${key}.description`)}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function LockIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

function GlobeIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

function FlagIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

function ServerIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" strokeWidth="2" />
    </svg>
  );
}

function ShieldCheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3l8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const residencyKeys = [
  "infrastructure",
  "encryption",
  "dns",
  "jurisdiction",
  "subprocessors",
] as const;
const residencyIcons = {
  infrastructure: ServerIcon,
  encryption: LockIcon,
  dns: GlobeIcon,
  jurisdiction: FlagIcon,
  subprocessors: ShieldCheckIcon,
};

function Residency() {
  const t = useTranslations("residency");
  return (
    <section id="residency" className="border-t border-gray-200 py-20 sm:py-32">
      <Container>
        <div>
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-gray-900">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subhead")}</p>
        </div>
        <ul
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {residencyKeys.map((key) => {
            const Icon = residencyIcons[key];
            return (
              <li key={key} className="flex flex-col items-center text-center p-8">
                <Icon className="h-20 w-20 text-brand-600" />
                <h3 className="mt-6 text-base font-semibold text-gray-900">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t(`items.${key}.description`)}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

const faqColumns = [
  ["hosting", "cloudAct", "clients"],
  ["launch", "migration", "pricing"],
  ["subprocessors", "leaving", "openSource"],
] as const;

function Faqs() {
  const t = useTranslations("faqs");
  return (
    <section id="faqs" className="border-t border-gray-200 py-20 sm:py-32">
      <Container>
        <div className="max-w-2xl lg:mx-0">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-gray-900">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t("contactPrompt")}{" "}
            <a
              href="mailto:hello@verkio.eu"
              className="text-gray-900 underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              hello@verkio.eu
            </a>
          </p>
        </div>
        <ul
          role="list"
          className="mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqColumns.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((key) => (
                  <li key={key}>
                    <h3 className="text-base font-semibold text-gray-900 leading-snug">
                      {t(`items.${key}.question`)}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {t(`items.${key}.answer`)}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function WaitlistCta() {
  const t = useTranslations("waitlist");
  const tHero = useTranslations("hero");
  return (
    <section id="waitlist" className="bg-gray-900 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-300">
            {tHero("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-white">
            {t("cardTitle")}
          </h2>
          <p className="mt-4 text-lg text-gray-400">{t("cardSubtitle")}</p>
        </div>
        <div className="mx-auto mt-12 max-w-md">
          <WaitlistForm onDark />
        </div>
      </Container>
    </section>
  );
}

export default async function Home({
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
        <Hero />
        <Suite />
        <Residency />
        <Comparison />
        <Faqs />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
