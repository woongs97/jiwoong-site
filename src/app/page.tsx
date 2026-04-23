import { getBlogPosts, getThoughts } from "../lib/notion";
import BlogCard from "../components/BlogCard";
import ThoughtItem from "../components/ThoughtItem";
import Link from "next/link";

export const revalidate = 60; // ISR: 60초마다 재생성

export default async function Home() {
  const [posts, thoughts] = await Promise.all([
    getBlogPosts(),
    getThoughts(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="max-w-[1080px] mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">
          Hello, I&apos;m
        </p>
        <h1 className="text-4xl md:text-[42px] font-bold leading-snug tracking-tight mb-4">
          생각을 기록하고,
          <br />
          만든 것을{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            공유합니다
          </span>
        </h1>
        <p className="text-[17px] text-gray-500 max-w-xl leading-relaxed">
          개발, 디자인, 그리고 그 사이의 생각들을 정리하는 공간입니다. 배운 것,
          만든 것, 느낀 것을 기록합니다.
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          {["Development", "Product", "Thoughts", "Career"].map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-[13px] text-gray-500 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-[1080px] mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">최근 글</h2>
          <Link
            href="/blog"
            className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            전체 보기 <span>&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Thoughts */}
      <section className="max-w-[1080px] mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">생각 정리</h2>
          <Link
            href="/blog"
            className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            전체 보기 <span>&rarr;</span>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {thoughts.slice(0, 3).map((item) => (
            <ThoughtItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
