"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ChevronDown,
  productIcons,
  type ProductIconKey,
} from "./ProductIcons";

type ItemKey = ProductIconKey;

const items: { key: ItemKey; href: string; comingSoon?: boolean }[] = [
  { key: "mail", href: "/product/mail" },
  { key: "calendar", href: "/product/calendar" },
  { key: "contacts", href: "/product/contacts" },
  { key: "files", href: "/product/files" },
  { key: "wikis", href: "/product/wikis" },
  { key: "messaging", href: "/product/messaging" },
  { key: "api", href: "/product/api" },
  { key: "signIn", href: "/product/sign-in-with-verkio", comingSoon: true },
];

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
              const Icon = productIcons[key];
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
