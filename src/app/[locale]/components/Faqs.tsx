import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Container } from "./Layout";

export const faqKeys = [
  "hosting",
  "cloudAct",
  "clients",
  "launch",
  "migration",
  "pricing",
  "subprocessors",
  "leaving",
  "openSource",
] as const;

const faqColumns = [
  ["hosting", "cloudAct", "clients"],
  ["launch", "migration", "pricing"],
  ["subprocessors", "leaving", "openSource"],
] as const;

export function Faqs() {
  const t = useTranslations("faqs");
  return (
    <section id="faqs" className="bg-gray-900 py-20 sm:py-32">
      <Container>
        <div className="max-w-2xl lg:mx-0">
          <p className="text-sm font-semibold text-brand-300">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-white">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            {t("contactPrompt")}{" "}
            <a
              href="mailto:hello@verkio.eu"
              className="text-white underline underline-offset-4 decoration-1 hover:decoration-2"
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
                    <h3 className="text-base font-semibold text-white leading-snug">
                      {t(`items.${key}.question`)}
                    </h3>
                    <p className="mt-3 text-sm text-gray-400 leading-relaxed">
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

export async function FaqStructuredData({ locale }: { locale: string }) {
  const tFaqs = await getTranslations({ locale, namespace: "faqs" });
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: tFaqs(`items.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaqs(`items.${key}.answer`),
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
    />
  );
}
