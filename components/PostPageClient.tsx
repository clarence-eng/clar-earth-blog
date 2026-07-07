"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Post, PostMeta } from "@/lib/posts";
import AnimatedStanza from "./AnimatedStanza";
import ReadingProgress from "./ReadingProgress";
import RelatedPoems from "./RelatedPoems";
import FocusModeToggle from "./FocusModeToggle";
import PrintButton from "./PrintButton";
import BackPill from "./BackPill";
import MoodTag from "./MoodTag";

// Parse MDX content into stanzas with alignment/italic metadata
//   \t or em-spaces = preserved as-is (white-space: pre-wrap handles them)
function parseStanzas(content: string): { text: string; align: "left" | "right" | "center"; italic: boolean; lang?: string }[] {
  return content.trim().split(/\n\n+/).map(block => {
    let text = block;
    let align: "left" | "right" | "center" = "left";
    let italic = false;
    let lang: string | undefined;
    if (text.startsWith("[right]")) { align = "right"; text = text.slice(7).trimStart(); }
    else if (text.startsWith("[center]")) { align = "center"; text = text.slice(8).trimStart(); }
    if (text.startsWith("[italic]")) { italic = true; text = text.slice(8).trimStart(); }
    const langMatch = text.match(/^\[lang:([a-z]{2}(?:-[a-zA-Z]+)?)\]/);
    if (langMatch) { lang = langMatch[1]; text = text.slice(langMatch[0].length).trimStart(); }
    return { text, align, italic, lang };
  }).filter(s => s.text.trim().length > 0);
}

