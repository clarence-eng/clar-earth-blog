"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const PLACEHOLDER_COLORS = [
  { bg: "#2D4A3E", accent: "#8A9A6A" },
  { bg: "#4A3D2A", accent: "#C4882A" },
  { bg: "#3A4A3A", accent: "#A8C4A0" },
  { bg: "#2A3D4A", accent: "#7AAABB" },
];

function PlaceholderCover({ slug }: { slug: string }) {
  const idx = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const { bg, accent } = PLACEHOLDER_COLORS[idx % PLACEHOLDER_COLORS.length];
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: bg }} aria-hidden="true">
      <svg viewBox="0 0 60 60" className="w-8 h-8 opacity-40" aria-hidden="true">
        <path d="M30 55C30 42 23 30 17 23C11 16 5 15 7 7C9 -1 19 -3 25 5C27 8 30 14 30 19C30 14 33 8 35 5C41 -3 51 -1 53 7C55 15 49 16 43 23C37 30 30 42 30 55Z" fill={accent}/>
      </svg>
    </div>
  );
}
import { useRef } from "react";
import type { PostMeta } from "@/lib/posts";
import { primaryMood } from "@/lib/config";

export default function RelatedPoems({ posts, currentSlug }: { posts: PostMeta[]; currentSlug: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const idx = posts.findIndex(p => p.slug === currentSlug);
  if (idx === -1) return null;

  // Prefer poems that share any mood with the current poem
  const currentMoods = new Set(posts[idx].mood ?? []);
  const sameMood = posts.filter(p => {
    if (p.slug === currentSlug) return false;
    return p.mood?.some(m => currentMoods.has(m));
  });
  const adjacent = posts.filter((p, i) => Math.abs(i - idx) <= 2 && p.slug !== currentSlug);
  const seen = new Set<string>();
  const candidates: PostMeta[] = [];
  for (const p of [...sameMood, ...adjacent]) {
    if (!seen.has(p.slug)) { seen.add(p.slug); candidates.push(p); }
    if (candidates.length === 3) break;
  }
  if (candidates.length === 0) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="related-poems mt-20 pt-10 border-t border-[var(--border)]"
      aria-label="More works"
    >
      <p className="section-label mb-6" aria-hidden="true">
        More works
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {candidates.map(p => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 rounded-sm"
            data-mood={primaryMood(p.mood)}
            data-ladybug={p.ladybugColor}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3">
              {p.coverImage ? (
                <Image src={p.coverImage} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]"/>
              ) : (
                <PlaceholderCover slug={p.slug} />
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-[var(--forest)] opacity-0 group-hover:opacity-[0.14] group-focus-visible:opacity-[0.14] motion-safe:transition-opacity motion-safe:duration-500"/>
            </div>
            <h3 className="cormorant-italic text-[var(--ink)] group-hover:text-[var(--forest)] group-focus-visible:text-[var(--forest)] transition-colors duration-300"
              style={{ fontSize: "1.05rem", lineHeight: 1.35 }}>
              {p.title}
            </h3>
            <div aria-hidden="true" className="gold-underline-reveal mt-2"/>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
