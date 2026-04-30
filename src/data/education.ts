// 학력 + 자격/어학
import type { Locale } from "./profile";

export interface EducationEntry {
  school: string;
  major?: string;
  period: string;
}

export interface CertificationEntry {
  title: string;
  detail?: string;
  date: string;
}

export const education: Record<Locale, EducationEntry[]> = {
  ko: [
    {
      school: "연세대학교",
      major: "시스템생물학 학사",
      period: "2016 — 2022",
    },
    {
      school: "Auckland International College (New Zealand)",
      major: "고등학교",
      period: "2013 — 2015",
    },
  ],
  en: [
    {
      school: "Yonsei University",
      major: "B.S. in Systems Biology",
      period: "2016 — 2022",
    },
    {
      school: "Auckland International College (New Zealand)",
      major: "High School",
      period: "2013 — 2015",
    },
  ],
};

export const certifications: Record<Locale, CertificationEntry[]> = {
  ko: [
    { title: "TOEIC Speaking", detail: "Advanced High · 200점", date: "2021.09" },
    { title: "TOEIC", detail: "990 / PASS", date: "2018.07" },
  ],
  en: [
    { title: "TOEIC Speaking", detail: "Advanced High · 200", date: "Sep 2021" },
    { title: "TOEIC", detail: "990 / PASS", date: "Jul 2018" },
  ],
};
