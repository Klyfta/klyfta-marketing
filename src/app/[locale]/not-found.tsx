import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Footer, Header } from "./components/Layout";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <>
      <Header />
      <main>
        <section className="py-24 sm:py-32 lg:py-40">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-brand-600">
                {t("eyebrow")}
              </p>
              <h1 className="mt-6 text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl">
                {t("headline")}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {t("body")}
              </p>
              <div className="mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  ← {t("backLink")}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
