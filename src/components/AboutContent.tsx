import Link from "next/link";
import type { Locale } from "../data/profile";
import { profile } from "../data/profile";
import { career } from "../data/career";
import { skills } from "../data/skills";
import { education, certifications } from "../data/education";

const labels: Record<
  Locale,
  {
    nav: {
      career: string;
      skills: string;
      education: string;
      certifications: string;
      contact: string;
    };
    quick: {
      current: string;
      experience: string;
      education: string;
      location: string;
      experienceValue: string;
    };
    contact: {
      email: string;
      copy: string;
    };
    misc: {
      sectionAbout: string;
    };
    bridge: {
      toPortfolio: string;
    };
  }
> = {
  ko: {
    nav: {
      career: "경력",
      skills: "스킬",
      education: "학력",
      certifications: "자격·어학",
      contact: "Contact",
    },
    quick: {
      current: "현재",
      experience: "경력",
      education: "학력",
      location: "위치",
      experienceValue: "4년 4개월",
    },
    contact: {
      email: "이메일",
      copy: "함께 일을 만들거나 이야기 나누고 싶다면 편하게 연락주세요.",
    },
    misc: {
      sectionAbout: "About",
    },
    bridge: {
      toPortfolio: "프로젝트별 상세 케이스 스터디는 포트폴리오에서",
    },
  },
  en: {
    nav: {
      career: "Career",
      skills: "Skills",
      education: "Education",
      certifications: "Certifications",
      contact: "Contact",
    },
    quick: {
      current: "Current",
      experience: "Experience",
      education: "Education",
      location: "Location",
      experienceValue: "4 yrs 4 mos",
    },
    contact: {
      email: "Email",
      copy: "Open to building things together or just having a conversation — feel free to reach out.",
    },
    misc: {
      sectionAbout: "About",
    },
    bridge: {
      toPortfolio: "Project case studies in Portfolio",
    },
  },
};

export default function AboutContent({ locale }: { locale: Locale }) {
  const p = profile[locale];
  const c = career[locale];
  const s = skills[locale];
  const edu = education[locale];
  const certs = certifications[locale];
  const t = labels[locale];

  const currentJob = c.find((x) => x.current) ?? c[0];
  const topEducation = edu[0];

  return (
    <div className="max-w-[920px] mx-auto px-6 pt-14 pb-24">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-12">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl text-white font-bold flex-shrink-0 shadow-lg shadow-blue-100">
          지
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
            {p.name}
          </h1>
          {p.nameSubtitle && (
            <p className="text-gray-400 text-sm mb-3">{p.nameSubtitle}</p>
          )}
          <p className="text-blue-600 font-semibold mb-4">{p.role}</p>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-xl">
            {p.tagline}
          </p>
        </div>
      </section>

      {/* ── Quick Card ──────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
        <QuickCell
          label={t.quick.current}
          value={currentJob.company}
          sub={currentJob.org ?? currentJob.role}
        />
        <QuickCell
          label={t.quick.experience}
          value={t.quick.experienceValue}
          sub={c[c.length - 1].period.split("—")[0].trim() + " ~"}
        />
        <QuickCell
          label={t.quick.education}
          value={topEducation.school}
          sub={topEducation.major}
        />
        <QuickCell
          label={t.quick.location}
          value={p.location.split(",")[0]}
          sub={p.location.split(",").slice(1).join(",").trim() || undefined}
        />
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <Section title={t.misc.sectionAbout}>
        <div className="space-y-4 text-[15px] text-gray-700 leading-[1.8]">
          {p.statement.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Section>

      {/* ── Career ──────────────────────────────────────── */}
      <Section title={t.nav.career}>
        <ol className="relative">
          {c.map((entry, i) => (
            <li
              key={i}
              className={`relative pl-6 pb-7 ${
                i !== c.length - 1 ? "border-l border-gray-200" : ""
              }`}
            >
              <span
                className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                  entry.current
                    ? "bg-blue-600 ring-4 ring-blue-100"
                    : "bg-gray-300"
                }`}
              />
              <p className="text-xs text-gray-400 font-medium tracking-wide mb-1">
                {entry.period}
              </p>
              <h3 className="text-[16px] font-bold text-gray-900">
                {entry.company}
                {entry.org && (
                  <span className="text-gray-400 font-medium">
                    {" "}
                    · {entry.org}
                  </span>
                )}
              </h3>
              <p className="text-sm text-blue-600 font-semibold mt-0.5 mb-2">
                {entry.role}
              </p>
              <p className="text-[14.5px] text-gray-600 leading-relaxed">
                {entry.summary}
              </p>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-[14px] text-gray-500">
                  {entry.highlights.map((h, j) => (
                    <li key={j} className="pl-4 relative leading-relaxed">
                      <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-gray-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Bridge to Portfolio ─────────────────────────── */}
      <div className="mb-14 -mt-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:gap-2.5 transition-all"
        >
          {t.bridge.toPortfolio} <span>&rarr;</span>
        </Link>
      </div>

      {/* ── Skills ──────────────────────────────────────── */}
      <Section title={t.nav.skills}>
        <div className="space-y-4">
          {s.map((group, i) => (
            <div key={i}>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-700 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Education ───────────────────────────────────── */}
      <Section title={t.nav.education}>
        <div className="divide-y divide-gray-100">
          {edu.map((e, i) => (
            <div key={i} className="flex gap-5 py-3">
              <span className="text-[13px] text-gray-400 font-medium min-w-[110px] pt-0.5">
                {e.period}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {e.school}
                </h3>
                {e.major && (
                  <p className="text-sm text-gray-500 mt-0.5">{e.major}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Certifications ──────────────────────────────── */}
      <Section title={t.nav.certifications}>
        <div className="divide-y divide-gray-100">
          {certs.map((cert, i) => (
            <div key={i} className="flex gap-5 py-3">
              <span className="text-[13px] text-gray-400 font-medium min-w-[110px] pt-0.5">
                {cert.date}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {cert.title}
                </h3>
                {cert.detail && (
                  <p className="text-sm text-gray-500 mt-0.5">{cert.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ─────────────────────────────────────── */}
      <Section title={t.nav.contact}>
        <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
          {t.contact.copy}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${p.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <span>✉</span> {p.email}
          </a>
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-gray-400 transition-colors"
            >
              GitHub
            </a>
          )}
          {p.linkedin && (
            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-gray-400 transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="text-lg font-bold tracking-tight mb-5 pb-2.5 border-b-2 border-gray-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

function QuickCell({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3.5">
      <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
        {label}
      </p>
      <p className="text-[14px] font-bold text-gray-900 leading-tight">
        {value}
      </p>
      {sub && (
        <p className="text-[12px] text-gray-500 mt-0.5 leading-tight truncate">
          {sub}
        </p>
      )}
    </div>
  );
}
