import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Layout";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { productIcons, type ProductIconKey } from "./ProductIcons";

const items: { key: ProductIconKey; href: string; comingSoon?: boolean }[] = [
  { key: "mail", href: "/product/mail" },
  { key: "calendar", href: "/product/calendar" },
  { key: "contacts", href: "/product/contacts" },
  { key: "files", href: "/product/files" },
  { key: "wikis", href: "/product/wikis" },
  { key: "messaging", href: "/product/messaging" },
  { key: "api", href: "/product/api" },
  { key: "signIn", href: "/product/sign-in-with-verkio", comingSoon: true },
];

export function ProductIndex() {
  const t = useTranslations("productIndex");
  const tMenu = useTranslations("nav.productMenu");
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 leading-[1.05]">
              {t("headline")}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {t("body")}
            </p>
          </div>
          <div className="lg:col-span-6">
            <ImagePlaceholder
              caption="Overview composition showing the full Verkio suite — mail, calendar, contacts, files, wiki, messaging"
              aspect="4-3"
            />
          </div>
        </div>
        <ul
          role="list"
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl"
        >
          {items.map(({ key, href, comingSoon }) => {
            const Icon = productIcons[key];
            return (
              <li key={key}>
                <Link
                  href={href}
                  className="group flex items-start gap-4 rounded-xl border border-gray-200 p-5 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" />
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-base font-medium text-gray-900">
                      {tMenu(`${key}.name`)}
                      {comingSoon && (
                        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                          {tMenu("comingSoon")}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      {tMenu(`${key}.description`)}
                    </p>
                    <p className="mt-3 inline-flex items-center text-sm font-semibold text-brand-600 transition-colors group-hover:text-gray-900">
                      {t("learnMore")}{" "}
                      <span aria-hidden="true" className="ml-1">
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
