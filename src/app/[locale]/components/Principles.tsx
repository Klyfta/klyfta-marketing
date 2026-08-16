import { useTranslations } from "next-intl";
import { Container } from "./Layout";
import { ImagePlaceholder } from "./ImagePlaceholder";

const principleKeys = ["standards", "quiet", "unified", "leave"] as const;

export function Principles() {
  const t = useTranslations("principles");
  return (
    <section className="py-20 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-gray-900">
              {t("headline")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{t("subhead")}</p>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder
              caption="Editorial composition expressing the four principles — standards, quiet, unified, leave"
              aspect="4-3"
            />
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {principleKeys.map((key, idx) => (
            <div key={key}>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <dt className="mt-3 text-xl font-medium text-gray-900">
                {t(`items.${key}.name`)}
              </dt>
              <dd className="mt-3 text-base text-gray-600 leading-relaxed">
                {t(`items.${key}.description`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
