"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";

const projects = [
  {
    title: "Phone Plaza",
    description:
      "E-commerce platform for buying and selling smartphones with user reviews and ratings.",
    image: "/assets/work/projectImg1.png",
    github: "https://github.com/Tommy-devgit",
    demo: "https://phone-plazaa.vercel.app/",
    tags: ["React.js", "Node.js", "Firebase", "Cloudinary"],
  },
  {
    title: "Blogger",
    description:
      "A full-stack blogging platform with rich text editing, image uploads, and SEO-friendly URLs.",
    image: "/assets/work/projectImg2.png",
    github: "https://github.com/Tommy-devgit",
    demo: "https://blog-app-react-umber.vercel.app/",
    tags: ["React.js", "Tailwind", "Supabase", "Cloudinary"],
  },
  {
    title: "Cinetrack",
    description:
      "Movie discovery app with real-time search, personalized watchlists, and seamless streaming integration.",
    image: "/assets/work/projectImg3.png",
    github: "https://github.com/Tommy-devgit",
    demo: "https://client-side-porfolio-next-js.vercel.app/work",
    tags: ["React", "TMDB API", "Tailwind", "FIrebase"],
  },
  {
    title: "Hospital Management System",
    description:
      "A comprehensive hospital management system with patient records, appointment scheduling, and billing features.",
    image: "/assets/work/thumb4.png",
    github: "https://github.com/Tommy-devgit",
    demo: "https://client-side-porfolio-next-js.vercel.app/admin/blog",
    tags: ["Next.js", "Node.js", "MongoDB", "..."],
  },
  {
    title: "Blanime",
    description:
      "An anime streaming platform with a vast library, user reviews, and personalized recommendations.",
    image: "/assets/work/thumb5.png",
    github: "https://github.com/Tommy-devgit",
    demo: "https://client-side-porfolio-next-js.vercel.app/services",
    tags: ["Next.js", "Tailwind", "MongoDB", "..."],
  },
  {
    title: "Project Showcase",
    description:
      "A grid-based project showcase with pagination and performance-first image loading.",
    image: "/assets/work/thumb6.png",
    github: "https://github.com/Tommy-devgit",
    demo: "https://client-side-porfolio-next-js.vercel.app/work",
    tags: ["UI Systems", "Grid", "Performance"],
  },
];

const PAGE_SIZE = 4;

export default function WorkPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return projects.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <section className="min-h-screen bg-[#0b0f1a] text-slate-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">Work</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            Projects That Ship
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Selected builds across product, platform, and UI systems. Each card includes
            a quick snapshot, GitHub access, and a live demo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pageItems.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-[0_24px_70px_-50px_rgba(14,165,233,0.5)]"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                  <p className="mt-2 text-sm text-slate-300">{project.description}</p>
                </div>

                <ul className="flex flex-wrap gap-2 text-xs text-slate-300">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  <Link
                    href={project.demo}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-sky-200 hover:border-sky-400/60 hover:text-white transition"
                    target="_blank"
                  >
                    Live Demo <BsArrowUpRight />
                  </Link>
                  <Link
                    href={project.github}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-white/40 hover:text-white transition"
                    target="_blank"
                  >
                    GitHub <BsGithub />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-slate-400">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
