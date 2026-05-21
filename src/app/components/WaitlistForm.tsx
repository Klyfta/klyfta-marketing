"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  joinWaitlist,
  type WaitlistErrorKey,
} from "@/app/actions/waitlist";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; errorKey: WaitlistErrorKey };

const inputClasses =
  "block w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 disabled:opacity-60 transition-colors";

export function WaitlistForm({ onDark = false }: { onDark?: boolean }) {
  const t = useTranslations("waitlist");
  const [state, setState] = useState<FormState>({ status: "idle" });

  const labelClass = onDark
    ? "mb-2 block text-sm font-medium text-white"
    : "mb-2 block text-sm font-medium text-gray-900";

  const buttonClass = onDark
    ? "inline-flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    : "inline-flex w-full justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  const successClass = onDark
    ? "text-sm text-gray-300 text-center"
    : "text-sm text-gray-700 text-center";
  const errorClass = onDark ? "text-sm text-red-300" : "text-sm text-red-700";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const formData = new FormData(event.currentTarget);
    const result = await joinWaitlist(formData);

    if (result.success) {
      setState({ status: "success" });
    } else {
      setState({ status: "error", errorKey: result.errorKey });
    }
  }

  if (state.status === "success") {
    return <p className={successClass}>{t("successMessage")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {t("emailLabel")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          disabled={state.status === "submitting"}
          className={inputClasses}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {t("companyLabel")}{" "}
          <span
            className={
              onDark
                ? "text-gray-400 font-normal"
                : "text-gray-400 font-normal"
            }
          >
            {t("companyOptional")}
          </span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          disabled={state.status === "submitting"}
          maxLength={255}
          className={inputClasses}
          placeholder={t("companyPlaceholder")}
        />
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className={buttonClass}
      >
        {state.status === "submitting" ? t("submitting") : t("submit")}
      </button>

      {state.status === "error" && (
        <p className={errorClass} role="alert">
          {t(state.errorKey)}
        </p>
      )}
    </form>
  );
}
