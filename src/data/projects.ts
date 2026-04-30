// 대표 프로젝트 — Strong Yes 3개 + Yes 5개 큐레이션
// 케이스 스터디(caseStudy)가 채워진 프로젝트만 /portfolio/[slug] 상세 페이지가 생깁니다.

import type { Locale } from "./profile";

// ─── Case Study Types ────────────────────────────────────
export interface CaseStudyMetric {
  label: string;
  before?: string;
  after?: string;
  change?: string;
}

export interface CaseStudyStep {
  title: string;
  detail: string;
}

export interface CaseStudyContent {
  question: string;          // 표지: 던지는 질문 형태의 제목
  role: string;              // 본인 역할
  period: string;            // 기간
  problemOwner?: string;     // 문제 오너 / 소속 조직
  problem: {
    summary: string;
    symptoms: string[];
    rootCauses: string[];
  };
  solution: {
    summary: string;
    steps: CaseStudyStep[];
  };
  outcomes: {
    headline?: string;
    metrics: CaseStudyMetric[];
    notes?: string[];
  };
  myRole: {
    summary: string;
    contributions: string[];
  };
  resources?: { label: string; url?: string }[];
}

// ─── Project Entry ───────────────────────────────────────
export interface ProjectEntry {
  slug: string;
  title: string;
  company: string;
  category: string;
  problem: string;          // 카드용 한 줄 요약
  contribution: string;     // 카드용 한 줄 요약
  outcomes?: string[];      // 카드용 산출물 태그
  keywords: string[];
  highlight?: boolean;      // Strong Yes — 강조
  featured?: boolean;       // 화면 노출 여부 (default: true)
  caseStudy?: CaseStudyContent;  // 있으면 상세 페이지 생성
}

