import type { Metadata } from "next";
import AboutContent from "../../../components/AboutContent";

export const metadata: Metadata = {
  title: "Resume — Han Jiwoong",
  description:
    "Program / Project Manager who bridges strategy, operations, and SCM to turn complex problems into executable structures and scalable operating mechanisms.",
};

export default function AboutPage() {
  return <AboutContent locale="en" />;
}
