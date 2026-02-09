"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function generateSlug(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  function handleFileChange(file) {
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("slug", slug || generateSlug(title));
    fd.append("excerpt", excerpt);
    fd.append("content", content);
    fd.append("published", published ? "true" : "false");
    if (selectedFile) fd.append("image", selectedFile);

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      body: fd,
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/blog");
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to create post");
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              if (!slug) setSlug(generateSlug(title));
              if (!excerpt && content) setExcerpt(content.substring(0, 120) + "...");
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            rows={8}
            className="w-full border rounded p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
              disabled={loading}
            />
          </div>
          {previewUrl && (
            <div className="mt-3">
              <img src={previewUrl} alt={excerpt || title} className="w-full max-h-48 object-cover rounded" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published">Publish immediately</label>
        </div>

        <button
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Saving..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
