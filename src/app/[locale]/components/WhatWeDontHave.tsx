import { useTranslations } from "next-intl";
import { Container } from "./Layout";

const ITEM_KEYS = [0, 1, 2, 3, 4, 5] as const;

export function WhatWeDontHave() {
  const t = useTranslations("whatWeDontHave");
  return (
    <section className="bg-gray-50 py-20 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-gray-900">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subhead")}</p>
        </div>
        <ul role="list" className="mt-12 max-w-2xl space-y-4">
          {ITEM_KEYS.map((i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base text-gray-800"
            >
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-px w-6 shrink-0 bg-gray-400"
              />
              <span>{t(`items.${i}`)}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
