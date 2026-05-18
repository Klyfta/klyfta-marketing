import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "en",
    "de",
    "fr",
    "nl",
    "es",
    "it",
    "pt",
    "pl",
    "cs",
    "sv",
    "da",
    "nb",
    "fi",
    "et",
    "lv",
    "lt",
    "is",
  ],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
