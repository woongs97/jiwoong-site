import Link from "next/link";
import { projects } from "../../data/projects";

export const revalidate = 60;

export default function PortfolioPage() {
  const items = projects.ko.filter((p) => p.featured !== false);

  return (
    <section className="max-w-[1080px] mx-auto px-6 pt-14 pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-2">포트폴리오</h1>
      <p className="text-gray-500 mb-10">
        대표 프로젝트들을 케이스 스터디로 풀어 봤습니다. 각 카드는 5단 구조 — 문제·원인 / 해결 / 결과 / 상세 역할 — 으로 정리되어 있어요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((p) => {
          const hasCase = !!p.caseStudy;
          const cardBody = (
            <article
              className={`h-full rounded-xl p-5 border transition-all ${
                p.highlight
                  ? "bg-gradient-to-br from-blue-50/60 to-purple-50/40 border-blue-100"
                  : "bg-white border-gray-200"
              } ${
                hasCase
                  ? "hover:border-blue-300 hover:-translate-y-0.5"
                  : "opacity-80"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                  {p.category}
                </span>
                {p.highlight && (
                  <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-blue-100/80 rounded-full px-2 py-0.5">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-[16px] font-bold text-gray-900 leading-snug mb-1">
                {p.title}
              </h3>
              <p className="text-xs text-gray-400 mb-3">{p.company}</p>
              <p className="text-[13.5px] text-gray-600 leading-relaxed">
                {p.contribution}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.keywords.slice(0, 5).map((k, j) => (
                  <span
                    key={j}
                    className="text-[11px] text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[12px] font-semibold tracking-wide">
                {hasCase ? (
                  <span className="text-blue-600">케이스 스터디 보기 &rarr;</span>
                ) : (
                  <span className="text-gray-300">케이스 스터디 준비 중</span>
                )}
              </p>
            </article>
          );

          return hasCase ? (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="block">
              {cardBody}
            </Link>
          ) : (
            <div key={p.slug}>{cardBody}</div>
          );
        })}
      </div>
    </section>
  );
}
