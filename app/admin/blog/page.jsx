export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function getPosts() {
  try {
    const res = await fetch(`${API_BASE}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch posts:", res.status, res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

import DeleteButton from "../../../components/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <a
          href="/admin/blog/new"
          className="px-4 py-2 bg-black text-white rounded border borde-2"
        >
          New Post
        </a>
      </div>

      {posts.length === 0 ? (
        <div className="border rounded p-6 text-center text-gray-500">
          No posts found.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border rounded p-4 flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                  {post.published ? "Published" : "Draft"}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <a href={`/admin/blog/${post._id}/edit`} className="text-sm underline">Edit</a>

                <DeleteButton postId={post._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
