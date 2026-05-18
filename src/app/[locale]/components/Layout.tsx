import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`text-lg font-semibold tracking-tight ${className}`}>
      Verkio
    </span>
  );
}

export function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-40 bg-white">
      <Container>
        <nav className="flex items-center justify-between py-6">
          <Link href="/" aria-label="Verkio">
            <Logo className="text-gray-900" />
          </Link>
          <div className="flex items-center gap-x-6 sm:gap-x-8">
            <Link
              href="/#suite"
              className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("suite")}
            </Link>
            <Link
              href="/#residency"
              className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("residency")}
            </Link>
            <Link
              href="/#faqs"
              className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("faqs")}
            </Link>
            <Link
              href="/#waitlist"
              className="inline-flex justify-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              {t("joinWaitlist")}
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}

function XIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
    </svg>
  );
}

export function Footer() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-50">
      <Container className="py-12 lg:py-16">
        <div className="md:flex md:justify-between">
          <div className="mb-10 md:mb-0">
            <Link href="/" className="flex items-center" aria-label="Verkio">
              <Logo className="text-gray-900" />
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-sm">
              {tFooter("tagline")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {tFooter("productHeading")}
              </h2>
              <ul className="text-sm text-gray-600 space-y-3">
                <li>
                  <Link href="/#suite" className="hover:text-gray-900 transition-colors">
                    {tNav("suite")}
                  </Link>
                </li>
                <li>
                  <Link href="/#residency" className="hover:text-gray-900 transition-colors">
                    {tNav("residency")}
                  </Link>
                </li>
                <li>
                  <Link href="/#faqs" className="hover:text-gray-900 transition-colors">
                    {tNav("faqs")}
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="hover:text-gray-900 transition-colors">
                    {tNav("roadmap")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {tFooter("legalHeading")}
              </h2>
              <ul className="text-sm text-gray-600 space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {tFooter("privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {tFooter("terms")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {tFooter("contactHeading")}
              </h2>
              <ul className="text-sm text-gray-600 space-y-3">
                <li>
                  <a
                    href="mailto:hello@verkio.eu"
                    className="hover:text-gray-900 transition-colors"
                  >
                    hello@verkio.eu
                  </a>
                </li>
                <li>
                  <Link
                    href="/#waitlist"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {tNav("joinWaitlist")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 lg:my-10" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            © {year} Verkio. {tFooter("allRightsReserved")}.
          </p>
          <div className="flex mt-4 sm:mt-0 gap-5">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="X"
            >
              <XIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
