async function getPost(slug) {
  const res = await fetch(
    `http://localhost:5000/api/posts/public/${slug}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  try {
    const post = await getPost(slug);
    if (!post) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl">Post not found</h2>
        </div>
      );
    }

    const coverUrl = post.image?.url;

    return (
      <article className="min-h-screen bg-[#0b0f1a] text-slate-100">
        <header className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={post.image?.alt || post.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0b0f1a]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-16">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-sky-200/80 hover:text-sky-200 transition"
            >
              <span aria-hidden="true">←</span>
              Back to Blog
            </a>
            <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-[600] text-white">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.9)]">
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </div>

      </article>
    );
  } catch (err) {
    return (
      <div className="p-8 text-center text-red-400">
        <h2 className="text-xl">Error loading post</h2>
        <p>{String(err.message)}</p>
      </div>
    );
  }
}
