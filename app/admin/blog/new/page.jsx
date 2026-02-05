"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    published: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = form.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slug }),
    });

    router.push("/admin/blog");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="excerpt"
          placeholder="Short excerpt"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Blog content"
          rows={10}
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            onChange={handleChange}
          />
          Publish immediately
        </label>

        <button className="bg-black text-white px-6 py-3 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
}
