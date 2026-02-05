async function getPost(slug) {
  const res = await fetch(
    `http://localhost:5000/api/posts/public?slug=${slug}`,
    { cache: "no-store" }
  );
  const posts = await res.json();
  return posts[0];
}

export default async function BlogDetails({ params }) {
  const post = await getPost(params.slug);

  if (!post) return <p>Post not found</p>;

  return (
    <article className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose">{post.content}</div>
    </article>
  );
}
