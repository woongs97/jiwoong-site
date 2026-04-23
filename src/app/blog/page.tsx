import { getBlogPosts } from "../../lib/notion";
import BlogCard from "../../components/BlogCard";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="max-w-[1080px] mx-auto px-6 pt-16 pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">
        개발, 생각, 커리어에 대한 글들을 모아놓았습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-400 py-20">
          아직 작성된 글이 없습니다.
        </p>
      )}
    </section>
  );
}
