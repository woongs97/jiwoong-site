// 스킬 — 카테고리별로 묶기
import type { Locale } from "./profile";

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: Record<Locale, SkillGroup[]> = {
  ko: [
    {
      label: "Strategy & Planning",
      items: ["전략기획", "사업전략·기획", "전략컨설팅", "PM·PMO", "로드맵 설계"],
    },
    {
      label: "Operations & SCM",
      items: ["SCM", "재고 최적화", "할인·분배 로직 설계", "운영 자동화 컨셉", "워크플로우 표준화"],
    },
    {
      label: "Decision & Data",
      items: ["의사결정 도구 설계", "운영 데이터 모델링", "이슈 트래킹·문서화"],
    },
  ],
  en: [
    {
      label: "Strategy & Planning",
      items: [
        "Strategic planning",
        "Business strategy",
        "Strategy consulting",
        "PM / PMO",
        "Roadmap design",
      ],
    },
    {
      label: "Operations & SCM",
      items: [
        "SCM",
        "Inventory optimization",
        "Discount / allocation logic",
        "Ops automation concepts",
        "Workflow standardization",
      ],
    },
    {
      label: "Decision & Data",
      items: [
        "Decision-support tooling",
        "Operational data modeling",
        "Issue tracking & documentation",
      ],
    },
  ],
};
