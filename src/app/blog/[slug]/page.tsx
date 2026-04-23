import { getPostBySlug, getBlogPosts } from "../../../lib/notion";
import { notFound } from "next/navigation";
import Link from "next/link";
import NotionBlock from "../../../components/NotionBlock";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  if (!data) {
    notFound();
  }

  const { post, blocks } = data;

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="max-w-[720px] mx-auto px-6 pt-16 pb-20">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8"
      >
        <span>&larr;</span> 목록으로
      </Link>

      {/* Header */}
      <header className="mb-12">
        <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold leading-snug tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-500">
          {formattedDate} &middot; {post.readTime}
        </p>
      </header>

      {/* Content */}
      <div className="prose max-w-none">
        {blocks.map((block) => (
          <NotionBlock key={block.id} block={block} />
        ))}
      </div>
    </article>
  );
}
