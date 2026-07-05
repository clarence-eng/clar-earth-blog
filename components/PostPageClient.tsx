"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Post, PostMeta } from "@/lib/posts";
import AnimatedStanza from "./AnimatedStanza";
import ReadingProgress from "./ReadingProgress";

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
      <ReadingProgress />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div
        className="relative w-full flex items-end overflow-hidden"
        style={{ background: bg, minHeight: "55vh" }}
      >
        {/* Cover photo */}
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.22, mixBlendMode: "luminosity" }}
          />
        )}

        {/* Colour overlay gradient — bottom fade to solid bg colour */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${bg}55 0%, ${bg}CC 60%, ${bg} 100%)`,
          }}
        />

        {/* Botanical SVG */}
        <svg
          viewBox="0 0 400 500"
          className="absolute right-0 top-0 h-full w-auto pointer-events-none select-none"
          preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
          style={{ opacity: 0.1 }}
        >
          <path d="M200 480 C200 390 160 290 110 240 C60 190 20 180 35 130 C50 80 110 70 160 105 C182 120 196 148 200 175 C204 148 218 120 240 105 C290 70 350 80 365 130 C380 180 340 190 290 240 C240 290 200 390 200 480Z" fill={accent} />
          <path d="M200 25 C200 70 175 115 145 138 C115 160 82 152 70 135 C58 118 72 95 96 90 C114 86 138 96 200 25Z" fill={accent} />
          <path d="M200 25 C200 70 225 115 255 138 C285 160 318 152 330 135 C342 118 328 95 304 90 C286 86 262 96 200 25Z" fill={accent} />
          <circle cx="200" cy="22" r="7" fill={accent} />
          {/* Small side branches */}
          <path d="M155 220 C130 210 105 215 90 205" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round"/>
          <path d="M245 220 C270 210 295 215 310 205" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round"/>
          <path d="M135 310 C110 298 88 302 75 290" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round"/>
          <path d="M265 310 C290 298 312 302 325 290" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round"/>
        </svg>

        {/* Organic bottom curve */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "var(--cream)", clipPath: "ellipse(65% 100% at 50% 100%)" }}
        />

        {/* Title block */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 pb-16 pt-28">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[9px] tracking-[0.35em] uppercase px-2.5 py-1 rounded-full mb-5"
            style={{ fontFamily: "var(--font-jost)", background: `${accent}33`, color: accent }}
          >
            {TYPE_LABELS[post.type ?? "poem"] ?? "Poem"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="leading-[1.1] text-white/92 mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            }}
          >
            {post.title}
          </motion.h1>

          {(post.dedication || post.coAuthor) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-sm italic"
              style={{ fontFamily: "var(--font-cormorant)", color: `${accent}CC` }}
            >
              {post.dedication}{post.coAuthor ? ` · ${post.coAuthor}` : ""}
            </motion.p>
          )}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <main className="px-8 pb-28 max-w-2xl mx-auto w-full">
        {/* Gold rule */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-[var(--gold)] mb-14 mt-2 opacity-80"
        />

        {/* Poem content */}
        <div
          className="text-[var(--ink)]"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)", lineHeight: 2 }}
        >
          {stanzas.map((stanza, i) => (
            <AnimatedStanza key={i} index={i} isFirst={i === 0}>
              {stanza}
            </AnimatedStanza>
          ))}
        </div>

        {/* Leaf divider */}
        <div className="flex items-center gap-5 mt-20 mb-14">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <svg viewBox="0 0 24 30" width="14" height="18" fill="none" aria-hidden="true">
            <path d="M12 28 C12 22 9 16 6 13 C3 10 0 9 1.5 6 C3 3 7.5 2 10.5 4.5 C11 5 12 7 12 9 C12 7 13 5 13.5 4.5 C16.5 2 21 3 22.5 6 C24 9 21 10 18 13 C15 16 12 22 12 28Z" fill="var(--sage)" opacity="0.55"/>
          </svg>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        {/* Prev / Next */}
        <nav className="grid grid-cols-2 gap-4" style={{ fontFamily: "var(--font-jost)" }}>
          {prev ? (
            <Link href={`/${prev.slug}`} className="group flex flex-col gap-1 p-4 border border-[var(--border)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--muted-light)]">← Previous</span>
              <span className="text-sm text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1rem" }}>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/${next.slug}`} className="group flex flex-col gap-1 p-4 border border-[var(--border)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all text-right">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--muted-light)]">Next →</span>
              <span className="text-sm text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1rem" }}>{next.title}</span>
            </Link>
          ) : <div />}
        </nav>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors" style={{ fontFamily: "var(--font-jost)" }}>
            ← All works
          </Link>
        </div>
      </main>
    </>
  );
}
