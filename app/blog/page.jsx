async function getBlogs() {
  const res = await fetch("http://localhost:5000/api/blog", {
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  const clone = res.clone();

  if (!res.ok) {
    const bodyText = await clone.text().catch(() => "<body unavailable>");
    throw new Error(`Failed fetching blog posts: ${res.status} ${res.statusText} - ${bodyText}`);
  }

  if (contentType.includes("text/html")) {
    const bodyText = await clone.text().catch(() => "<body unavailable>");
    throw new Error(`Expected JSON but received HTML from API: ${bodyText.slice(0,200)}`);
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
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {blogs.map((blog) => (
        <div key={blog.id} className="mb-6 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600 mt-2">
            {blog.content.slice(0, 120)}...
          </p>
        </div>
      ))}
    </section>
  );
}
