async function getBlogs() {
  const res = await fetch("http://localhost:5000/api/posts/public", {
    next: { revalidate: 3600 },
  });

  const contentType = res.headers.get("content-type") || "";
  const clone = res.clone();

  if (!res.ok) {
    const bodyText = await clone.text().catch(() => "<body unavailable>");
    throw new Error(`Failed fetching posts: ${res.status} ${res.statusText} - ${bodyText}`);
  }

  if (contentType.includes("text/html")) {
    const bodyText = await clone.text().catch(() => "<body unavailable>");
    throw new Error(`Expected JSON but received HTML from API: ${bodyText.slice(0, 200)}`);
  }

  try {
    return await res.json();
  } catch (err) {
    const bodyText = await clone.text().catch(() => "<body unavailable>");
    throw new Error(`Invalid JSON response from API: ${err.message}. Response body: ${bodyText.slice(0,200)}`);
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <a
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="block border p-6 rounded hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
