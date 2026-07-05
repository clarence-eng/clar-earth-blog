"use client";

import { useState } from "react";
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

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.type === active);

  return (
    <section className="px-8 py-14 max-w-6xl mx-auto w-full">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1 mb-10">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
              active === key
                ? "bg-[var(--forest)] text-white"
                : "bg-transparent text-[var(--muted)] hover:text-[var(--forest)] border border-[var(--border)] hover:border-[var(--forest)]"
            }`}
            style={{ fontFamily: "var(--font-jost)" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {filtered.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p
          className="text-center text-[var(--muted)] italic mt-12"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
        >
          Nothing here yet.
        </p>
      )}
    </section>
  );
}
