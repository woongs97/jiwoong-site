"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Locale = "ko" | "en";

const navLabels: Record<Locale, { blog: string; portfolio: string; about: string }> = {
  ko: { blog: "Blog", portfolio: "Portfolio", about: "About" },
  en: { blog: "Blog", portfolio: "Portfolio", about: "About" },
};

function detectLocale(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
}

function withLocale(path: string, locale: Locale): string {
  const clean = path === "" ? "/" : path;
  if (locale === "en") return clean === "/" ? "/en" : `/en${clean}`;
  return clean;
}

function swapLocale(pathname: string, target: Locale): string {
  let basePath = pathname;
  if (pathname === "/en") basePath = "/";
  else if (pathname.startsWith("/en/")) basePath = pathname.slice(3);

  if (target === "en") {
    return basePath === "/" ? "/en" : `/en${basePath}`;
  }
  return basePath;
}

export default function Nav() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const labels = navLabels[locale];

  const links = [
    { href: withLocale("/", locale), label: labels.blog, match: "/" },
    {
      href: withLocale("/portfolio", locale),
      label: labels.portfolio,
      match: "/portfolio",
    },
    { href: withLocale("/about", locale), label: labels.about, match: "/about" },
  ];

  let basePath = pathname;
  if (pathname === "/en") basePath = "/";
  else if (pathname.startsWith("/en/")) basePath = pathname.slice(3);

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAFA]/85 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1080px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link
          href={withLocale("/", locale)}
          className="font-bold text-lg tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
        >
          jiwoong<span className="text-blue-600">.</span>
        </Link>

        <div className="flex items-center gap-7">
          {links.map(({ href, label, match }) => {
            const isActive =
              match === "/" ? basePath === "/" : basePath.startsWith(match);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive
                    ? "text-gray-900 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-blue-600 after:rounded-full"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex items-center text-[12px] font-semibold tracking-wider border border-gray-200 rounded-full overflow-hidden">
            <Link
              href={swapLocale(pathname, "ko")}
              className={`px-2.5 py-1 transition-colors ${
                locale === "ko"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              KO
            </Link>
            <Link
              href={swapLocale(pathname, "en")}
              className={`px-2.5 py-1 transition-colors ${
                locale === "en"
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
