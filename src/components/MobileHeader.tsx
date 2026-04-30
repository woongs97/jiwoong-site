"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function detectLocale(pathname: string): "ko" | "en" {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
}

function basePath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export default function MobileHeader() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const base = basePath(pathname);
  const enHref = base === "/" ? "/en" : `/en${base}`;
  const koHref = base;

  const aboutHref = locale === "en" ? "/en/about" : "/about";
  const portfolioHref = "/portfolio";

  return (
    <header className="md:hidden sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-gray-100 px-5 h-14 flex items-center justify-between">
      <Link
        href={locale === "en" ? "/en" : "/"}
        className="font-bold text-[15px] text-gray-900"
      >
        jiwoong<span className="text-blue-600">.</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          href={aboutHref}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          {locale === "en" ? "Resume" : "이력서"}
        </Link>
        <Link
          href={portfolioHref}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          {locale === "en" ? "Portfolio" : "포트폴리오"}
        </Link>
        <div className="inline-flex items-center text-[11px] font-semibold tracking-wider border border-gray-200 rounded-full overflow-hidden">
          <Link
            href={koHref}
            className={`px-2 py-1 transition-colors ${
              locale === "ko"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            KO
          </Link>
          <Link
            href={enHref}
            className={`px-2 py-1 transition-colors ${
              locale === "en"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            EN
          </Link>
        </div>
      </nav>
    </header>
  );
}
