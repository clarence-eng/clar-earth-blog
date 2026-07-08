"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Post, PostMeta } from "@/lib/posts";
import { LANG_MAP, TYPE_LABELS, primaryMood } from "@/lib/config";
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
    const langMatch = text.match(/^\[lang:([a-z]{2}(?:-[a-zA-Z]+)?)\]/);
    if (langMatch) { lang = langMatch[1]; text = text.slice(langMatch[0].length).trimStart(); }
    if (text.startsWith("[italic]")) { italic = true; text = text.slice(8).trimStart(); }
    if (text.startsWith("[right]")) { align = "right"; text = text.slice(7).trimStart(); }
    else if (text.startsWith("[center]")) { align = "center"; text = text.slice(8).trimStart(); }
    if (!italic && text.startsWith("[italic]")) { italic = true; text = text.slice(8).trimStart(); }
    if (!lang) {
      const innerLangMatch = text.match(/^\[lang:([a-z]{2}(?:-[a-zA-Z]+)?)\]/);
      if (innerLangMatch) { lang = innerLangMatch[1]; text = text.slice(innerLangMatch[0].length).trimStart(); }
    }
    if (!italic && text.startsWith("[italic]")) { italic = true; text = text.slice(8).trimStart(); }
    return { text, align, italic, lang };
  }).filter(s => s.text.trim().length > 0);
}

const HERO_BG = "#1E2E28";


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

  // Move focus to main content after client-side navigation (keyboard or arrow-key)
  useEffect(() => {
    document.getElementById("main-content")?.focus();
  }, [post.slug]);

  // Track whether user has scrolled past the dark hero into the cream body
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const handler = () => setPastHero(window.scrollY > 380);
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // evaluate initial position
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const stanzaContent = useMemo(() => {
    const stanzas = parseStanzas(post.content);
    let firstDropIdx = stanzas.findIndex(s =>
      !s.italic && s.align === "left" && !s.lang && !s.text.trimStart().startsWith("*")
    );
    if (firstDropIdx === -1) firstDropIdx = 0;
    const leftStanzas = stanzas
      .map((s, i) => ({ ...s, originalIndex: i }))
      .filter(s => s.align === "left");
    const rightStanzas = stanzas
      .filter(s => s.align === "right");
    const isMirror = rightStanzas.length > 0 && leftStanzas.length === rightStanzas.length && (leftStanzas.length + rightStanzas.length === stanzas.length);
    return { stanzas, firstDropIdx, leftStanzas, rightStanzas, isMirror };
  }, [post.content]);

  return (
    <>
      <ReadingProgress />
      <BackPill />

      {/* ── Back arrow — fixed top-left, hidden in focus mode and print ── */}
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
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="motion-safe:group-hover:-translate-x-0.5 motion-safe:transition-transform motion-safe:duration-300">
              <path d="M8.5 1.5L3.5 6.5L8.5 11.5" stroke={pastHero ? "var(--forest)" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span
            className={`text-[10px] tracking-[0.2em] uppercase motion-safe:transition-all motion-safe:duration-300 opacity-0 group-hover:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover:translate-x-0 ${pastHero ? "text-[var(--muted)]" : "text-white/70"}`}
            style={{ fontFamily: "var(--font-jost)" }}
          >
            All works
          </span>
        </Link>
      </motion.div>

      {/* ── Hero + Body — wrapped in main so h1 is inside the landmark ── */}
      <main id="main-content" tabIndex={-1} data-mood={primaryMood(post.mood)} data-ladybug={post.ladybugColor}>
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
            alt=""
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
          style={{ paddingTop: "5.5rem", paddingBottom: "5rem" }}>

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
              {TYPE_LABELS[post.type]}
            </span>
            <span
              className="text-white/70 italic"
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
      <div className="px-8 pb-28 w-full" style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* Screen-reader hint for arrow-key poem navigation */}
        {(prev || next) && (
          <p className="sr-only">Use the left and right arrow keys to navigate between poems.</p>
        )}
        {/* Gold rule */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-[var(--gold)] mb-12 mt-2 opacity-80"
        />

        {/* Poem — lang attribute from post.lang (e.g. "中文" → "zh") when the whole poem is non-English */}
        <div className="poem-content" lang={LANG_MAP[post.lang ?? ""] ?? undefined}>
          {stanzaContent.isMirror ? (
            <div className="poem-two-col">
              <div className="poem-two-col__left">
                {stanzaContent.leftStanzas.map((s, i) => (
                  <AnimatedStanza
                    key={i}
                    index={i}
                    align="left"
                    italic={s.italic}
                    lang={s.lang}
                    isFirstDrop={s.originalIndex === stanzaContent.firstDropIdx}
                  >
                    {s.text}
                  </AnimatedStanza>
                ))}
              </div>
              <div className="poem-two-col__right">
                {stanzaContent.rightStanzas.map((s, i) => (
                  <AnimatedStanza
                    key={i}
                    index={stanzaContent.leftStanzas.length + i}
                    align="right"
                    italic={s.italic}
                    lang={s.lang}
                  >
                    {s.text}
                  </AnimatedStanza>
                ))}
              </div>
            </div>
          ) : (
            stanzaContent.stanzas.map((s, i) => (
              <AnimatedStanza
                key={i}
                index={i}
                align={s.align}
                italic={s.italic}
                lang={s.lang}
                isFirstDrop={i === stanzaContent.firstDropIdx}
              >
                {s.text}
              </AnimatedStanza>
            ))
          )}
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
          <p className="text-center text-[9px] tracking-[0.25em] uppercase text-[var(--muted-light)] mb-6 hidden md:block keyboard-hint" style={{ fontFamily: "var(--font-jost)" }} aria-hidden="true">
            ← → keys to navigate
          </p>
        )}

        {/* Prev / Next */}
        <nav aria-label="Poem navigation" className="grid grid-cols-2 gap-4 poem-prev-next" style={{ fontFamily: "var(--font-jost)" }}>
          {prev ? (
            <Link href={`/${prev.slug}`} aria-keyshortcuts="ArrowLeft" className="group flex flex-col gap-1 p-4 border border-[var(--border)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--muted)]"><span aria-hidden="true">← </span>Previous</span>
              <span className="cormorant-italic text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors duration-300 line-clamp-2" style={{ fontSize: "1rem" }}>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/${next.slug}`} aria-keyshortcuts="ArrowRight" className="group flex flex-col gap-1 p-4 border border-[var(--border)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all text-right">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--muted)]">Next <span aria-hidden="true">→</span></span>
              <span className="cormorant-italic text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors duration-300 line-clamp-2" style={{ fontSize: "1rem" }}>{next.title}</span>
            </Link>
          ) : <div />}
        </nav>

        {/* Focus mode + Print */}
        <div className="mt-8 flex items-center justify-between">
          <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors duration-300" style={{ fontFamily: "var(--font-jost)" }}>
            <span aria-hidden="true">← </span>All works
          </Link>
          <div className="flex items-center gap-4">
            <FocusModeToggle />
            <PrintButton title={post.title} type={post.type} />
          </div>
        </div>

        {/* Related poems */}
        {allPosts.length > 0 && (
          <RelatedPoems posts={allPosts} currentSlug={post.slug} />
        )}
      </div>
      </main>
    </>
  );
}
