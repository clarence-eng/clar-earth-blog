"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Post, PostMeta } from "@/lib/posts";
import AnimatedStanza from "./AnimatedStanza";
import ReadingProgress from "./ReadingProgress";

// Parse MDX content into stanzas with alignment/italic metadata
// Supports:
//   [right] marker at start of block = right-aligned stanza
//   [italic] marker = italic stanza
//   \t or em-spaces = preserved as-is (white-space: pre-wrap handles them)
function parseStanzas(content: string): { text: string; align: "left" | "right" | "center"; italic: boolean }[] {
  return content.trim().split(/\n\n+/).map(block => {
    let text = block;
    let align: "left" | "right" | "center" = "left";
    let italic = false;
    if (text.startsWith("[right]")) { align = "right"; text = text.slice(7).trimStart(); }
    else if (text.startsWith("[center]")) { align = "center"; text = text.slice(8).trimStart(); }
    if (text.startsWith("[italic]")) { italic = true; text = text.slice(8).trimStart(); }
    return { text, align, italic };
  });
}
import BackPill from "./BackPill";

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
  readTime,
}: {
  post: Post;
  prev: PostMeta | null;
  next: PostMeta | null;
  readTime: string;
}) {
  const { bg, accent } = hashColor(post.slug);
  const router = useRouter();

  // Keyboard navigation ← →
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" && next) router.push(`/${next.slug}`);
      if (e.key === "ArrowLeft" && prev) router.push(`/${prev.slug}`);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, router]);

  return (
    <>
      <ReadingProgress />
      <BackPill />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div
        className="relative w-full flex items-end overflow-hidden"
        style={{ background: bg, minHeight: "clamp(340px, 60vh, 520px)" }}
      >
        {/* Cover photo — clearly visible */}
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.55, mixBlendMode: "luminosity" }}
          />
        )}

        {/* Gradient — light top, heavy only at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${bg}22 0%, ${bg}44 50%, ${bg}DD 85%, ${bg} 100%)`,
          }}
        />

        {/* Organic bottom curve */}
        <div
          className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
          style={{ background: "var(--cream)", clipPath: "ellipse(65% 100% at 50% 100%)" }}
        />

        {/* Title block */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 pb-14 pt-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span
              className="inline-block text-[9px] tracking-[0.35em] uppercase px-2.5 py-1 rounded-full"
              style={{ fontFamily: "var(--font-jost)", background: `${accent}44`, color: accent }}
            >
              {TYPE_LABELS[post.type ?? "poem"] ?? "Poem"}
            </span>
            <span
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-jost)", color: "rgba(255,255,255,0.38)" }}
            >
              {readTime}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-balance leading-[1.1] text-white mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
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
              style={{ fontFamily: "var(--font-cormorant)", color: `${accent}DD` }}
            >
              {post.dedication}{post.coAuthor ? ` · ${post.coAuthor}` : ""}
            </motion.p>
          )}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <main className="px-8 pb-28 w-full" style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* Gold rule — animates in */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-[var(--gold)] mb-12 mt-2 opacity-80"
        />

        {/* Poem */}
        <div className="poem-content">
          {parseStanzas(post.content).map((stanza, i) => (
            <AnimatedStanza key={i} index={i} align={stanza.align} italic={stanza.italic}>
              {stanza.text}
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

        {/* Keyboard hint — desktop only */}
        {(prev || next) && (
          <p className="text-center text-[9px] tracking-[0.25em] uppercase text-[var(--muted-light)] mb-6 hidden md:block" style={{ fontFamily: "var(--font-jost)" }}>
            ← → keys to navigate
          </p>
        )}

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
