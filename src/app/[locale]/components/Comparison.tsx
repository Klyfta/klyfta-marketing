"use client";

import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "./Layout";

const comparisonRows = [
  "infrastructure",
  "cloudAct",
  "gdpr",
  "keys",
  "standards",
  "dns",
  "ai",
  "unifiedSearch",
] as const;

function CheckPill() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8l3 3 7-7" />
      </svg>
    </span>
  );
}

function DashPill() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-400">
      <svg viewBox="0 0 16 16" className="h-3 w-3">
        <line
          x1="4"
          y1="8"
          x2="12"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function QuestionIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
      <path d="M9.09 9.5a3 3 0 015.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Comparison() {
  const t = useTranslations("comparison");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="comparison" className="border-t border-gray-200 py-20 sm:py-32">
      <Container>
        <div>
          <p className="text-sm font-semibold text-brand-600">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-gray-900">
            {t("headline")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("subhead")}</p>
        </div>

        <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-auto">
          <div className="min-w-[760px] px-4 sm:px-6 lg:px-8">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th
                    scope="col"
                    className="pb-4 pr-6 font-medium text-gray-500 w-2/5"
                  >
                    <span className="sr-only">Feature</span>
                  </th>
                  <th
                    scope="col"
                    className="pb-4 px-4 text-base font-semibold text-gray-900 align-bottom"
                  >
                    {t("columns.verkio")}
                  </th>
                  <th
                    scope="col"
                    className="pb-4 px-4 text-base font-medium text-gray-600 align-bottom"
                  >
                    {t("columns.google")}
                  </th>
                  <th
                    scope="col"
                    className="pb-4 px-4 text-base font-medium text-gray-600 align-bottom"
                  >
                    {t("columns.microsoft")}
                  </th>
                  <th
                    scope="col"
                    className="pb-4 px-4 text-xs font-medium text-gray-500 align-bottom w-16 text-center uppercase tracking-wider"
                  >
                    {t("columns.info")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((key, idx) => {
                  const isOpen = expanded === key;
                  return (
                    <Fragment key={key}>
                      <tr className={idx > 0 ? "border-t border-gray-200" : ""}>
                        <th
                          scope="row"
                          className="py-5 pr-6 text-sm font-medium text-gray-900 align-top"
                        >
                          {t(`rows.${key}.label`)}
                        </th>
                        <td className="py-5 px-4 align-top">
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                            <CheckPill />
                            {t(`rows.${key}.verkio`)}
                          </span>
                        </td>
                        <td className="py-5 px-4 align-top">
                          <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <DashPill />
                            {t(`rows.${key}.google`)}
                          </span>
                        </td>
                        <td className="py-5 px-4 align-top">
                          <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <DashPill />
                            {t(`rows.${key}.microsoft`)}
                          </span>
                        </td>
                        <td className="py-5 px-4 align-top text-center">
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded(isOpen ? null : key)
                            }
                            aria-expanded={isOpen}
                            aria-controls={`info-${key}`}
                            aria-label={t("infoLabel")}
                            className={`inline-flex items-center justify-center rounded-full transition-colors ${
                              isOpen
                                ? "text-brand-600"
                                : "text-gray-400 hover:text-gray-900"
                            }`}
                          >
                            <QuestionIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                      <tr id={`info-${key}`} aria-hidden={!isOpen}>
                        <td colSpan={5} className="p-0">
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                              isOpen
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div
                                className={`pb-6 transition-opacity duration-200 ${
                                  isOpen
                                    ? "opacity-100 delay-100"
                                    : "opacity-0"
                                }`}
                              >
                                <div className="rounded-lg bg-gray-100 p-5 text-sm text-gray-700 leading-relaxed">
                                  {t(`rows.${key}.info`)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
