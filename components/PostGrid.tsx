"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import PostCard from "./PostCard";
import type { PostMeta } from "@/lib/posts";
import { MOOD_CONFIG } from "./MoodTag";

const FILTERS = [
  { key: "all", label: "All Works" },
  { key: "poem", label: "Poems" },
  { key: "article", label: "Articles" },
  { key: "photo-essay", label: "Photo Essays" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function PostGrid({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<FilterKey>("all");
  const [ambientMood, setAmbientMood] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();

  const filtered = active === "all" ? posts : posts.filter((p) => p.type === active);

  const counts: Record<string, number> = {
    all: posts.length,
    poem: posts.filter((p) => p.type === "poem").length,
    article: posts.filter((p) => p.type === "article").length,
    "photo-essay": posts.filter((p) => p.type === "photo-essay").length,
  };

  // Re-observe cards whenever the active filter changes
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let observer: IntersectionObserver | null = null;
    // Wait one frame for AnimatePresence to finish mounting new cards
    const id = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter(e => e.isIntersecting && e.intersectionRatio > 0.4);
          if (visible.length === 0) return;
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          const mood = (top.target as HTMLElement).dataset.mood ?? null;
          setAmbientMood(mood || null);
        },
        { threshold: 0.4 }
      );
      node.querySelectorAll("article[data-mood]").forEach(card => observer!.observe(card));
    });
    return () => {
      cancelAnimationFrame(id);
      observer?.disconnect();
    };
  }, [active, posts]);

  // Pick light or dark mood background colour based on resolved theme
  const moodColor = ambientMood && MOOD_CONFIG[ambientMood]
    ? (resolvedTheme === "dark" ? MOOD_CONFIG[ambientMood].darkBg : MOOD_CONFIG[ambientMood].bg)
    : null;

  return (
    <section
      className="post-grid-section px-8 py-14 max-w-6xl mx-auto w-full transition-colors duration-[1200ms]"
      style={moodColor ? { backgroundColor: moodColor, borderRadius: "2px" } : undefined}
      ref={sectionRef}
    >
      {/* Section heading */}
      <div className="flex items-center gap-5 mb-10">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <h2
          className="text-[var(--muted)] tracking-[0.25em] uppercase"
          style={{ fontFamily: "var(--font-jost)", fontSize: "0.68rem" }}
        >
          Works
        </h2>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* Filter tabs */}
      <div className="relative mb-10">
        <div className="filter-tabs-wrap flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map(({ key, label }) => {
            const count = counts[key];
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[var(--forest)] text-white"
                    : "bg-transparent text-[var(--muted)] hover:text-[var(--forest)] border border-[var(--border)] hover:border-[var(--forest)]"
                }`}
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {label}
                {count > 0 && (
                  <span
                    className={`text-[8px] rounded-full px-1.5 py-0 leading-[1.6] tabular-nums ${
                      isActive ? "bg-white/20 text-white" : "bg-[var(--border)] text-[var(--muted)]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[var(--cream)] to-transparent sm:hidden" />
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {filtered.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-center text-[var(--muted)] italic mt-12" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}>
          Nothing here yet.
        </p>
      )}
    </section>
  );
}
