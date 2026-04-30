import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, findProjectBySlug } from "../../../data/projects";
import CaseStudyView from "../../../components/CaseStudyView";

export const revalidate = 60;

export async function generateStaticParams() {
  return projects.ko
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.slug }));
}

export default async function PortfolioCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProjectBySlug(slug, "ko");

  if (!project || !project.caseStudy) {
    notFound();
  }

  return (
    <article className="max-w-[820px] mx-auto px-6 pt-12 pb-24">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8"
      >
        <span>&larr;</span> 포트폴리오로
      </Link>
      <CaseStudyView
        data={project.caseStudy}
        title={project.title}
        company={project.company}
        category={project.category}
        keywords={project.keywords}
      />
    </article>
  );
}
