"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAFA]/85 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1080px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
        >
          jiwoong<span className="text-blue-600">.</span>
        </Link>

        <div className="flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
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
        </div>
      </div>
    </nav>
  );
}
