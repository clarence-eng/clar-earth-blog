"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";

const TYPE_LABELS: Record<string, string> = {
  poem: "Poem",
  article: "Article",
  "photo-essay": "Photo Essay",
};

const NATURE_COLORS = [
  { bg: "#2D4A3E", accent: "#8A9A6A" }, // forest + sage
  { bg: "#4A3D2A", accent: "#C4882A" }, // bark + amber
  { bg: "#3A4A3A", accent: "#A8C4A0" }, // moss + pale green
  { bg: "#2A3D4A", accent: "#7AAABB" }, // deep water + teal
  { bg: "#3D2A3A", accent: "#B57CAA" }, // dusk + lilac
  { bg: "#4A3A2A", accent: "#C4A47C" }, // earth + sand
];

function PlaceholderCover({ title, index }: { title: string; index: number }) {
  const { bg, accent } = NATURE_COLORS[index % NATURE_COLORS.length];
  const initial = title.charAt(0).toUpperCase();

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: bg }}
    >
      {/* Subtle botanical texture overlay */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full opacity-10"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M100 180 C100 150 90 120 75 100 C60 80 45 70 50 50 C55 30 80 25 95 40 C100 45 100 55 100 65 C100 55 100 45 105 40 C120 25 145 30 150 50 C155 70 140 80 125 100 C110 120 100 150 100 180Z"
          fill={accent}
          opacity="0.4"
        />
        <path
          d="M100 10 C100 30 92 50 82 60 C72 70 60 68 55 60 C50 52 55 42 65 40 C72 38 80 42 100 10Z"
          fill={accent}
          opacity="0.25"
        />
      </svg>
      <span
        className="relative text-5xl font-light select-none"
        style={{ color: accent, fontFamily: "var(--font-cormorant)", opacity: 0.9 }}
      >
        {initial}
      </span>
    </div>
  );
}

export default function PostCard({
  post,
  index,
  featured = false,
}: {
  post: PostMeta;
  index: number;
  featured?: boolean;
}) {
  const typeLabel = TYPE_LABELS[post.type] ?? "Poem";
  const typeBadgeClass = `type-badge-${post.type ?? "poem"}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      className="post-card group"
    >
      <Link href={`/${post.slug}`} className="block h-full">
        <div
          className={`overflow-hidden rounded-sm ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}
          style={{ background: "var(--cream-dark)" }}
        >
          <div className="post-card-img w-full h-full">
            <PlaceholderCover title={post.title} index={index} />
          </div>
        </div>

        <div className="mt-4 px-0.5">
          {/* Type + lang */}
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className={`text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full ${typeBadgeClass}`}
              style={{ fontFamily: "var(--font-jost)" }}
            >
              {typeLabel}
            </span>
            {post.lang && (
              <span
                className="text-[10px] text-[var(--muted)]"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {post.lang}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={`leading-tight text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors duration-300 ${featured ? "text-xl md:text-2xl" : "text-lg"}`}
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 400 }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="mt-2 text-[var(--muted)] leading-relaxed line-clamp-2"
              style={{ fontFamily: "var(--font-jost)", fontSize: "0.8rem" }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Gold underline reveal on hover */}
          <div className="mt-3 h-px w-0 group-hover:w-8 bg-[var(--gold)] transition-all duration-500 ease-out" />
        </div>
      </Link>
    </motion.article>
  );
}
