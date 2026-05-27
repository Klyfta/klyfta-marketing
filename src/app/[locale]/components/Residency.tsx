import { useTranslations } from "next-intl";
import { Container } from "./Layout";
import { EuMapPlaceholder } from "./EuMapPlaceholder";

function LockIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

function GlobeIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

function FlagIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

function ServerIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" strokeWidth="2" />
    </svg>
  );
}

function ShieldCheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3l8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const residencyKeys = [
  "infrastructure",
  "encryption",
  "dns",
  "jurisdiction",
  "subprocessors",
] as const;

const residencyIcons = {
  infrastructure: ServerIcon,
  encryption: LockIcon,
  dns: GlobeIcon,
  jurisdiction: FlagIcon,
  subprocessors: ShieldCheckIcon,
};

export function Residency() {
  const t = useTranslations("residency");
  return (
    <section id="residency" className="bg-gray-900 py-20 sm:py-32">
      <Container>
        <div>
          <p className="text-sm font-semibold text-brand-300">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-white">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-400">{t("subhead")}</p>
        </div>
        <ul
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {residencyKeys.map((key) => {
            const Icon = residencyIcons[key];
            return (
              <li
                key={key}
                className="flex flex-col items-center text-center p-8"
              >
                <Icon className="h-20 w-20 text-brand-300" />
                <h3 className="mt-6 text-base font-semibold text-white">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {t(`items.${key}.description`)}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="mt-16">
          <EuMapPlaceholder />
        </div>
      </Container>
    </section>
  );
}
