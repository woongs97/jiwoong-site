import { getPostBySlug, getBlogPosts, type BlogPost } from "../../../lib/notion";
import { notFound } from "next/navigation";
import Link from "next/link";
import NotionBlock from "../../../components/NotionBlock";
import StaticPostContent from "../../../components/StaticPostContent";
import BlogCard from "../../../components/BlogCard";

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

  const { post } = data;

  const allPosts = await getBlogPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  // getBlogPosts는 날짜 내림차순. idx-1 = 더 새 글, idx+1 = 더 옛 글
  const newer: BlogPost | null = idx > 0 ? allPosts[idx - 1] : null;
  const older: BlogPost | null =
    idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category && p.category === post.category)
    .slice(0, 3);

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
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8"
      >
        <span>&larr;</span> 목록으로
      </Link>

      {/* Header */}
      <header className="mb-12">
        {post.category && (
          <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md mb-4">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold leading-snug tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-500">
          {formattedDate} &middot; {post.readTime}
        </p>
      </header>

      {/* Content */}
      {data.kind === "static" ? (
        <StaticPostContent blocks={data.staticBlocks} />
      ) : (
        <div className="prose max-w-none">
          {data.blocks.map((block) => (
            <NotionBlock key={block.id} block={block} />
          ))}
        </div>
      )}

      {/* ── Footer: category chip ───────────────────── */}
      {post.category && (
        <div className="mt-16 pt-8 border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
            카테고리
          </p>
          <Link
            href={`/?category=${encodeURIComponent(post.category)}`}
            className="inline-block px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            #{post.category}
          </Link>
        </div>
      )}

      {/* ── Footer: prev / next ─────────────────────── */}
      {(older || newer) && (
        <nav className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="group block p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 transition-colors"
            >
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                &larr; 이전 글
              </p>
              <p className="text-[14.5px] font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {older.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="group block p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 transition-colors text-right"
            >
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                다음 글 &rarr;
              </p>
              <p className="text-[14.5px] font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {newer.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}

      {/* ── Footer: related posts ───────────────────── */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-bold tracking-tight mb-5 pb-2.5 border-b-2 border-gray-100">
            관련 글
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