// Single consistent dark overlay colour for all poems — forest green.
// The cover photo shows through via luminosity blend; no random per-poem colour.
const HERO_BG = "#1E2E28"; // deep forest — dark enough for legibility, green-tinted

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
  allPosts = [],
}: {
  post: Post;
  prev: PostMeta | null;
  next: PostMeta | null;
  readTime: string;
  allPosts?: PostMeta[];
}) {
  const router = useRouter();

  // Keyboard navigation ← →
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // Don't navigate when the search modal is open
      if (document.querySelector("[role=dialog]")) return;
      if (e.key === "ArrowRight" && next) router.push(`/${next.slug}`);
      if (e.key === "ArrowLeft" && prev) router.push(`/${prev.slug}`);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, router]);

  // Track whether user has scrolled past the dark hero into the cream body
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const handler = () => setPastHero(window.scrollY > 380);
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // evaluate initial position
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <ReadingProgress />
      <BackPill />

      {/* ── Back arrow — fixed top-left, always visible on poem pages ── */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="poem-back-arrow fixed top-[4.5rem] left-4 md:left-6 z-40"
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Back to all works">
          <span className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-500 ${
            pastHero
              ? "border-[var(--border)] bg-[var(--cream)] shadow-sm group-hover:bg-[var(--cream-dark)] group-hover:border-[var(--sage)]"
              : "border-white/25 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white/50"
          }`}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="group-hover:-translate-x-0.5 transition-transform duration-300">
              <path d="M8.5 1.5L3.5 6.5L8.5 11.5" stroke={pastHero ? "var(--forest)" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span
            className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 ${pastHero ? "text-[var(--muted)]" : "text-white/70"}`}
            style={{ fontFamily: "var(--font-jost)" }}
          >
            All works
          </span>
        </Link>
      </motion.div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      {/* Consistent dark forest overlay on ALL poems — no random per-slug colour */}
      <div
        className="poem-hero relative w-full overflow-hidden"
        style={{ background: HERO_BG, minHeight: "clamp(320px, 55vh, 480px)" }}
      >
        {/* Cover photo — luminosity blend so it shows through naturally */}
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover poem-cover-parallax"
            style={{ opacity: 0.5, mixBlendMode: "luminosity" }}
          />
        )}

        {/* Gradient — transparent at top, solid at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${HERO_BG}11 0%, ${HERO_BG}55 45%, ${HERO_BG}CC 75%, ${HERO_BG} 100%)`,
          }}
        />

        {/* Organic bottom curve */}
        <div
          className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
          style={{ background: "var(--cream)", clipPath: "ellipse(65% 100% at 50% 100%)" }}
        />

        {/* Title block — vertically centred with generous padding top and bottom */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 flex flex-col justify-center"
          style={{ minHeight: "clamp(320px, 55vh, 480px)", paddingTop: "5.5rem", paddingBottom: "5rem" }}>

          {/* Type badge + nature reading time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span
              className="inline-block text-[9px] tracking-[0.35em] uppercase px-2.5 py-1 rounded-full bg-white/15 text-white/70"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              {TYPE_LABELS[post.type ?? "poem"] ?? "Poem"}
            </span>
            <span
              className="text-white/40 italic"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}
            >
              {readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-balance text-white mb-3 poem-page-title"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </motion.h1>

          {/* Dedication / co-author + mood tag */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {(post.dedication || post.coAuthor) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-white/55 italic"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
              >
                {post.dedication && post.coAuthor
                  ? `${post.dedication} · ${post.coAuthor}`
                  : post.dedication ?? post.coAuthor}
              </motion.p>
            )}
            {post.mood && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
                <MoodTag mood={post.mood} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body — data-mood drives cursor colour ────────────── */}
      <main id="main-content" className="px-8 pb-28 w-full" style={{ maxWidth: "780px", margin: "0 auto" }} data-mood={Array.isArray(post.mood) ? post.mood[0] : post.mood}>
        {/* Gold rule */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-[var(--gold)] mb-12 mt-2 opacity-80"
        />

        {/* Poem — lang attribute from post.lang (e.g. "中文" → "zh") when the whole poem is non-English */}
        <div className="poem-content" lang={post.lang === "中文" ? "zh" : undefined}>
          {(() => {
            const stanzas = parseStanzas(post.content);

            // Find the first stanza eligible for the drop cap.
            // Falls back to index 0 if none match.
            let firstDropIdx = stanzas.findIndex(s =>
              !s.italic && s.align === "left" && !s.lang && !s.text.trimStart().startsWith("*")
            );
            if (firstDropIdx === -1) firstDropIdx = 0;

            // Two-column mirror layout ONLY when left and right stanza counts match
            // (e.g. The Glass Between Us: 2 left + 2 right = true mirror).
            // Unequal counts (e.g. Blank Space: 3 left + 5 right) render sequentially.
            const leftStanzas = stanzas.filter(s => s.align === "left");
            const rightStanzas = stanzas.filter(s => s.align === "right");
            const isMirror = rightStanzas.length > 0 && leftStanzas.length === rightStanzas.length && (leftStanzas.length + rightStanzas.length === stanzas.length);

            if (isMirror) {
              return (
                <div className="poem-two-col">
                  <div className="poem-two-col__left">
                    {leftStanzas.map((s, i) => (
                      <AnimatedStanza
                        key={i}
                        index={i}
                        align="left"
                        italic={s.italic}
                        lang={s.lang}
                        isFirstDrop={stanzas.indexOf(s) === firstDropIdx}
                      >
                        {s.text}
                      </AnimatedStanza>
                    ))}
                  </div>
                  <div className="poem-two-col__right">
                    {rightStanzas.map((s, i) => (
                      <AnimatedStanza
                        key={i}
                        index={leftStanzas.length + i}
                        align="right"
                        italic={s.italic}
                        lang={s.lang}
                      >
                        {s.text}
                      </AnimatedStanza>
                    ))}
                  </div>
                </div>
              );
            }

            // Default: render stanzas one by one
            return stanzas.map((s, i) => (
              <AnimatedStanza
                key={i}
                index={i}
                align={s.align}
                italic={s.italic}
                lang={s.lang}
                isFirstDrop={i === firstDropIdx}
              >
                {s.text}
              </AnimatedStanza>
            ));
          })()}
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
          <p className="text-center text-[9px] tracking-[0.25em] uppercase text-[var(--muted-light)] mb-6 hidden md:block keyboard-hint" style={{ fontFamily: "var(--font-jost)" }}>
            ← → keys to navigate
          </p>
        )}

        {/* Prev / Next */}
        <nav aria-label="Poem navigation" className="grid grid-cols-2 gap-4 poem-prev-next" style={{ fontFamily: "var(--font-jost)" }}>
          {prev ? (
            <Link href={`/${prev.slug}`} className="group flex flex-col gap-1 p-4 border border-[var(--border)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--muted-light)]">← Previous</span>
              <span className="text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1rem" }}>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/${next.slug}`} className="group flex flex-col gap-1 p-4 border border-[var(--border)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all text-right">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[var(--muted-light)]">Next →</span>
              <span className="text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1rem" }}>{next.title}</span>
            </Link>
          ) : <div />}
        </nav>

        {/* Focus mode + Print */}
        <div className="mt-8 flex items-center justify-between">
          <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors" style={{ fontFamily: "var(--font-jost)" }}>
            ← All works
          </Link>
          <div className="flex items-center gap-4">
            <FocusModeToggle />
            <PrintButton title={post.title} type={post.type ?? "poem"} />
          </div>
        </div>

        {/* Related poems */}
        {allPosts.length > 0 && (
          <RelatedPoems posts={allPosts} currentSlug={post.slug} />
        )}
      </main>
    </>
  );
}
