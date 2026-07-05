"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";

const TYPE_LABELS: Record<string, string> = {
  poem: "Poem",
  article: "Article",
  "photo-essay": "Photo Essay",
};

const NATURE_COLORS = [
  { bg: "#2D4A3E", accent: "#8A9A6A" },
  { bg: "#4A3D2A", accent: "#C4882A" },
  { bg: "#3A4A3A", accent: "#A8C4A0" },
  { bg: "#2A3D4A", accent: "#7AAABB" },
  { bg: "#3D2A3A", accent: "#B57CAA" },
  { bg: "#4A3A2A", accent: "#C4A47C" },
];

function PlaceholderCover({ title, index }: { title: string; index: number }) {
  const { bg, accent } = NATURE_COLORS[index % NATURE_COLORS.length];
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: bg }}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path d="M100 185C100 150 85 115 65 95C45 75 25 72 30 50C35 28 65 22 85 42C92 50 99 63 100 75C101 63 108 50 115 42C135 22 165 28 170 50C175 72 155 75 135 95C115 115 100 150 100 185Z" fill={accent} opacity="0.3"/>
      </svg>
      <span className="relative text-6xl font-light select-none" style={{ color: accent, fontFamily: "var(--font-cormorant)", fontStyle: "italic", opacity: 0.85 }}>
        {title.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export default function PostCard({ post, index }: { post: PostMeta; index: number }) {
  const typeLabel = TYPE_LABELS[post.type] ?? "Poem";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      className="post-card group"
    >
      <Link href={`/${post.slug}`} className="block h-full">
        {/* Image box */}
        <div className="overflow-hidden rounded-sm aspect-[4/3] relative">
          <div className="post-card-img w-full h-full">
            {post.coverImage ? (
              <Image src={post.coverImage} alt={post.title} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="object-cover" />
            ) : (
              <PlaceholderCover title={post.title} index={index} />
            )}
          </div>
          {/* Subtle dark overlay on hover */}
          <div className="absolute inset-0 bg-[var(--forest)] opacity-0 group-hover:opacity-[0.18] transition-opacity duration-500" />
        </div>

        {/* Meta */}
        <div className="mt-4 px-0.5">
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full type-badge-${post.type ?? "poem"}`} style={{ fontFamily: "var(--font-jost)" }}>
              {typeLabel}
            </span>
            {post.lang && <span className="text-[10px] text-[var(--muted)]" style={{ fontFamily: "var(--font-jost)" }}>{post.lang}</span>}
          </div>

          <h2
            className="leading-tight text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors duration-300 text-lg"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 400 }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mt-2 text-[var(--muted)] leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-jost)", fontSize: "0.78rem" }}>
              {post.excerpt}
            </p>
          )}

          {/* Animated underline */}
          <div className="mt-3 h-px w-0 group-hover:w-10 bg-[var(--gold)] transition-all duration-500 ease-out" />
        </div>
      </Link>
    </motion.article>
  );
}
