import { useTranslations } from "next-intl";
import { Container } from "./Layout";

const capabilityKeys = [
  "webmail",
  "files",
  "calendar",
  "contacts",
  "filters",
  "sharedMailbox",
  "messaging",
  "api",
  "auditLog",
  "offboarding",
  "domains",
  "migration",
] as const;

export function Capabilities() {
  const t = useTranslations("capabilities");
  return (
    <section id="capabilities" className="bg-gray-900 py-20 sm:py-32">
      <Container>
        <div>
          <p className="text-sm font-semibold text-brand-300">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-white">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-400">{t("subhead")}</p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityKeys.map((key) => (
            <div key={key}>
              <dt className="text-xl font-medium text-white">
                {t(`items.${key}.name`)}
              </dt>
              <dd className="mt-3 text-base text-gray-400 leading-relaxed">
                {t(`items.${key}.description`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
