import Link from "next/link";
import type { BlogPost } from "../lib/notion";

const categoryColors: Record<string, string> = {
  개발: "bg-blue-50 text-blue-600",
  생각: "bg-purple-50 text-purple-600",
  커리어: "bg-amber-50 text-amber-600",
  디자인: "bg-pink-50 text-pink-600",
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const colorClass = categoryColors[post.category] || "bg-gray-50 text-gray-600";

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white border border-gray-100 rounded-xl p-7 transition-all duration-200 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5"
    >
      <span
        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md mb-3.5 ${colorClass}`}
      >
        {post.category}
      </span>

      <h3 className="text-[17px] font-semibold leading-relaxed mb-2.5 tracking-tight group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {post.description}
      </p>

      <div className="mt-4 flex items-center gap-3 text-[13px] text-gray-400">
        <span>{formattedDate}</span>
        <span>&middot;</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
