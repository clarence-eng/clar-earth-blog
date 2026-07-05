"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";

export default function RelatedPoems({ posts, currentSlug }: { posts: PostMeta[]; currentSlug: string }) {
  const idx = posts.findIndex(p => p.slug === currentSlug);
  const current = posts[idx];

  // Prefer poems with the same mood; fall back to adjacent posts
  const sameMood = posts.filter(p => p.slug !== currentSlug && p.mood && p.mood === current?.mood);
  const adjacent = posts.filter((_, i) => Math.abs(i - idx) <= 2 && posts[i].slug !== currentSlug);
  const seen = new Set<string>();
  const candidates: PostMeta[] = [];
  for (const p of [...sameMood, ...adjacent]) {
    if (!seen.has(p.slug)) { seen.add(p.slug); candidates.push(p); }
    if (candidates.length === 3) break;
  }
  if (candidates.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-20 pt-10 border-t border-[var(--border)]"
    >
      <p className="text-[9px] tracking-[0.35em] uppercase text-[var(--muted)] mb-6"
        style={{ fontFamily: "var(--font-jost)" }}>
        More poems
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {candidates.map(p => (
          <Link key={p.slug} href={`/${p.slug}`} className="group block">
            {p.coverImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3">
                <Image src={p.coverImage} alt={p.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"/>
                <div className="absolute inset-0 bg-[var(--forest)] opacity-0 group-hover:opacity-15 transition-opacity duration-500"/>
              </div>
            )}
            <h3 className="text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors"
              style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.35 }}>
              {p.title}
            </h3>
            <div className="mt-2 h-px w-0 group-hover:w-8 bg-[var(--gold)] transition-all duration-500"/>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
