"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ItemKey = "individuals" | "teams" | "itAdmins" | "developers";

type IconProps = React.ComponentPropsWithoutRef<"svg">;

const items: { key: ItemKey; href: string }[] = [
  { key: "individuals", href: "/for/individuals" },
  { key: "teams", href: "/for/teams" },
  { key: "itAdmins", href: "/for/it-admins" },
  { key: "developers", href: "/for/developers" },
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

function IndividualIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </svg>
  );
}

function TeamIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <circle cx="9" cy="9" r="3" />
      <path d="M3 19a6 6 0 0112 0" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M15 14a4.5 4.5 0 016 4" />
    </svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TerminalIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 10l3 2-3 2M13 14h4" />
    </svg>
  );
}

const icons: Record<ItemKey, (props: IconProps) => React.JSX.Element> = {
  individuals: IndividualIcon,
  teams: TeamIcon,
  itAdmins: ShieldIcon,
  developers: TerminalIcon,
};

function ChevronDown(props: IconProps) {
  return (
    <svg {...strokeProps({ ...props, strokeWidth: 2 })}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function AudienceDropdown() {
  const t = useTranslations("nav.audienceMenu");
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
        {tNav("for")}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 z-50 mt-4 w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg ring-1 ring-black/5"
        >
          <ul role="none" className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {items.map(({ key, href }) => {
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
                      <p className="text-sm font-medium text-gray-900">
                        {t(`${key}.name`)}
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
