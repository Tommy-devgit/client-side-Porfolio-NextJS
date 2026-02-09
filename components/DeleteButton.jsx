"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ postId }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${API_BASE}/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to delete post");
      return;
    }

    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-500">
      Delete
    </button>
  );
}
