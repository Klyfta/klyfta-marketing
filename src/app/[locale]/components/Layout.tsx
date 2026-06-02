import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AudienceDropdown } from "./AudienceDropdown";
import { ProductDropdown } from "./ProductDropdown";

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

export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const markClass = size === "sm" ? "h-6 w-auto" : "h-8 w-auto";
  const textClass =
    size === "sm"
      ? "text-lg font-semibold tracking-tight leading-none"
      : "text-2xl font-semibold tracking-tight leading-none";
  return (
    <span className={`inline-flex items-center gap-x-2 ${className}`}>
      <VerkioMark className={markClass} />
      <span className={textClass}>Verkio</span>
    </span>
  );
}

export function VerkioMark({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 858.320694 586.538568"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      <g
        transform="translate(-0.179576,586.554711) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M3365 5859 c-449 -36 -750 -108 -1050 -253 -720 -347 -1175 -967 -1276 -1741 -29 -222 -6 -602 51 -841 11 -47 20 -89 20 -93 0 -4 -42 -20 -92 -36 -410 -122 -755 -443 -906 -840 -134 -350 -146 -715 -36 -1060 29 -90 109 -264 157 -340 206 -327 523 -547 917 -635 83 -19 167 -20 2933 -20 3035 0 2937 -1 3182 46 337 65 623 213 851 439 212 211 344 462 417 796 53 236 52 218 52 1659 0 1464 1 1424 -57 1675 -148 641 -583 1060 -1248 1205 -200 44 -162 43 -2035 45 -979 2 -1825 -1 -1880 -6z m3645 -504 c149 -18 235 -36 345 -76 170 -60 281 -127 392 -237 193 -190 297 -437 333 -791 16 -167 13 -2525 -4 -2671 -64 -534 -301 -851 -746 -1001 -167 -56 -274 -70 -575 -75 l-270 -5 55 53 c320 308 506 659 579 1088 28 164 35 322 22 480 -39 455 -199 859 -474 1197 l-67 82 433 334 c237 184 446 350 463 368 52 55 68 97 68 169 0 78 -21 127 -77 182 -71 69 -202 87 -283 39 -18 -11 -250 -187 -515 -392 l-481 -372 -36 22 c-137 83 -407 194 -524 216 -34 6 -39 11 -48 49 -84 322 -163 524 -294 748 -106 182 -202 306 -361 466 l-142 142 1046 0 c833 -1 1069 -3 1161 -15z m-3301 -29 c612 -114 1063 -491 1299 -1086 30 -76 94 -272 89 -275 -1 -1 -43 -14 -93 -28 -111 -32 -262 -96 -308 -131 -50 -38 -89 -124 -89 -195 2 -135 111 -245 243 -244 40 1 83 12 160 43 140 56 235 80 350 87 83 5 107 2 192 -21 245 -67 447 -187 641 -380 418 -417 569 -1103 363 -1649 -163 -434 -560 -786 -1027 -912 -210 -56 -156 -55 -2223 -55 -2109 0 -1991 -4 -2184 65 -293 105 -514 356 -595 675 -29 117 -31 376 -3 495 42 182 119 324 248 459 106 112 220 186 356 232 256 88 443 82 700 -22 144 -59 200 -62 280 -19 140 76 176 257 74 376 -62 73 -301 172 -480 201 l-81 12 -21 79 c-240 887 80 1662 860 2084 193 105 526 208 685 213 28 0 68 5 90 10 60 13 377 4 474 -14z" />
      </g>
    </svg>
  );
}

export function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-40 bg-white">
      <Container>
        <nav className="flex items-center justify-between py-6">
          <Link href="/" aria-label="Verkio" className="text-gray-900">
            <Logo />
          </Link>
          <div className="flex items-center gap-x-6 sm:gap-x-8">
            <Link
              href="/product"
              className="inline sm:hidden text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("product")}
            </Link>
            <ProductDropdown />
            <AudienceDropdown />
            <Link
              href="/why-verkio"
              className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("whyVerkio")}
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
            <Link href="/" aria-label="Verkio" className="text-gray-900">
              <span className="text-lg font-semibold tracking-tight">
                Verkio
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-sm">
              {tFooter("tagline")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 className="mb-4 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {tFooter("productHeading")}
              </h2>
              <ul className="text-sm text-gray-600 space-y-3">
                <li>
                  <Link href="/product" className="hover:text-gray-900 transition-colors">
                    {tNav("product")}
                  </Link>
                </li>
                <li>
                  <Link href="/why-verkio" className="hover:text-gray-900 transition-colors">
                    {tNav("whyVerkio")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold text-gray-900 uppercase tracking-wider">
                {tFooter("resourcesHeading")}
              </h2>
              <ul className="text-sm text-gray-600 space-y-3">
                <li>
                  <Link href="/roadmap" className="hover:text-gray-900 transition-colors">
                    {tNav("roadmap")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {tNav("articles")}
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
                <li>
                  <Link
                    href="/subprocessors"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {tFooter("subprocessors")}
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
              href="https://www.linkedin.com/company/verkio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
