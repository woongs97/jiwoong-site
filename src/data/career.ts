// 경력 — 회사별 타임라인
// "current: true" 인 항목만 자동으로 "현재 / Present" 라벨이 붙습니다.

import type { Locale } from "./profile";

export interface CareerEntry {
  company: string;       // 회사명
  org?: string;          // 부서/사업부
  role: string;          // 직무
  period: string;        // 기간 표시
  current?: boolean;     // 현재 재직 중 여부
  summary: string;       // 한 줄 요약
  highlights?: string[]; // 핵심 업무/성과 (불릿)
}

export const career: Record<Locale, CareerEntry[]> = {
  ko: [
    {
      company: "이랜드월드",
      org: "SPAO 글로벌 SCM",
      role: "SCM · Revenue & Inventory Optimization",
      period: "2024.09 — 현재",
      current: true,
      summary:
        "매출·재고 시그널을 분석해 실행 우선순위를 만들고, 할인·분배 의사결정을 자동화하는 로직과 운영 모델을 설계합니다.",
      highlights: [
        "할인·분배 로직 설계 — 반복 규칙과 예외 처리 체계화",
        "운영 데이터 모델링과 의사결정 도구 구축",
        "SCM × AI(자동화/최적화) 컨셉 실험",
      ],
    },
    {
      company: "이랜드그룹",
      org: "ESI 전략기획실",
      role: "Project Manager · 전략기획",
      period: "2023.07 — 2024.09",
      summary:
        "전략을 실행으로 잇는 크로스펑셔널 PJ 8건을 리드. 시장 인사이트와 베스트프랙티스를 운영 가능한 로드맵·플레이북으로 변환했습니다.",
      highlights: [
        "온라인 신규 아울렛몰 0→1 런칭 PJ",
        "베트남 패션 플랫폼 전략서",
        "SPAO for Men 리포지셔닝 / 1T Vision 전략",
        "다이소 BP Reverse Engineering · 초저가 BM 분석",
      ],
    },
    {
      company: "마크비전코리아 (YC S21)",
      org: "Brand Research Unit",
      role: "Operations Specialist & Risk Management",
      period: "2022.01 — 2023.07",
      summary:
        "이해관계자 조정과 워크플로우 표준화로 운영 예외를 줄이고, 일관된 산출 품질을 보장하는 운영 체계를 만들었습니다.",
      highlights: [
        "리스크 매니지먼트와 이슈 트래킹 구조화",
        "내부 팀간 커뮤니케이션·문서화 표준 수립",
      ],
    },
    {
      company: "코나아이",
      role: "플랫폼 마케팅 · 비즈 서비스 운영 매니저",
      period: "2021.07 — 2021.08",
      summary:
        "신규 서비스(인천e음·대덕e로움·배달양산)의 운영 워크플로우와 핸드오프 효율을 개선했습니다.",
    },
  ],
  en: [
    {
      company: "E-LAND WORLD",
      org: "SPAO Global SCM",
      role: "SCM · Revenue & Inventory Optimization",
      period: "Sep 2024 — Present",
      current: true,
      summary:
        "Translate sales and inventory signals into execution priorities, and design decision logic and operating models that automate discounting and allocation choices.",
      highlights: [
        "Designed discount and allocation logic with repeatable rules and exception handling",
        "Built operational data models and decision-support tooling",
        "Explored SCM × AI automation and optimization concepts",
      ],
    },
    {
      company: "E-LAND Group",
      org: "ESI Strategic Planning Office",
      role: "Project Manager · Strategic Planning",
      period: "Jul 2023 — Sep 2024",
      summary:
        "Led 8 cross-functional strategy-to-execution projects, converting market insights and best practices into actionable roadmaps and playbooks.",
      highlights: [
        "0→1 online outlet mall launch PJ",
        "Vietnam fashion platform strategy blueprint",
        "SPAO for Men repositioning / 1T Vision strategy",
        "Daiso BP reverse engineering & value-retail BM analysis",
      ],
    },
    {
      company: "MarqVision (YC S21)",
      org: "Brand Research Unit",
      role: "Operations Specialist & Risk Management",
      period: "Jan 2022 — Jul 2023",
      summary:
        "Reduced operational exceptions and ensured consistent delivery quality through stakeholder coordination and standardized workflows.",
      highlights: [
        "Structured risk management and issue tracking",
        "Established cross-team communication and documentation standards",
      ],
    },
    {
      company: "Konai",
      role: "Platform Marketing · Biz Service Operations Manager",
      period: "Jul 2021 — Aug 2021",
      summary:
        "Improved workflows and handoff efficiency for new services (Incheon-eum, Daedeok-e-roum, Baedal-Yangsan).",
    },
  ],
};
