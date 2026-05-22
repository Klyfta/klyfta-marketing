"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  submitRoadmapRequest,
  type RoadmapRequestErrorKey,
} from "@/app/actions/roadmapRequest";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; errorKey: RoadmapRequestErrorKey };

const inputClasses =
  "block w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 disabled:opacity-60 transition-colors";

export function RoadmapRequestForm() {
  const t = useTranslations("roadmap.requestForm");
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const formData = new FormData(event.currentTarget);
    const result = await submitRoadmapRequest(formData);

    if (result.success) {
      setState({ status: "success" });
    } else {
      setState({ status: "error", errorKey: result.errorKey });
    }
  }

  if (state.status === "success") {
    return (
      <p className="text-sm text-gray-700">{t("successMessage")}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="rrf-website">Website</label>
        <input
          type="text"
          id="rrf-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="rrf-request"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {t("requestLabel")}
        </label>
        <textarea
          id="rrf-request"
          name="request"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          disabled={state.status === "submitting"}
          className={`${inputClasses} resize-y`}
          placeholder={t("requestPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="rrf-email"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {t("emailLabel")}{" "}
          <span className="text-gray-400 font-normal">
            {t("emailOptional")}
          </span>
        </label>
        <input
          type="email"
          id="rrf-email"
          name="email"
          autoComplete="email"
          disabled={state.status === "submitting"}
          className={inputClasses}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="inline-flex justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.status === "submitting" ? t("submitting") : t("submit")}
      </button>

      {state.status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {t(state.errorKey)}
        </p>
      )}
    </form>
  );
}
