"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import type { ProfileContent } from "../data/profile";

interface Category {
  name: string;
  count: number;
}

interface Props {
  categories: Category[];
  profileKo: ProfileContent;
  profileEn: ProfileContent;
}

function detectLocale(pathname: string): "ko" | "en" {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
}

function basePath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

function withLocale(path: string, locale: "ko" | "en"): string {
  const clean = path === "" ? "/" : path;
  if (locale === "en") return clean === "/" ? "/en" : `/en${clean}`;
  return clean;
}

function SidebarBody({ categories, profileKo, profileEn }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const p = locale === "en" ? profileEn : profileKo;
  const active = searchParams.get("category") ?? (locale === "en" ? "All" : "전체");

  const homeHref = withLocale("/", locale);
  const aboutHref = withLocale("/about", locale);
  // 포트폴리오는 영어 버전이 아직 없어 KO로 고정
  const portfolioHref = "/portfolio";

  const labels =
    locale === "en"
      ? { posts: "Posts", about: "Resume", portfolio: "Portfolio" }
      : { posts: "글", about: "이력서", portfolio: "포트폴리오" };

  const totalLabel = locale === "en" ? "All" : "전체";
  const totalCount =
    categories.find((c) => c.name === "전체")?.count ?? 0;

  return (
    <>
      {/* Profile */}
      <div className="mb-8">
        <Link href={homeHref} className="block mb-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-base select-none">
            지
          </div>
        </Link>
        <Link
          href={homeHref}
          className="block font-bold text-[15px] text-gray-900 hover:text-blue-600 transition-colors"
        >
          {p.name}
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">{p.role}</p>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">
          {p.tagline}
        </p>
      </div>

      {/* Category nav */}
      <nav className="flex-1">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
          {labels.posts} ({totalCount})
        </p>
        <ul className="space-y-0.5">
          {categories.map((cat) => {
            const isTotal = cat.name === "전체";
            const display = isTotal ? totalLabel : cat.name;
            const isActive = active === cat.name || (isTotal && active === totalLabel);
            return (
              <li key={cat.name}>
                <Link
                  href={
                    isTotal
                      ? homeHref
                      : `${homeHref}?category=${encodeURIComponent(cat.name)}`
                  }
                  className={`flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span>{display}</span>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: page links + language toggle */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="space-y-1 mb-4">
          <Link
            href={aboutHref}
            className="block text-sm text-gray-500 hover:text-gray-900 py-1 transition-colors"
          >
            {labels.about}
          </Link>
          <Link
            href={portfolioHref}
            className="block text-sm text-gray-500 hover:text-gray-900 py-1 transition-colors"
          >
            {labels.portfolio}
          </Link>
        </div>

        {/* KO / EN capsule toggle (path-preserving) */}
        <div className="inline-flex items-center text-[11px] font-semibold tracking-wider border border-gray-200 rounded-full overflow-hidden">
          <Link
            href={(() => {
              const base = basePath(pathname);
              return base;
            })()}
            className={`px-2.5 py-1 transition-colors ${
              locale === "ko"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            KO
          </Link>
          <Link
            href={(() => {
              const base = basePath(pathname);
              return base === "/" ? "/en" : `/en${base}`;
            })()}
            className={`px-2.5 py-1 transition-colors ${
              locale === "en"
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            EN
          </Link>
        </div>

        <p className="mt-4 text-[11px] text-gray-300">
          © {new Date().getFullYear()} jiwoong
        </p>
      </div>
    </>
  );
}

export default function SidebarClient(props: Props) {
  return (
    <Suspense fallback={<div className="flex-1" />}>
      <SidebarBody {...props} />
    </Suspense>
  );
}
