async function getBlogs() {
  const res = await fetch("http://localhost:5000/api/blogs", {
    cache: "no-store",
  });
  return res.json();
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
