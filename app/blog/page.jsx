async function getPosts() {
  const res = await fetch(
    "http://localhost:5000/api/posts/public",
    { cache: "no-store" }
  );
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold drop-shadow-md">Thoughts & Notes</h1>
          <p className="mt-3 text-lg opacity-90 max-w-2xl">I write about web development, design, and the occasional tutorial. Browse recent posts below.</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5"
            >
              <div className="h-40 w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400"> 
                <span className="text-sm">No Image</span>
              </div>

              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-sky-600 font-medium">Read more →</span>
                <span className="text-gray-400">{post.published ? "Published" : "Draft"}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
