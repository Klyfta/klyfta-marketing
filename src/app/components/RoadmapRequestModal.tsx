"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RoadmapRequestForm } from "@/app/components/RoadmapRequestForm";

const TRANSITION_MS = 200;

export function RoadmapRequestModal() {
  const t = useTranslations("roadmap");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setMounted(false), TRANSITION_MS);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, closeModal]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 3.5v9M3.5 8h9" />
        </svg>
        {t("suggestFeature")}
      </button>

      {mounted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="roadmap-modal-title"
        >
          <div
            className={`absolute inset-0 bg-gray-900/50 transition-opacity duration-200 ease-out ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
            aria-hidden="true"
          />
          <div
            className={`relative z-10 w-full max-w-lg rounded-lg bg-white p-6 sm:p-8 shadow-xl transition-all duration-200 ease-out ${
              visible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-2"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="roadmap-modal-title"
                  className="text-xl font-medium text-gray-900"
                >
                  {t("requestForm.title")}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {t("requestForm.description")}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="-mr-2 -mt-2 p-2 text-gray-400 hover:text-gray-900 transition-colors"
                aria-label={t("requestForm.close")}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
            <div className="mt-6">
              <RoadmapRequestForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
