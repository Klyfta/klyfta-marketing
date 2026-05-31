import { notFound } from "next/navigation";

// Catch-all route so the locale-scoped not-found.tsx fires for any
// unmatched sub-path under /[locale]/. Without this, next-intl
// middleware sends a 404 status but renders the global default
// not-found page instead of the per-locale custom one.
export default function CatchAll() {
  notFound();
}
