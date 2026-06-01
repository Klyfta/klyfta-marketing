import { useTranslations } from "next-intl";
import { Container } from "./Layout";

type BandKey = "send" | "plan" | "keep" | "talk" | "build";

const bands: { key: BandKey; items: readonly string[]; tone: "light" | "tinted" }[] = [
  {
    key: "send",
    items: ["webmail", "shared", "rules", "aliases"],
    tone: "light",
  },
  {
    key: "plan",
    items: ["calendars", "contacts", "identity"],
    tone: "tinted",
  },
  {
    key: "keep",
    items: ["files", "wikis", "encryption", "openFormats"],
    tone: "light",
  },
  {
    key: "talk",
    items: ["channels", "threaded", "search"],
    tone: "tinted",
  },
  {
    key: "build",
    items: ["api", "webhooks", "audit", "signIn"],
    tone: "light",
  },
];

export function HomeNarrative() {
  const t = useTranslations("homeNarrative");
  return (
    <>
      {bands.map(({ key, items, tone }) => (
        <section
          key={key}
          className={`py-20 sm:py-28 ${
            tone === "tinted" ? "bg-gray-50" : "bg-white"
          }`}
        >
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-600">
                {t(`${key}.eyebrow`)}
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 leading-tight">
                {t(`${key}.headline`)}
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {t(`${key}.body`)}
              </p>
            </div>
            <dl
              className={`mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 ${
                items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {items.map((itemKey) => (
                <div key={itemKey}>
                  <dt className="text-base font-semibold text-gray-900">
                    {t(`${key}.items.${itemKey}.name`)}
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {t(`${key}.items.${itemKey}.description`)}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ))}
    </>
  );
}
