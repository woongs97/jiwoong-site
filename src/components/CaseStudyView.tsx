import type { CaseStudyContent } from "../data/projects";

export default function CaseStudyView({
  data,
  title,
  company,
  category,
  keywords,
}: {
  data: CaseStudyContent;
  title: string;
  company: string;
  category: string;
  keywords: string[];
}) {
  return (
    <div className="space-y-14">
      {/* ── Hero (표지) ──────────────────────────────── */}
      <header className="rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-purple-50/60 border border-blue-100 px-6 md:px-10 py-10">
        <p className="text-[11px] uppercase tracking-wider text-blue-600 font-semibold mb-3">
          {category}
        </p>
        <h1 className="text-2xl md:text-[28px] font-bold leading-snug tracking-tight text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-[18px] md:text-[20px] font-medium text-gray-700 leading-relaxed">
          Q. {data.question}
        </p>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 mt-7 pt-6 border-t border-blue-100/60">
          <Field label="조직" value={data.problemOwner ?? company} />
          <Field label="기간" value={data.period} />
          <Field label="역할" value={data.role} />
          <Field label="회사" value={company} />
        </dl>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-6">
            {keywords.map((k, i) => (
              <span
                key={i}
                className="text-[11px] text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5"
              >
                {k}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ── 1) 문제 — 현상과 원인 ─────────────────── */}
      <Section number="01" title="문제 — 현상과 원인">
        <p className="text-[15.5px] text-gray-700 leading-[1.85] mb-6">
          {data.problem.summary}
        </p>

        <SubBlock label="현상">
          <BulletList items={data.problem.symptoms} />
        </SubBlock>
        <SubBlock label="원인">
          <BulletList items={data.problem.rootCauses} />
        </SubBlock>
      </Section>

      {/* ── 2) 해결 방법 ─────────────────────────────── */}
      <Section number="02" title="해결 방법">
        <p className="text-[15.5px] text-gray-700 leading-[1.85] mb-6">
          {data.solution.summary}
        </p>
        <ol className="space-y-4">
          {data.solution.steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-[12px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h4 className="text-[15px] font-bold text-gray-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-[14.5px] text-gray-600 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 3) 결과 ──────────────────────────────────── */}
      <Section number="03" title="결과">
        {data.outcomes.headline && (
          <p className="text-[15.5px] text-gray-700 leading-[1.85] mb-6">
            {data.outcomes.headline}
          </p>
        )}
        {data.outcomes.metrics.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold">지표</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Before</th>
                  <th className="text-left px-4 py-2.5 font-semibold">After</th>
                  <th className="text-left px-4 py-2.5 font-semibold">변화</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.outcomes.metrics.map((m, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {m.label}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{m.before ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{m.after ?? "—"}</td>
                    <td className="px-4 py-3 text-blue-600 font-semibold">
                      {m.change ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data.outcomes.notes && data.outcomes.notes.length > 0 && (
          <div className="mt-5 p-4 rounded-lg bg-amber-50/60 border border-amber-100">
            <p className="text-[11px] uppercase tracking-wider text-amber-700 font-semibold mb-1.5">
              한계 · 솔직한 코멘트
            </p>
            <BulletList items={data.outcomes.notes} muted />
          </div>
        )}
      </Section>

      {/* ── 4) 상세 역할 ─────────────────────────────── */}
      <Section number="04" title="상세 역할">
        <p className="text-[15.5px] text-gray-700 leading-[1.85] mb-6">
          {data.myRole.summary}
        </p>
        <BulletList items={data.myRole.contributions} />
      </Section>

      {/* ── Resources (optional) ────────────────────── */}
      {data.resources && data.resources.length > 0 && (
        <Section number="—" title="Resources">
          <ul className="space-y-1.5">
            {data.resources.map((r, i) => (
              <li key={i} className="text-sm">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {r.label}
                  </a>
                ) : (
                  <span className="text-gray-700">{r.label}</span>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
        {label}
      </dt>
      <dd className="text-[14px] text-gray-800 font-medium leading-tight">
        {value}
      </dd>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5 pb-2.5 border-b-2 border-gray-100">
        <span className="text-[12px] font-bold text-gray-300 tracking-wider tabular-nums">
          {number}
        </span>
        <h2 className="text-lg font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SubBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

function BulletList({
  items,
  muted = false,
}: {
  items: string[];
  muted?: boolean;
}) {
  return (
    <ul className={`space-y-2 text-[14.5px] leading-relaxed ${muted ? "text-amber-800" : "text-gray-700"}`}>
      {items.map((item, i) => (
        <li key={i} className="pl-4 relative">
          <span
            className={`absolute left-0 top-2.5 w-1 h-1 rounded-full ${
              muted ? "bg-amber-400" : "bg-gray-400"
            }`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
