"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ItemKey =
  | "mail"
  | "calendar"
  | "contacts"
  | "files"
  | "wikis"
  | "messaging"
  | "api"
  | "signIn";

type IconProps = React.ComponentPropsWithoutRef<"svg">;

const items: { key: ItemKey; href: string; comingSoon?: boolean }[] = [
  { key: "mail", href: "/product/mail" },
  { key: "calendar", href: "/product" },
  { key: "contacts", href: "/product" },
  { key: "files", href: "/product" },
  { key: "wikis", href: "/product" },
  { key: "messaging", href: "/product" },
  { key: "api", href: "/product" },
  { key: "signIn", href: "/product", comingSoon: true },
];

function strokeProps(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function MailIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function CalendarIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ContactsIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </svg>
  );
}

function DocumentIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 14h6M9 17h4" />
    </svg>
  );
}

function WikiIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="2" y="2" width="11" height="14" rx="1.5" />
      <rect x="6" y="5" width="11" height="14" rx="1.5" />
      <rect x="10" y="8" width="11" height="14" rx="1.5" />
    </svg>
  );
}

function MessagingIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M21 11.5a8.38 8.38 0 0 1-9.08 8.4 8.5 8.5 0 0 1-3.42-.7L3 21l1.9-5.5a8.38 8.38 0 0 1-.9-3.93C4 7.4 7.4 4 11.5 4s8.5 3.4 8.5 7.5z" />
    </svg>
  );
}

function ApiIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M8 6L3 12l5 6M16 6l5 6-5 6M14 4l-4 16" />
    </svg>
  );
}

function SignInIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
    </svg>
  );
}

const icons: Record<ItemKey, (props: IconProps) => React.JSX.Element> = {
  mail: MailIcon,
  calendar: CalendarIcon,
  contacts: ContactsIcon,
  files: DocumentIcon,
  wikis: WikiIcon,
  messaging: MessagingIcon,
  api: ApiIcon,
  signIn: SignInIcon,
};

function ChevronDown(props: IconProps) {
  return (
    <svg {...strokeProps({ ...props, strokeWidth: 2 })}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ProductDropdown() {
  const t = useTranslations("nav.productMenu");
  const tNav = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        {tNav("product")}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 z-50 mt-4 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg ring-1 ring-black/5"
        >
          <ul role="none" className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {items.map(({ key, href, comingSoon }) => {
              const Icon = icons[key];
              return (
                <li key={key} role="none">
                  <Link
                    href={href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        {t(`${key}.name`)}
                        {comingSoon && (
                          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            {t("comingSoon")}
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                        {t(`${key}.description`)}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