export const projects: Record<Locale, ProjectEntry[]> = {
  ko: [
    {
      slug: "revenue-inventory-optimization",
      title: "Revenue & Inventory Optimization 운영 모델",
      company: "이랜드월드",
      category: "SCM / BizOps / 의사결정 지원",
      problem:
        "매출·재고 신호를 활용한 의사결정이 사람·시점에 따라 흔들리고, 자동화 여지가 컸음.",
      contribution:
        "매출/재고 시그널을 분석해 실행 우선순위로 변환하고, 의사결정 지원 프레임워크와 분석 로직을 설계했습니다.",
      outcomes: ["의사결정 지원 프레임워크", "분석 로직", "자동화 컨셉"],
      keywords: ["SCM", "재고 최적화", "매출 최적화", "운영 자동화"],
      highlight: true,
      caseStudy: {
        question:
          "매출과 재고 신호를 어떻게 일관된 실행 결정으로 바꿀 수 있을까?",
        role: "SCM · 의사결정 로직 설계자",
        period: "2024.09 — 현재",
        problemOwner: "SPAO 글로벌 SCM",
        problem: {
          summary:
            "매일 매출과 재고에서 쏟아지는 시그널을 어떤 액션으로 변환할지에 대한 의사결정이 담당자와 시점에 따라 흔들리고 있었다. 결정 자체보다, 결정 과정의 일관성이 비즈니스 임팩트를 좌우하는 단계였다.",
          symptoms: [
            "동일한 상품·상황에서도 담당자에 따라 할인·분배 결정의 결과가 다르게 내려짐",
            "[채워주세요: 구체 지표 — 예: 시즌 종료 시점 잔여재고율, 결정 리드타임, 예외 케이스 빈도 등]",
            "[채워주세요: 운영팀이 가장 시간을 많이 쓰는 결정 종류와 그 빈도]",
          ],
          rootCauses: [
            "의사결정 기준이 문서화되지 않고 개인 경험에 의존",
            "매출·재고·외부 시그널이 분산돼 한 화면에서 보기 어려움",
            "예외 케이스가 빈번한데 일관된 처리 규칙이 없음",
            "[채워주세요: 시스템·조직 차원에서 발견한 추가 원인]",
          ],
        },
        solution: {
          summary:
            "흩어진 시그널을 한 화면에서 보고, 결정 규칙을 명문화한 의사결정 지원 모델을 만들어 반복 가능한 패턴으로 전환했다.",
          steps: [
            {
              title: "시그널 정의와 우선순위화",
              detail:
                "매출·재고에서 매일 쏟아지는 신호 중 의사결정에 ‘진짜로’ 의미 있는 것을 추려, 일·주·월 단위로 위계를 잡았다. 노이즈는 떼어냄.",
            },
            {
              title: "의사결정 규칙 명문화",
              detail:
                "할인·분배·재고 이동에 대한 반복 가능한 규칙을 만들고, 예외 케이스의 처리 경로를 별도로 분리해 결정 일관성을 확보.",
            },
            {
              title: "의사결정 도구 설계",
              detail:
                "현장 담당자가 매일 쓰는 의사결정 지원 인터페이스를 설계. [채워주세요: 어떤 형태의 도구인지 — 대시보드 / 룰 엔진 / 알림 시스템 등], 운영 데이터 모델링과 연동.",
            },
            {
              title: "SCM × AI 자동화 컨셉 실험",
              detail:
                "반복 결정에 대한 자동화 가능성을 검증. [채워주세요: 어떤 컨셉을 어떻게 실험했고, 어디까지 진행했는지 — PoC 범위, 사용 모델, 실험 결과].",
            },
          ],
        },
        outcomes: {
          headline:
            "의사결정의 일관성과 추적성을 끌어올리고, 운영 자동화의 출발점을 만들었다.",
          metrics: [
            {
              label: "[채워주세요: 지표 1 — 예: 의사결정 리드타임]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
            {
              label: "[채워주세요: 지표 2 — 예: 잔여재고율 / 재고 회전일수]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
            {
              label: "[채워주세요: 지표 3 — 예: 예외 처리율, 자동화 적용 범위]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
          ],
          notes: [
            "[솔직한 한계 — 예: AI 자동화는 PoC 단계까지 진행, 운영 배포는 다음 단계 / 일부 카테고리에서는 룰 적용이 어려웠던 이유 등]",
          ],
        },
        myRole: {
          summary:
            "현업 담당자·BI·기획팀과 협업하며 시그널 정의부터 의사결정 도구 설계까지 전 과정을 리드했다.",
          contributions: [
            "시그널 정의·우선순위화 워크숍 운영 및 결정 기준 도출",
            "의사결정 규칙 프레임워크와 예외 처리 로직 설계",
            "운영 데이터 모델링 — 어떤 데이터를 어떤 형태로 모아야 결정에 쓰일 수 있는지 정의",
            "의사결정 도구 PRD 작성 및 [채워주세요: 개발/구축 협업 범위]",
            "SCM × AI 컨셉 검증 — [채워주세요: 검증 형태와 본인이 담당한 범위]",
          ],
        },
      },
    },
    {
      slug: "discount-allocation-logic",
      title: "할인 / 분배 의사결정 로직 설계",
      company: "이랜드월드",
      category: "SCM / 운영 로직 / 최적화",
      problem:
        "할인·분배 의사결정이 수동적이고 일관되지 않아 산출 품질이 흔들렸음.",
      contribution:
        "반복 가능한 규칙과 예외 처리 로직을 설계해 의사결정의 일관성과 추적성을 끌어올렸습니다.",
      outcomes: ["의사결정 로직", "규칙 프레임워크", "운영 모델"],
      keywords: ["할인 로직", "분배·할당", "예외 처리", "재고 최적화"],
      highlight: true,
      caseStudy: {
        question:
          "할인과 분배 결정을 어떻게 일관되고 추적 가능한 규칙으로 만들 수 있을까?",
        role: "SCM · 운영 로직 설계",
        period: "2024.09 — 현재",
        problemOwner: "SPAO 글로벌 SCM",
        problem: {
          summary:
            "할인과 재고 분배 의사결정이 담당자·시점에 따라 흔들렸다. 같은 결정이 반복돼도 매번 처음부터 판단하느라 운영 부담이 컸고, 결정 결과를 사후에 추적·검증하기도 어려웠다.",
          symptoms: [
            "동일한 상품·재고 상황에서 담당자별로 다른 할인·분배 결정이 내려짐",
            "[채워주세요: 구체 지표 — 결정 리드타임 / 예외 처리 빈도 / 잔여재고율 등]",
            "[채워주세요: 결정 결과를 사후에 검증·추적하기 어려웠던 사례]",
          ],
          rootCauses: [
            "의사결정 기준이 문서화되지 않고 개인 경험에 의존",
            "정상 케이스와 예외가 같은 흐름에서 처리되어 룰 적용이 어려움",
            "예외가 빈번한데 일관된 처리 규칙 부재",
            "[채워주세요: 시스템·데이터·조직 차원의 추가 원인]",
          ],
        },
        solution: {
          summary:
            "정상 케이스의 반복 가능한 규칙을 명문화하고, 예외 처리 경로를 별도로 분리해 결정 일관성과 추적성을 동시에 확보했다.",
          steps: [
            {
              title: "의사결정 케이스 분류",
              detail:
                "할인·분배 결정을 정상/예외로 나누고, 각 케이스의 발생 빈도와 영향도를 매핑.",
            },
            {
              title: "정상 케이스 규칙 명문화",
              detail:
                "재고·매출·시즌 변수에 따른 기본 규칙을 정의. 누가 결정해도 같은 결과가 나오도록 룰 자체를 운영 기준으로 격상.",
            },
            {
              title: "예외 처리 경로 설계",
              detail:
                "예외 케이스는 별도 트리거·승인 경로로 분리. 룰이 흔들리지 않도록 ‘예외는 예외다움을 유지’.",
            },
            {
              title: "운영 모델 정착",
              detail:
                "[채워주세요: 룰을 실제 운영에 안착시킨 방식 — 매뉴얼화 / 도구 연동 / 검토 사이클 등]",
            },
          ],
        },
        outcomes: {
          headline:
            "결정의 일관성과 추적성을 동시에 확보하고, 예외 케이스가 룰을 오염시키는 구조를 끊었다.",
          metrics: [
            {
              label: "[채워주세요: 지표 1 — 예: 결정 일관성 / 룰 적용률]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
            {
              label:
                "[채워주세요: 지표 2 — 예: 예외 처리 비율 / 결정 리드타임]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
            {
              label: "[채워주세요: 지표 3]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
          ],
          notes: [
            "[솔직한 한계 — 예: 일부 카테고리는 룰화가 어려웠던 이유, 룰 적용 후 새로 드러난 이슈 등]",
          ],
        },
        myRole: {
          summary:
            "케이스 분류부터 룰북 정착까지, 의사결정 로직 전 흐름의 설계자 역할.",
          contributions: [
            "결정 케이스 분류와 빈도·영향도 분석",
            "정상 케이스 룰북 작성 (재고·매출·시즌 기준 변수 정의)",
            "예외 처리 트리거·승인 경로 설계",
            "[채워주세요: 운영 정착·도구 연동·검토 사이클 등 구축 단계 협업 범위]",
          ],
        },
      },
    },
    {
      slug: "value-retail-reverse-engineering",
      title: "Value Retail Best-Practice Reverse Engineering",
      company: "이랜드그룹",
      category: "리서치 / 플레이북 설계",
      problem:
        "외부 베스트 프랙티스를 사내 실행 가능한 형태로 변환할 프레임이 필요했음.",
      contribution:
        "성공 요인을 분해하고, 가격·구색·SCM·KPI 관점에서 실행형 플레이북과 의사결정 프레임으로 정리했습니다.",
      outcomes: ["플레이북", "로드맵", "의사결정 프레임"],
      keywords: ["리버스 엔지니어링", "플레이북", "프라이싱", "어소트먼트", "KPI"],
      highlight: true,
      caseStudy: {
        question:
          "외부 베스트 프랙티스를 어떻게 ‘우리가 내일부터 할 수 있는’ 플레이북으로 옮길까?",
        role: "전략기획 PM · 리서치",
        period: "2023.07 — 2024.09 (이랜드그룹 ESI 시기 중)",
        problemOwner: "이랜드그룹 ESI 전략기획실",
        problem: {
          summary:
            "Value Retail 영역에서 다이소·초저가 BP 등 외부 사례 분석은 있었지만, 우리 BU가 ‘내일 무엇을 다르게 할지’의 형태로 옮기는 변환 단계가 비어 있었다.",
          symptoms: [
            "사례 보고만 있고 실행 액션 항목으로 연결되지 않음",
            "가격·구색·SCM 단편 인사이트가 분산되어 의사결정에 쓰기 어려움",
            "[채워주세요: 외부 분석이 사내 액션으로 안 옮겨가던 구체 사례]",
          ],
          rootCauses: [
            "산업 분석을 ‘분석’으로 끝내고, 우리 운영 변수로 변환하는 프레임 부재",
            "성공 요인이 가격·구색·SCM·KPI 등 다축으로 얽혀 있어 단편 적용이 어려움",
            "[채워주세요: 추가 원인]",
          ],
        },
        solution: {
          summary:
            "Value Retail의 성공 요인을 4축(가격·구색·SCM·KPI)으로 분해하고, 우리 BU 실행 변수로 변환하는 플레이북·의사결정 프레임을 만들었다.",
          steps: [
            {
              title: "성공 요인 분해",
              detail:
                "다이소·초저가 BP 등 사례에서 가격·구색·SCM·KPI 4축의 핵심 드라이버를 분리.",
            },
            {
              title: "우리 BU 변환",
              detail:
                "각 축을 우리 BU 운영 변수로 매핑. 그대로 적용 가능 / 변형 필요 / 적용 불가로 분류.",
            },
            {
              title: "플레이북·로드맵 작성",
              detail:
                "변환된 액션을 단기·중기 로드맵으로 시퀀스화. 우선순위는 임팩트·구현 난이도 매트릭스로 결정.",
            },
            {
              title: "의사결정 프레임화",
              detail:
                "[채워주세요: 일회성 보고서가 아닌 반복 가능한 의사결정 프레임으로 어떻게 정착시켰는지]",
            },
          ],
        },
        outcomes: {
          headline:
            "외부 인사이트를 ‘분석’에서 ‘실행 매뉴얼’로 변환하는 회로를 만들었다.",
          metrics: [
            {
              label:
                "[채워주세요: 지표 1 — 예: 도출된 액션 항목 수 / 채택률]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
            {
              label: "[채워주세요: 지표 2 — 예: 후속 적용 프로젝트 수]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
            {
              label: "[채워주세요: 지표 3]",
              before: "[before]",
              after: "[after]",
              change: "[변화량/%]",
            },
          ],
          notes: [
            "[솔직한 한계 — 예: 일부 축은 우리 BU 환경에서 구현이 어려웠던 이유, 후속 변화의 측정 한계 등]",
          ],
        },
        myRole: {
          summary:
            "분석 결과를 ‘실행 가능한 매뉴얼’로 변환하는 데 초점을 두고 전 과정을 리드.",
          contributions: [
            "Value Retail 성공 요인 4축 분해 프레임 설계",
            "우리 BU 운영 변수 매핑 — 적용/변형/제외 분류",
            "플레이북·로드맵 작성 및 우선순위 매트릭스 도출",
            "[채워주세요: 후속 의사결정 프레임 정착 단계의 협업 범위]",
          ],
        },
      },
    },
    {
      slug: "outlet-mall-launch",
      title: "온라인 신규 아울렛몰 0→1 런칭",
      company: "이랜드그룹",
      category: "Launch / PM / 전략-실행 연결",
      problem:
        "신사업으로 출범하는 아울렛몰의 부서간 런칭 준비를 정렬할 구조가 필요했음.",
      contribution:
        "런칭 플랜·마일스톤·핸드오프 자료를 구조화해 Go-Live 준비도와 운영 인계를 지원했습니다.",
      outcomes: ["런칭 플랜", "로드맵", "정렬 자료"],
      keywords: ["0→1", "런칭", "마일스톤", "크로스펑셔널 실행"],
    },
    {
      slug: "vietnam-fashion-platform",
      title: "베트남 패션 플랫폼 전략 Blueprint",
      company: "이랜드그룹",
      category: "전략 기획",
      problem:
        "신규 시장에 대한 운영 모델 가설과 방향성 설정이 필요했음.",
      contribution:
        "시장·운영 모델 가설을 세우고, 실행 가능한 전략 청사진으로 변환했습니다.",
      outcomes: ["전략 Blueprint", "운영 모델 가설"],
      keywords: ["전략", "마켓 모델", "Blueprint", "기획"],
    },
    {
      slug: "spao-men-repositioning",
      title: "SPAO for Men 리포지셔닝",
      company: "이랜드그룹",
      category: "브랜드 / 비즈니스 전략",
      problem:
        "타겟 방향성 재정의와 롤아웃 우선순위 설정이 필요했음.",
      contribution:
        "타겟 방향, 핵심 이니셔티브, 롤아웃 로드맵을 정의하고 이해관계자 정렬을 이끌었습니다.",
      outcomes: ["로드맵", "이니셔티브 구조"],
      keywords: ["리포지셔닝", "로드맵", "이해관계자 정렬"],
    },
    {
      slug: "spao-1t-vision",
      title: "SPAO 1T Vision 전략",
      company: "이랜드그룹",
      category: "전략 / 리더십 의사결정 지원",
      problem:
        "리더십 레벨 의사결정을 위한 전략 테마와 이니셔티브 백로그가 분산되어 있었음.",
      contribution:
        "전략 테마와 이니셔티브 백로그를 통합 정리해 리더십 의사결정에 쓸 수 있는 형태로 가공했습니다.",
      outcomes: ["전략 덱", "이니셔티브 백로그"],
      keywords: ["비전", "리더십 의사결정 지원", "전략 통합"],
    },
    {
      slug: "operations-risk-workflow",
      title: "운영 / 리스크 워크플로우 표준화",
      company: "마크비전코리아",
      category: "Operations / Risk / Workflow",
      problem:
        "운영 예외를 줄이고 일관된 산출 품질을 만들 표준이 부재했음.",
      contribution:
        "이해관계자 조정, 워크플로우 표준화, 이슈 트래킹·문서화 체계를 정착시켰습니다.",
      outcomes: ["워크플로우 표준", "이슈 트래킹 체계", "문서 표준"],
      keywords: ["리스크 관리", "운영", "문서화", "조정"],
    },
  ],
  en: [
    {
      slug: "revenue-inventory-optimization",
      title: "Revenue & Inventory Optimization Operating Model",
      company: "E-LAND WORLD",
      category: "SCM / BizOps / Decision Support",
      problem:
        "Revenue and inventory decisions were inconsistent across people and timing, with significant room for automation.",
      contribution:
        "Analyzed sales and inventory signals, translated insights into execution priorities, and designed a decision-support framework and analysis logic.",
      outcomes: ["Decision-support framework", "Analysis logic", "Automation concept"],
      keywords: ["SCM", "Inventory optimization", "Revenue optimization", "Ops automation"],
      highlight: true,
    },
    {
      slug: "discount-allocation-logic",
      title: "Discount & Allocation Decision Logic Design",
      company: "E-LAND WORLD",
      category: "SCM / Operations Logic / Optimization",
      problem:
        "Discounting and allocation decisions were manual and inconsistent, hurting output quality.",
      contribution:
        "Designed repeatable rules and exception-handling logic to improve consistency and traceability of decisions.",
      outcomes: ["Decision logic", "Rule framework", "Operating model"],
      keywords: ["Discount logic", "Allocation", "Exception handling", "Inventory"],
      highlight: true,
    },
    {
      slug: "value-retail-reverse-engineering",
      title: "Value Retail Best-Practice Reverse Engineering",
      company: "E-LAND Group",
      category: "Research / Playbook Design",
      problem:
        "Needed a frame to convert external best practices into an internal execution-ready playbook.",
      contribution:
        "Decomposed success drivers and translated them into an execution-ready playbook and decision framework spanning pricing, assortment, SCM, and KPIs.",
      outcomes: ["Playbook", "Roadmap", "Decision framework"],
      keywords: ["Reverse engineering", "Playbook", "Pricing", "Assortment", "KPI"],
      highlight: true,
    },
    {
      slug: "outlet-mall-launch",
      title: "New Online Outlet Mall Launch (0→1)",
      company: "E-LAND Group",
      category: "Launch / PM / Strategy-to-execution",
      problem:
        "A new business required structured launch readiness across teams.",
      contribution:
        "Structured the launch plan, milestones, and cross-team alignment to support go-live readiness and operational handoff.",
      outcomes: ["Launch plan", "Roadmap", "Alignment materials"],
      keywords: ["0→1", "Launch", "Milestones", "Cross-functional execution"],
    },
    {
      slug: "vietnam-fashion-platform",
      title: "Vietnam Fashion Platform Strategy Blueprint",
      company: "E-LAND Group",
      category: "Strategic Planning",
      problem:
        "Required market and operating-model hypotheses for direction setting in a new market.",
      contribution:
        "Built market and operating-model hypotheses and translated them into an actionable strategy blueprint.",
      outcomes: ["Strategy blueprint", "Operating model hypothesis"],
      keywords: ["Strategy", "Market model", "Blueprint", "Planning"],
    },
    {
      slug: "spao-men-repositioning",
      title: "SPAO for Men Repositioning",
      company: "E-LAND Group",
      category: "Brand / Business Strategy",
      problem:
        "Needed to redefine target direction and rollout priorities.",
      contribution:
        "Defined target direction, key initiatives, and rollout roadmap with stakeholder alignment.",
      outcomes: ["Roadmap", "Initiative structure"],
      keywords: ["Repositioning", "Roadmap", "Stakeholder alignment"],
    },
    {
      slug: "spao-1t-vision",
      title: "SPAO 1T Vision Strategy",
      company: "E-LAND Group",
      category: "Strategy / Leadership Support",
      problem:
        "Leadership needed consolidated strategic themes and initiative backlog.",
      contribution:
        "Consolidated strategic themes and the initiative backlog into a form usable for leadership-level decisions.",
      outcomes: ["Strategy deck", "Initiative backlog"],
      keywords: ["Vision", "Leadership decision support", "Strategy consolidation"],
    },
    {
      slug: "operations-risk-workflow",
      title: "Operations / Risk Workflow Standardization",
      company: "MarqVision",
      category: "Operations / Risk / Workflow",
      problem:
        "Needed to reduce operational exceptions and ensure consistent delivery quality.",
      contribution:
        "Coordinated stakeholders, standardized workflows, and improved issue tracking and documentation.",
      outcomes: ["Workflow standard", "Issue tracking", "Documentation standards"],
      keywords: ["Risk management", "Operations", "Documentation", "Coordination"],
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────
export function findProjectBySlug(
  slug: string,
  locale: Locale = "ko"
): ProjectEntry | undefined {
  return projects[locale].find((p) => p.slug === slug);
}
