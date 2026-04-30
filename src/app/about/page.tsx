import type { Metadata } from "next";
import AboutContent from "../../components/AboutContent";

export const metadata: Metadata = {
  title: "이력서 — 한지웅",
  description:
    "전략, 운영, SCM을 가로지르며 복잡한 문제를 실행 가능한 구조와 운영 메커니즘으로 전환하는 PM 한지웅의 이력서.",
};

export default function AboutPage() {
  return <AboutContent locale="ko" />;
}
