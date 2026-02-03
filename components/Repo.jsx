// components/Repo.jsx
import Link from "next/link";

export default function Repo({ repos }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Repository's</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos?.map((repo) => (
          <div
            key={repo.id}
            className="p-6 bg-primary border border-accent rounded-lg hover:bg-gray-700 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
            <p className="text-gray-300 mb-4">
              {repo.description || "No description provided."}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{repo.language}</span>
              <Link
                href={repo.html_url}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                View Repo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
