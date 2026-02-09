// app/admin/blog/[id]/edit/page.jsx
import EditPostForm from "@/components/admin/EditPostForm";

export default async function EditPostPage({ params }) {
  const { id: postId } = await params;

  if (!postId) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Invalid route</h1>
        <p className="text-red-600">Missing post id in route parameters.</p>
      </div>
    );
  }

  try {
    const res = await fetch(`http://localhost:5000/api/posts/${encodeURIComponent(postId)}`, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText} ${body}`);
    }
    const post = await res.json();
    return <EditPostForm post={post} />;
  } catch (err) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Error</h1>
        <p className="text-red-600">{String(err.message)}</p>
      </div>
    );
  }
}
