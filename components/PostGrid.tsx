"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";
import type { PostMeta } from "@/lib/posts";

const FILTERS = [
  { key: "all", label: "All Works" },
  { key: "poem", label: "Poems" },
  { key: "article", label: "Articles" },
  { key: "photo-essay", label: "Photo Essays" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function PostGrid({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<FilterKey>("all");
  const radioGroupRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all" ? posts : posts.filter((p) => p.type === active);

  const counts = useMemo(() => {
    const c: Record<FilterKey, number> = { all: posts.length, poem: 0, article: 0, "photo-essay": 0 };
    for (const p of posts) c[p.type]++;
    return c;
  }, [posts]);

  const handleRadioKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const container = radioGroupRef.current;
    if (!container) return;
    const siblings = Array.from(container.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
    const currentIndex = siblings.findIndex(el => el.getAttribute("aria-checked") === "true");
    if (currentIndex === -1) return;
    const nextIndex = e.key === "ArrowRight"
      ? (currentIndex + 1) % siblings.length
      : (currentIndex - 1 + siblings.length) % siblings.length;
    const nextKey = siblings[nextIndex].dataset.filterKey as FilterKey;
    setActive(nextKey);
    siblings[nextIndex].focus();
  };

  return (
    <section
      aria-labelledby="works-heading"
      className="px-8 py-14 max-w-6xl mx-auto w-full"
    >
      {/* Section heading */}
      <div className="flex items-center gap-5 mb-10">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <h2
          id="works-heading"
          className="font-jost text-[var(--charcoal)] tracking-[0.25em] uppercase"
          style={{ fontSize: "0.68rem" }}
        >
          Works
        </h2>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* Filter tabs */}
      <div className="relative mb-10">
        <div
          ref={radioGroupRef}
          className="filter-tabs-wrap flex gap-1.5 overflow-x-auto pb-1 scrollbar-none"
          role="radiogroup"
          aria-label="Filter by content type"
          onKeyDown={handleRadioKeyDown}
        >
          {FILTERS.map(({ key, label }) => {
            const count = counts[key];
            const isActive = active === key;
            return (
              <button
                type="button"
                key={key}
                data-filter-key={key}
                onClick={() => setActive(key)}
                role="radio"
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                className={`font-jost flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--forest)] text-white"
                    : "bg-transparent text-[var(--muted)] hover:text-[var(--forest)] border border-[var(--border)] hover:border-[var(--forest)]"
                }`}
              >
                {label}
                {count > 0 && (
                  <span
                    className={`text-[8px] rounded-full px-1.5 py-0 leading-[1.6] tabular-nums ${
                      isActive ? "bg-white/20 text-white" : "bg-[var(--border)] text-[var(--charcoal)]"
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

      {/* Screen-reader live region — announces result count after filter change */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {active !== "all"
          ? `${filtered.length} ${active} ${filtered.length === 1 ? "work" : "works"}`
          : `All ${filtered.length} works`}
      </p>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.p
            key={`${active}-empty`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center text-[var(--muted)] italic mt-12"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
          >
            Nothing here yet.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
