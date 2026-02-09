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

    return (
      <article className="max-w-4xl mx-auto">
        <header className="relative bg-gradient-to-r from-indigo-700 to-sky-600 text-white rounded-b-3xl pt-24 pb-16 px-6">
          <div className="absolute inset-0 opacity-20 bg-[url('/assets/work/hero-placeholder.jpg')] bg-cover bg-center rounded-b-3xl" />
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold drop-shadow-lg">{post.title}</h1>
            <p className="mt-3 text-sm opacity-90">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </header>

        <div className="prose max-w-4xl mx-auto p-8 bg-black/20 rounded-lg shadow">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    );
  } catch (err) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-xl">Error loading post</h2>
        <p>{String(err.message)}</p>
      </div>
    );
  }
}
