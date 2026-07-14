"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";
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

// Parse raw poem body into stanzas, stripping [italic], [right], [center], and [lang:xx] markers — these may appear at the block start or after an alignment marker (e.g. [right][lang:xx][italic]).
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
    // Re-check alignment after inner lang strip (handles [italic][lang:xx][right/center]text)
    if (align === "left") {
      if (text.startsWith("[right]")) { align = "right"; text = text.slice(7).trimStart(); }
      else if (text.startsWith("[center]")) { align = "center"; text = text.slice(8).trimStart(); }
    }
    if (!italic && text.startsWith("[italic]")) { italic = true; text = text.slice(8).trimStart(); }
    return { text, align, italic, lang };
  }).filter(s => s.text.trim().length > 0);
}

// Must stay as a hex constant (used in hex-alpha gradient interpolation: `${HERO_BG}CC`)
// Now also registered as --hero-bg CSS token in globals.css for palette consistency
const HERO_BG = "#1E2E28";


export default function PostPageClient({
  post,
  prev,
  next,
  readTime,
  allPosts,
}: {
  post: Post;
  prev: PostMeta | null;
  next: PostMeta | null;
  readTime: string;
  allPosts: PostMeta[];
}) {
  const router = useRouter();

  // Keyboard navigation ← →
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement || (e.target instanceof HTMLElement && (e.target.isContentEditable || e.target.getAttribute('role') === 'button'))) return;
      // Don't navigate when the search modal or mobile menu is open/visible
      // Use data-state="open" on the dialog (not just DOM presence) to avoid blocking during exit animation
      const dialog = document.getElementById("search-modal-dialog");
      if (dialog && dialog.getAttribute("data-state") === "open") return;
      const mobileMenu = document.getElementById("mobile-menu"); if (mobileMenu?.getAttribute("data-state") === "open") return;
      if (e.key === "ArrowRight" && next) router.push(`/${next.slug}`);
      if (e.key === "ArrowLeft" && prev) router.push(`/${prev.slug}`);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, router]);

  // Move focus to main content after client-side navigation (not on initial mount)
  const isMountRef = useRef(true);
  useEffect(() => {
    if (isMountRef.current) { isMountRef.current = false; return; }
    document.getElementById("main-content")?.focus();
  }, [post.slug]);

  // Track whether user has scrolled past the dark hero into the cream body
  const [pastHero, setPastHero] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handler = () => setPastHero(window.scrollY > 380);
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // evaluate initial position
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const stanzaContent = useMemo(() => {
    const stanzas = parseStanzas(post.content);
    const firstDropIdx = stanzas.findIndex(s =>
      !s.italic && s.align === "left" && !s.lang && !s.text.trimStart().startsWith("*")
    );
    // -1 means every stanza is disqualified; no drop-cap applied
    const rightStanzas = stanzas.filter(s => s.align === "right");
    // Hoist left-stanza list so we can reuse it for both isMirror check and leftStanzas
    const leftStanzasAll = stanzas.map((s, i) => ({ ...s, originalIndex: i })).filter(s => s.align === "left");
    // Mirror layout only when EVERY stanza is left or right — no center stanzas present
    const isMirror = rightStanzas.length > 0 && leftStanzasAll.length === rightStanzas.length &&
      stanzas.every(s => s.align === "left" || s.align === "right");
    const leftStanzas = isMirror ? leftStanzasAll : [];
    return { stanzas, firstDropIdx, leftStanzas, rightStanzas, isMirror };
  }, [post.content]);

  return (
    <>
      <ReadingProgress />
      <nav aria-label="Return navigation">
        <BackPill />

        {/* ── Back arrow — fixed top-left, hidden in focus mode and print ── */}
        <motion.div
          initial={mounted ? { opacity: 0, x: -8 } : false}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="poem-back-arrow fixed top-[4.5rem] left-4 md:left-6 z-40"
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Back to all works">
            <span className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-500 ${
              pastHero
                ? "border-[var(--border)] bg-[var(--cream)] shadow-sm group-hover:bg-[var(--cream-dark)] group-hover:border-[var(--sage)]"
                : "border-white/25 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white/50"
            }`}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="motion-safe:group-hover:-translate-x-0.5 motion-safe:transition-transform motion-safe:duration-300">
                <path d="M8.5 1.5L3.5 6.5L8.5 11.5" stroke={pastHero ? "var(--forest)" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span
              className={`font-jost text-[10px] tracking-[0.2em] uppercase motion-safe:transition-all motion-safe:duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover:translate-x-0 ${pastHero ? "text-[var(--muted)]" : "text-white/70"}`}
            >
              All works
            </span>
          </Link>
        </motion.div>
      </nav>

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
            initial={mounted ? { opacity: 0 } : false}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span
              className="font-jost inline-block text-[9px] tracking-[0.35em] uppercase px-2.5 py-1 rounded-full bg-white/15 text-white/70"
            >
              {TYPE_LABELS[post.type]}
            </span>
            <span
              className="cormorant-italic text-white/70"
              style={{ fontSize: "0.9rem" }}
            >
              {readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={mounted ? { opacity: 0, y: 14 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="cormorant-italic text-balance text-white mb-3 poem-page-title"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </motion.h1>

          {/* Dedication / co-author + mood tag */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {(post.dedication?.trim() || post.coAuthor) && (
              <motion.p
                initial={mounted ? { opacity: 0 } : false}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="cormorant-italic text-white/55"
                style={{ fontSize: "1rem" }}
              >
                {post.dedication?.trim() && post.coAuthor
                  ? `${post.dedication.trim()} · ${post.coAuthor}`
                  : post.dedication?.trim() || post.coAuthor}
              </motion.p>
            )}
            {!!post.mood?.length && (
              <motion.div initial={mounted ? { opacity: 0 } : false} animate={mounted ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}>
                <MoodTag mood={post.mood} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body — data-mood drives cursor colour ────────────── */}
      <div className="px-4 sm:px-8 pb-28 w-full" style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* Screen-reader hint for arrow-key poem navigation */}
        {(prev || next) && (
          <p className="sr-only">Use the left and right arrow keys to navigate between poems.</p>
        )}
        {/* Gold rule */}
        <motion.div
          initial={mounted ? { width: 0 } : false}
          animate={mounted ? { width: 40 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-[var(--gold)] mb-12 mt-2 opacity-80"
        />

        {/* Poem — lang attribute from post.lang (e.g. "中文" → "zh") when the whole poem is non-English */}
        <div className="poem-content" lang={post.lang ? LANG_MAP[post.lang] : undefined}>
          {stanzaContent.isMirror ? (
            <div className="poem-two-col">
              <div className="poem-two-col__left">
                {stanzaContent.leftStanzas.map((s, i) => (
                  <AnimatedStanza
                    key={i}
                    index={i}
                    align={s.align}
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
                    align={s.align}
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
          <p className="font-jost text-center text-[9px] tracking-[0.25em] uppercase text-[var(--muted)] mb-6 hidden md:block keyboard-hint" aria-hidden="true">
            ← → keys to navigate
          </p>
        )}

        {/* Prev / Next */}
        <nav aria-label="Poem navigation" className="font-jost grid grid-cols-1 sm:grid-cols-2 gap-4 poem-prev-next">
          {prev ? (
            <Link href={`/${prev.slug}`} aria-keyshortcuts="ArrowLeft" className="group flex flex-col gap-1 p-4 border border-[var(--muted)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all duration-300">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--muted)]"><span aria-hidden="true">← </span>Previous</span>
              <span className="cormorant-italic text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors duration-300 line-clamp-2" style={{ fontSize: "1rem" }}>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/${next.slug}`} aria-keyshortcuts="ArrowRight" className="group flex flex-col gap-1 p-4 border border-[var(--muted)] rounded-sm hover:border-[var(--sage)] hover:bg-[var(--cream-dark)] transition-all duration-300 text-right">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--muted)]">Next <span aria-hidden="true">→</span></span>
              <span className="cormorant-italic text-[var(--muted)] group-hover:text-[var(--forest)] transition-colors duration-300 line-clamp-2" style={{ fontSize: "1rem" }}>{next.title}</span>
            </Link>
          ) : <div />}
        </nav>

        {/* Focus mode + Print */}
        <div className="mt-8 flex items-center justify-between">
          <Link href="/" className="font-jost text-xs tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--forest)] transition-colors duration-300">
            <span aria-hidden="true">← </span>All works
          </Link>
          <div className="flex items-center gap-4">
            <FocusModeToggle />
            <PrintButton title={post.title} type={post.type} />
          </div>
        </div>

        {/* Related poems */}
        <RelatedPoems posts={allPosts} currentSlug={post.slug} />
      </div>
      </main>
    </>
  );
}
