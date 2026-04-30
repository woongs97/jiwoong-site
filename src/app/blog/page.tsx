import { getBlogPosts } from "../../lib/notion";
import PostListItem from "../../components/PostListItem";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="max-w-[680px] px-8 pt-12 pb-20">
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
          <p className="text-center text-gray-400 py-20 text-sm">
            아직 작성된 글이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}
