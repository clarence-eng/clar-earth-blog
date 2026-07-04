"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Post, PostMeta } from "@/lib/posts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function PostPageClient({
  post,
  prev,
  next,
}: {
  post: Post;
  prev: PostMeta | null;
  next: PostMeta | null;
}) {
  return (
    <main className="pt-24 pb-24 px-8 max-w-2xl mx-auto w-full">
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        {/* Type badge */}
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] mb-6"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          {post.type ?? "poem"}
        </p>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-light leading-tight mb-3 text-[var(--charcoal)]"
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
        >
          {post.title}
        </h1>

        {/* Dedication / co-author */}
        {(post.dedication || post.coAuthor) && (
          <p
            className="text-[var(--muted)] text-sm italic mb-10 mt-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {post.dedication && <span>{post.dedication}</span>}
            {post.coAuthor && <span> · {post.coAuthor}</span>}
          </p>
        )}

        {/* Thin rule */}
        <div className="h-px w-12 bg-[var(--gold)] mb-12 mt-6 opacity-70" />

        {/* Poem body */}
        <div
          className="poem-body text-[var(--charcoal)]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {post.content
            .trim()
            .split(/\n\n+/)
            .map((stanza, i) => (
              <p key={i} className="mb-8 last:mb-0 whitespace-pre-line leading-[1.95]">
                {stanza}
              </p>
            ))}
        </div>

        {/* Bottom rule */}
        <div className="h-px w-12 bg-[var(--gold)] mt-16 mb-10 opacity-50 mx-auto" />

        {/* Prev / next navigation */}
        <nav className="flex justify-between items-start gap-8 text-[10.5px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-jost)" }}>
          {prev ? (
            <Link href={`/${prev.slug}`} className="text-[var(--muted)] hover:text-[var(--sage)] transition-colors">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/${next.slug}`} className="text-[var(--muted)] hover:text-[var(--sage)] transition-colors text-right">
              {next.title} →
            </Link>
          ) : <span />}
        </nav>

        {/* Back home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            ← All works
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
