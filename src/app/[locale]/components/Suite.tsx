import { useTranslations } from "next-intl";
import { Container } from "./Layout";

function MailIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function CalendarIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ContactsIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </svg>
  );
}

function DocumentIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 14h6M9 17h4" />
    </svg>
  );
}

function WikiIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="11" height="14" rx="1.5" fill="rgb(17 24 39)" />
      <rect x="6" y="5" width="11" height="14" rx="1.5" fill="rgb(17 24 39)" />
      <rect x="10" y="8" width="11" height="14" rx="1.5" fill="rgb(17 24 39)" />
    </svg>
  );
}

function MessagingIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-9.08 8.4 8.5 8.5 0 0 1-3.42-.7L3 21l1.9-5.5a8.38 8.38 0 0 1-.9-3.93C4 7.4 7.4 4 11.5 4s8.5 3.4 8.5 7.5z" />
    </svg>
  );
}

const suiteKeys = [
  "mail",
  "calendar",
  "contacts",
  "documents",
  "wikis",
  "messaging",
] as const;

const suiteIcons = {
  mail: MailIcon,
  calendar: CalendarIcon,
  contacts: ContactsIcon,
  documents: DocumentIcon,
  wikis: WikiIcon,
  messaging: MessagingIcon,
};

export function Suite() {
  const t = useTranslations("suite");
  return (
    <section id="suite" className="bg-gray-900 py-20 sm:py-32">
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
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {suiteKeys.map((key) => {
            const Icon = suiteIcons[key];
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
      </Container>
    </section>
  );
}
