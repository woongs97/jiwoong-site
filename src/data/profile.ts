// 프로필 — 한 줄 직함, 자기소개, 연락처
// 수정 시: 이 파일을 직접 고치면 사이트에 바로 반영됩니다(ISR 60초).

export type Locale = "ko" | "en";

export interface ProfileContent {
  name: string;
  nameSubtitle?: string; // 영문 보조 이름 등
  role: string;          // 한 줄 직함
  tagline: string;       // 헤드라인 한 문장
  statement: string[];   // 자기소개 문단들
  location: string;
  email: string;
  github?: string;
  linkedin?: string;
  blog?: string;
}

export const profile: Record<Locale, ProfileContent> = {
  ko: {
    name: "한지웅",
    nameSubtitle: "Han Jiwoong",
    role: "Program / Project Manager",
    tagline:
      "전략, 운영, SCM을 가로지르며 복잡한 문제를 실행 가능한 구조와 운영 메커니즘으로 전환합니다.",
    statement: [
      "전략 PM과 운영·SCM을 모두 경험하면서, 큰 방향과 매일의 실행을 잇는 다리를 만드는 일을 해왔습니다. 전략 PM 영역에서는 로드맵·마일스톤·의사결정 자료를 구조화해 부서를 함께 움직이게 만들었고, 운영·SCM 영역에서는 반복 가능한 로직과 가벼운 자동화 컨셉으로 실행 품질을 끌어올리는 데 집중했습니다.",
      "강점은 ‘구조화된 실행’입니다. 모호한 환경을 마일스톤·의존성·의사결정 포인트로 쪼개고, 팀이 일관되게 움직일 수 있는 메커니즘을 만드는 일을 잘합니다. 최근에는 매출·재고 최적화와 의사결정 로직 설계, 운영 효율 개선에 집중하고 있습니다.",
    ],
    location: "Seoul, South Korea",
    email: "krfrontman@gmail.com",
  },
  en: {
    name: "Han Jiwoong",
    nameSubtitle: "한지웅",
    role: "Program / Project Manager",
    tagline:
      "Bridging strategy, operations, and SCM to turn complex problems into executable structures and scalable operating mechanisms.",
    statement: [
      "I’ve worked across both strategic planning and operations-focused roles, which has helped me build a strong bridge between high-level direction and day-to-day execution. In strategy PM roles, I led cross-functional initiatives by structuring roadmaps, milestones, and decision materials. In operations and SCM roles, I focused on building repeatable logic and improving execution quality through better workflows, decision support, and lightweight automation concepts.",
      "My core strength is structured execution. I’m comfortable working in ambiguous environments, breaking problems down into milestones, dependencies, and decision points, and creating mechanisms that help teams execute more consistently. Recently I’ve been focusing on revenue and inventory optimization, decision logic design, and operational efficiency improvement.",
    ],
    location: "Seoul, South Korea",
    email: "krfrontman@gmail.com",
  },
};
