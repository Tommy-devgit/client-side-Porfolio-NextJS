import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0b0f1a] text-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300/80">
            Tomas Melesse
          </p>
          <p className="mt-4 text-sm text-slate-300">
            Building thoughtful web experiences with clean systems, purposeful UI,
            and reliable execution.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Connect</h3>
          <div className="mt-4 flex gap-3">
            <Link
              href="https://github.com/Tommy-devgit"
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-slate-200 hover:border-sky-400/60 hover:text-white transition"
              target="_blank"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.linkedin.com"
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-slate-200 hover:border-sky-400/60 hover:text-white transition"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href="mailto:hello@example.com"
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-slate-200 hover:border-sky-400/60 hover:text-white transition"
            >
              <FaEnvelope />
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Available for freelance & collaborations.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>© 2026 Tomas Melesse. All rights reserved.</span>
          <span>Designed & built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
