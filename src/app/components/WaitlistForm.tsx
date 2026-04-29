"use client";

import { useState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function WaitlistForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const formData = new FormData(event.currentTarget);
    const result = await joinWaitlist(formData);

    if (result.success) {
      setState({ status: "success" });
    } else {
      setState({ status: "error", message: result.error });
    }
  }

  if (state.status === "success") {
    return (
      <p className="text-base text-[#1A2332]">
        Thanks. We&rsquo;ll be in touch when Klyfta opens in August.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users, bots fill it */}
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
        <label
          htmlFor="email"
          className="block text-sm text-[#1A2332] mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          disabled={state.status === "submitting"}
          className="w-full px-3 py-2 bg-white border border-[#8A9BA8]/30 rounded-sm text-[#1A2332] placeholder-[#8A9BA8]/60 focus:outline-none focus:border-[#3B5F7F] focus:ring-1 focus:ring-[#3B5F7F] transition-colors disabled:opacity-60"
          placeholder="you@yourcompany.com"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm text-[#1A2332] mb-2"
        >
          Company <span className="text-[#8A9BA8]">(optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          disabled={state.status === "submitting"}
          maxLength={255}
          className="w-full px-3 py-2 bg-white border border-[#8A9BA8]/30 rounded-sm text-[#1A2332] placeholder-[#8A9BA8]/60 focus:outline-none focus:border-[#3B5F7F] focus:ring-1 focus:ring-[#3B5F7F] transition-colors disabled:opacity-60"
          placeholder="Acme AB"
        />
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="w-full px-4 py-2 bg-[#1A2332] text-[#FAFAF7] rounded-sm hover:bg-[#3B5F7F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.status === "submitting" ? "Joining..." : "Join the waitlist"}
      </button>

      {state.status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
