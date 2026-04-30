import { getCachedBlogPosts } from "../lib/notion";
import { profile } from "../data/profile";
import SidebarClient from "./SidebarClient";

export default async function Sidebar() {
  const posts = await getCachedBlogPosts();

  const categoryMap = new Map<string, number>();
  posts.forEach((post) => {
    if (post.category) {
      categoryMap.set(
        post.category,
        (categoryMap.get(post.category) ?? 0) + 1
      );
    }
  });

  const categories = [
    { name: "전체", count: posts.length },
    ...Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    })),
  ];

  return (
    <aside className="hidden md:flex w-[260px] flex-shrink-0 flex-col sticky top-0 h-screen border-r border-gray-100 bg-[#FAFAFA] overflow-y-auto">
      <div className="flex flex-col h-full px-5 py-8">
        <SidebarClient
          categories={categories}
          profileKo={profile.ko}
          profileEn={profile.en}
        />
      </div>
    </aside>
  );
}
