import { useTranslations } from "next-intl";
import { Container } from "./Layout";

export function FounderNote() {
  const t = useTranslations("founderNote");
  return (
    <section className="border-t border-gray-200 py-20 sm:py-32">
      <Container>
        <figure className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-900 sm:text-2xl">
            {t("body")}
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            {/* PLACEHOLDER — replace with a small founder photo (round, ~48px). */}
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-xs font-mono uppercase tracking-wider text-gray-400"
            >
              IMG
            </span>
            <span className="text-sm font-medium text-gray-600">
              {t("signature")}
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
