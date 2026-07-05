"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Post, PostMeta } from "@/lib/posts";

const NATURE_COLORS = [
  { bg: "#2D4A3E", accent: "#8A9A6A" },
  { bg: "#4A3D2A", accent: "#C4882A" },
  { bg: "#3A4A3A", accent: "#A8C4A0" },
  { bg: "#2A3D4A", accent: "#7AAABB" },
  { bg: "#3D2A3A", accent: "#B57CAA" },
  { bg: "#4A3A2A", accent: "#C4A47C" },
];

function hashColor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return NATURE_COLORS[Math.abs(h) % NATURE_COLORS.length];
}

const TYPE_LABELS: Record<string, string> = {
  poem: "Poem",
  article: "Article",
  "photo-essay": "Photo Essay",
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
  const { bg, accent } = hashColor(post.slug);
  const stanzas = post.content.trim().split(/\n\n+/);

  return (
    <>
      {/* Hero cover */}
      <div
        className="relative w-full flex items-end overflow-hidden"
        style={{ background: bg, minHeight: "45vh" }}
      >
        {/* Real cover image with colour overlay */}
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        )}
        {/* Botanical SVG texture */}
        <svg
          viewBox="0 0 400 400"
          className="absolute right-0 top-0 bottom-0 h-full w-auto opacity-[0.08]"
          preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
        >
          <path
            d="M200 380 C200 310 170 240 130 200 C90 160 50 150 60 110 C70 70 120 60 160 90 C180 105 195 130 200 160 C205 130 220 105 240 90 C280 60 330 70 340 110 C350 150 310 160 270 200 C230 240 200 310 200 380Z"
            fill={accent} opacity="0.6"
          />
          <path
            d="M200 20 C200 60 180 100 155 120 C130 140 105 135 95 120 C85 105 95 85 115 80 C130 76 150 85 200 20Z"
            fill={accent} opacity="0.4"
          />
          <path
            d="M200 20 C200 60 220 100 245 120 C270 140 295 135 305 120 C315 105 305 85 285 80 C270 76 250 85 200 20Z"
            fill={accent} opacity="0.4"
          />
          <circle cx="200" cy="20" r="5" fill={accent} opacity="0.6" />
        </svg>

        {/* Organic bottom curve */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background: "var(--cream)",
            clipPath: "ellipse(60% 100% at 50% 100%)",
          }}
        />

        {/* Text content over hero */}
        <div className="relative z-10 px-8 pb-14 pt-28 max-w-3xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[9px] tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "var(--font-jost)", color: accent, opacity: 0.9 }}
          >
            {TYPE_LABELS[post.type ?? "poem"] ?? "Poem"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white/90 leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            {post.title}
          </motion.h1>

          {(post.dedication || post.coAuthor) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 italic text-sm"
              style={{ fontFamily: "var(--font-cormorant)", color: "rgba(255,255,255,0.5)" }}
            >
              {post.dedication}{post.coAuthor ? ` · ${post.coAuthor}` : ""}
            </motion.p>
          )}
        </div>
      </div>

      {/* Poem body */}
      <main className="px-8 pb-24 max-w-3xl mx-auto w-full">
        {/* Gold accent rule */}
        <div className="h-px w-10 bg-[var(--gold)] mb-14 opacity-70" />

        <div className="poem-body text-[var(--ink)]">
          {stanzas.map((stanza, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: "easeOut" }}
              className="mb-8 last:mb-0 whitespace-pre-line leading-[2]"
            >
              {stanza}
            </motion.p>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="flex items-center gap-4 mt-16 mb-12">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <svg viewBox="0 0 16 20" width="10" height="12" fill="none" aria-hidden="true">
            <path
              d="M8 19 C8 15 6 11 4 9 C2 7 0 6 1 4 C2 2 5 1.5 7 3 C7.5 3.5 8 4.5 8 5.5 C8 4.5 8.5 3.5 9 3 C11 1.5 14 2 15 4 C16 6 14 7 12 9 C10 11 8 15 8 19Z"
              fill="var(--sage)"
              opacity="0.6"
            />
          </svg>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        {/* Prev / next */}
        <nav
          className="flex justify-between items-start gap-8 text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          {prev ? (
            <Link
              href={`/${prev.slug}`}
              className="text-[var(--muted)] hover:text-[var(--forest)] transition-colors group"
            >
              <span className="group-hover:-translate-x-1 inline-block transition-transform">←</span>{" "}
              {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link
              href={`/${next.slug}`}
              className="text-[var(--muted)] hover:text-[var(--forest)] transition-colors text-right group"
            >
              {next.title}{" "}
              <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>
          ) : <span />}
        </nav>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors"
            style={{ fontFamily: "var(--font-jost)" }}
          >
            ← All works
          </Link>
        </div>
      </main>
    </>
  );
}
