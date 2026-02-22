export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const metadata = {
  title: "Blog",
};

async function getPosts() {
  try {
    const res = await fetch(
      `${API_BASE}/api/posts/public`,
      { cache: "no-store" }
    );
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

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className="min-h-screen bg-[#0b0f1a] text-slate-100">
      <div className="relative overflow-hidden m-4">
        <div className="pointer-events-none absolute -top-40 -right-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <header className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">Journal</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-[600] leading-tight text-white">
            Thoughts & Notes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Essays on web craft, design, and the odd tutorial. Fresh ideas, sharp edges, and practical takeaways.
          </p>
        </header>
      </div>

      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-10 text-center text-slate-300">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-50px_rgba(14,165,233,0.45)]"
              >
                <div className="relative h-48">
                  {post.image?.url ? (
                    <img
                      src={post.image.url}
                      alt={post.image?.alt || post.title}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-500 text-sm">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <h2 className="mt-3 text-xl font-[600] text-white group-hover:text-sky-200 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-300 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                    <span className="font-medium text-sky-300">Read more &rarr;</span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs">
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 ring-1 ring-white/5 transition duration-300 group-hover:ring-sky-400/40" />
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
