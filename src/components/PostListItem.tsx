import Link from "next/link";
import type { BlogPost } from "../lib/notion";

export default function PostListItem({
  post,
  locale = "ko",
}: {
  post: BlogPost;
  locale?: "ko" | "en";
}) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString(
        locale === "en" ? "en-US" : "ko-KR",
        { month: "long", day: "numeric" }
      )
    : "";

  // 글 상세는 KO 라우트로 통일 (글 자체가 한국어 콘텐츠)
  const href = `/blog/${post.slug}`;

  return (
    <Link
      href={href}
      className="flex items-center justify-between py-3.5 px-2 -mx-2 rounded-lg hover:bg-gray-50 group transition-colors"
    >
      <span className="text-[15px] text-gray-800 group-hover:text-blue-600 transition-colors leading-relaxed">
        {post.title}
      </span>
      <span className="text-sm text-gray-400 ml-6 flex-shrink-0">
        {formattedDate}
      </span>
    </Link>
  );
}
