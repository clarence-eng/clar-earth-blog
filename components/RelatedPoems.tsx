"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
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
    return p.mood?.some(m => currentMoods.has(m)) ?? false;
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
      aria-label="More poems"
    >
      <p className="section-label mb-6" aria-hidden="true">
        More poems
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {candidates.map(p => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="group block"
            data-mood={primaryMood(p.mood)}
            data-ladybug={p.ladybugColor}
          >
            {p.coverImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3">
                <Image src={p.coverImage} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04]"/>
                <div className="absolute inset-0 bg-[var(--forest)] opacity-0 group-hover:opacity-[0.14] transition-opacity duration-500"/>
              </div>
            )}
            <h3 className="cormorant-italic text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors duration-300"
              style={{ fontSize: "1.05rem", lineHeight: 1.35 }}>
              {p.title}
            </h3>
            <div className="gold-underline-reveal mt-2"/>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
