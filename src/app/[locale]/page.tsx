import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, Footer, Header } from "./components/Layout";
import { ConsoleEasterEgg } from "./components/ConsoleEasterEgg";
import { HomeNarrative } from "./components/HomeNarrative";
import { RotatingWord } from "./components/RotatingWord";
import { WaitlistCta } from "./components/WaitlistCta";

async function StructuredData({ locale }: { locale: string }) {
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Verkio",
    url: `https://verkio.eu/${locale}`,
    logo: "https://verkio.eu/og-image.png",
    description: tMeta("description"),
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}

function Hero() {
  const t = useTranslations("hero");
  const words = t.raw("rotatingWords") as string[];
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center">
          <div className="relative z-10 lg:col-span-4 max-w-md">
            <p className="text-sm font-semibold text-brand-600">
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 leading-[1.1]">
              {t("headlinePrefix")}
              <RotatingWord words={words} />
            </h1>
            <p className="mt-6 text-base text-gray-600">{t("body1")}</p>
            <p className="mt-4 text-base text-gray-600">{t("body2")}</p>
          </div>
          <div className="hidden lg:block lg:col-span-7 lg:col-start-6 lg:-ml-4 xl:-ml-12">
            <video
              src="/images/euro-map.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="w-full h-auto scale-110 origin-right"
            />
          </div>
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
      <StructuredData locale={locale} />
      <ConsoleEasterEgg />
      <Header />
      <main>
        <Hero />
        <HomeNarrative />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
