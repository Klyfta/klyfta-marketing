import { useTranslations } from "next-intl";
import { WaitlistForm } from "@/app/components/WaitlistForm";
import { Container } from "./Layout";

export function WaitlistCta() {
  const t = useTranslations("waitlist");
  const tHero = useTranslations("hero");
  return (
    <section id="waitlist" className="border-t border-gray-200 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-600">
            {tHero("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-gray-900">
            {t("cardTitle")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("cardSubtitle")}</p>
        </div>
        <div className="mx-auto mt-12 max-w-md">
          <WaitlistForm />
        </div>
      </Container>
    </section>
  );
}
