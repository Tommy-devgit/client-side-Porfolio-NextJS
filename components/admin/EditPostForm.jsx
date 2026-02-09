"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPostForm({ post }) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title || "");
  const [slug, setSlug] = useState(post.slug || "");
  const [excerpt, setExcerpt] = useState(post.excerpt || "");
  const [content, setContent] = useState(post.content || "");
  const [published, setPublished] = useState(Boolean(post.published));
  const [imageUrl, setImageUrl] = useState(post.image?.url || "");
  const [imagePublicId, setImagePublicId] = useState(post.image?.publicId || "");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(post.image?.url || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function generateSlug(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  function handleTitleBlur() {
    if (!slug && title) setSlug(generateSlug(title));
    if (!excerpt && content) setExcerpt(content.substring(0, 120) + "...");
  }

  function validate() {
    if (!title.trim()) return "Title is required";
    if (title.trim().length < 3) return "Title must be at least 3 characters";
    if (!content.trim()) return "Content is required";
    if (content.trim().length < 10) return "Content must be at least 10 characters";
    return "";
  }

  const handleSave = async () => {
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSaving(true);
    try {
      // Use multipart/form-data so we can upload a file directly to the posts route
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("slug", slug || generateSlug(title));
      fd.append("excerpt", excerpt.trim());
      fd.append("content", content.trim());
      fd.append("published", published ? "true" : "false");
      if (selectedFile) fd.append("image", selectedFile);

      const res = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Update failed");
      }

      router.push("/admin/blog");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  // file selection/preview for direct upload
  function handleFileChange(file) {
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Post title"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Published</label>
            <div className="flex items-center gap-3">
              <input
                id="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-sm text-gray-600">
                Visible on public blog
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <input
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary shown on lists"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            className="w-full min-h-[220px] rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content (Markdown supported)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
              disabled={uploading || saving}
            />
            {uploading && <span className="text-sm text-gray-500">Uploading…</span>}
          </div>
          {previewUrl && (
            <div className="mt-3">
              <img src={previewUrl} alt={excerpt || title} className="w-full max-h-48 object-cover rounded" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-4 py-2 rounded border text-sm text-gray-700 hover:bg-gray-50"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving && (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            )}
            <span>{saving ? "Saving..." : "Save changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
