import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "한지웅 — Program / Project Manager",
    template: "%s | 한지웅",
  },
  description:
    "전략, 운영, SCM을 가로지르며 복잡한 문제를 실행 가능한 구조와 운영 메커니즘으로 전환하는 한지웅의 개인 사이트.",
  applicationName: "jiwoong.site",
  authors: [{ name: "Han Jiwoong", url: siteUrl }],
  keywords: [
    "한지웅",
    "Han Jiwoong",
    "Program Manager",
    "Project Manager",
    "전략기획",
    "SCM",
    "포트폴리오",
    "이력서",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "한지웅",
    title: "한지웅 — Program / Project Manager",
    description:
      "전략, 운영, SCM을 가로지르며 복잡한 문제를 실행 가능한 구조와 운영 메커니즘으로 전환합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "한지웅 — Program / Project Manager",
    description:
      "Bridging strategy, operations, and SCM to turn complex problems into executable structures.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#FAFAFA] text-gray-900">
        <MobileHeader />
        <div className="flex min-h-screen">
          <Suspense
            fallback={
              <div className="hidden md:block w-[260px] flex-shrink-0 border-r border-gray-100" />
            }
          >
            <Sidebar />
          </Suspense>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
