import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Layout";
import { ImagePlaceholder } from "./ImagePlaceholder";

const isCount = 6;
const isntCount = 7;

function Hero() {
  const t = useTranslations("isAndIsnt");
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 leading-[1.05]">
              {t("headline")}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {t("body")}
            </p>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder
              caption="Editorial split graphic — &quot;is&quot; on one side, &quot;isn't&quot; on the other"
              aspect="4-3"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ItemList({
  group,
  count,
  tone,
}: {
  group: "is" | "isnt";
  count: number;
  tone: "light" | "tinted";
}) {
  const t = useTranslations(`isAndIsnt.${group}`);
  return (
    <section
      className={`py-20 sm:py-28 ${tone === "tinted" ? "bg-gray-50" : "bg-white"}`}
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 leading-tight">
            {t("headline")}
          </h2>
        </div>
        <ul role="list" className="mt-12 max-w-3xl space-y-8">
          {Array.from({ length: count }).map((_, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-3 inline-block h-px w-5 shrink-0 bg-gray-400"
              />
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {t(`items.${idx}.name`)}
                </p>
                <p className="mt-1 text-base text-gray-600 leading-relaxed">
                  {t(`items.${idx}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function FitNote() {
  const t = useTranslations("isAndIsnt.fit");
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
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/#waitlist"
              className="inline-flex justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              {t("cta")}
            </Link>
            <Link
              href="/why-verkio"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("backLink")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function IsAndIsnt() {
  return (
    <>
      <Hero />
      <ItemList group="is" count={isCount} tone="light" />
      <ItemList group="isnt" count={isntCount} tone="tinted" />
      <FitNote />
    </>
  );
}
