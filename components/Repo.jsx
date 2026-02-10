"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const PAGE_SIZE = 6;

export default function Repo({ repos = [] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(repos.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return repos.slice(start, start + PAGE_SIZE);
  }, [page, repos]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-1 justify-between items-center">
        <h2 className="text-3xl font-bold">Featured Repositories</h2>
        <Link href="https://github.com/Tommy-devgit">
          <FaGithub className="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500" />
        </Link>
      </div>

      {pageItems.length === 0 ? (
        <div className="mt-8 p-6 border border-accent rounded-lg text-gray-300">
          No repositories to display.
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((repo) => (
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
      )}

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-full border border-accent px-4 py-2 text-sm text-accent disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm text-gray-400">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="rounded-full border border-accent px-4 py-2 text-sm text-accent disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
