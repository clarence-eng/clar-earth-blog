"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { PostMeta } from "@/lib/posts";
import { primaryMood } from "@/lib/config";

export default function RelatedPoems({ posts, currentSlug }: { posts: PostMeta[]; currentSlug: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const reducedMotion = useReducedMotion();
  const idx = posts.findIndex(p => p.slug === currentSlug);
  const current = idx !== -1 ? posts[idx] : null;
  if (!current) return null;

  // Prefer poems that share any mood with the current poem
  const currentMoods = new Set(Array.isArray(current?.mood) ? current.mood : current?.mood ? [current.mood] : []);
  const sameMood = posts.filter(p => {
    if (p.slug === currentSlug) return false;
    const pMoods = Array.isArray(p.mood) ? p.mood : p.mood ? [p.mood] : [];
    return pMoods.some(m => currentMoods.has(m));
  });
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
      ref={ref}
      initial={reducedMotion !== false ? {} : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : reducedMotion !== false ? {} : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="related-poems mt-20 pt-10 border-t border-[var(--border)]"
      aria-label="More poems"
    >
      <p className="text-[9px] tracking-[0.35em] uppercase text-[var(--muted)] mb-6"
        style={{ fontFamily: "var(--font-jost)" }}>
        More poems
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {candidates.map(p => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className="group block"
            data-mood={primaryMood(p.mood)}
            data-ladybug={p.ladybugColor ?? undefined}
          >
            {p.coverImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3">
                <Image src={p.coverImage} alt={p.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04]"/>
                <div className="absolute inset-0 bg-[var(--forest)] opacity-0 group-hover:opacity-[0.14] transition-opacity duration-500"/>
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
