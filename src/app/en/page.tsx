import { getCachedBlogPosts } from "../../lib/notion";
import PostListItem from "../../components/PostListItem";
import { profile } from "../../data/profile";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "Han Jiwoong",
  description:
    "Program / Project Manager who bridges strategy, operations, and SCM to turn complex problems into executable structures and scalable operating mechanisms.",
};

export default async function EnHome({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await getCachedBlogPosts();
  const p = profile.en;

  const filtered =
    category && category !== "전체" && category !== "All"
      ? posts.filter((post) => post.category === category)
      : posts;

  const isFiltered =
    !!category && category !== "전체" && category !== "All";

  return (
    <section className="max-w-[680px] px-8 pt-12 pb-20">
      {/* Intro — only when not filtering */}
      {!isFiltered && (
        <div className="mb-12">
          <p className="text-sm text-gray-400 mb-1">Hello, ✋</p>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
            I&apos;m {p.name}.
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            {p.tagline}
          </p>
          <Link
            href="/en/about"
            className="inline-block mt-4 text-sm text-blue-600 hover:underline"
          >
            Learn more &rarr;
          </Link>
        </div>
      )}

      {isFiltered && (
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-6">
          {category}
        </p>
      )}

      <div className="divide-y divide-gray-100">
        {filtered.map((post) => (
          <PostListItem key={post.id} post={post} locale="en" />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20 text-sm">
            No posts yet.
          </p>
        )}
      </div>
    </section>
  );
}
