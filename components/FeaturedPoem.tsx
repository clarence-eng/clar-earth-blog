"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";
import { TYPE_LABELS, primaryMood } from "@/lib/config";

export default function FeaturedPoem({ post }: { post: PostMeta }) {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-label="Featured work" className="max-w-6xl mx-auto px-8 pt-12 pb-0" data-mood={primaryMood(post.mood)} data-ladybug={post.ladybugColor}>
      <div className="flex items-center gap-4 mb-6">
        <span className="section-label">
          Featured
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <Link href={`/${post.slug}`} aria-label={`${post.title} — read ${TYPE_LABELS[post.type].toLowerCase()}`} className="group block">
        <motion.div
          initial={reducedMotion === true ? {} : { opacity: 0, y: 20 }}
          animate={reducedMotion === true ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden rounded-sm"
          style={{ aspectRatio: "21/7", minHeight: 220 }}
        >
          {/* Cover image */}
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.02]"
            />
          )}

          {/* Dark overlay — deeper for legibility */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(20,26,22,0.88) 0%, rgba(20,26,22,0.55) 50%, rgba(20,26,22,0.2) 100%)" }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-center" style={{ padding: "2rem 3rem" }}>
            <div style={{ maxWidth: 380 }}>
              <span
                className="font-jost inline-block text-[9px] tracking-[0.3em] uppercase px-2 py-0.5 rounded-full mb-4 bg-white/15 text-white/70"
              >
                {TYPE_LABELS[post.type]}
              </span>
              <h2
                className="cormorant-italic text-white leading-[1.2] mb-2 group-hover:opacity-90 transition-opacity duration-300"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                }}
              >
                {post.title}
              </h2>
              {post.excerpt && (
                <p
                  className="cormorant-serif text-white/65 leading-relaxed line-clamp-1 mb-4"
                  style={{ fontSize: "0.9rem" }}
                >
                  {post.excerpt}
                </p>
              )}
              <span
                className="font-jost text-[10px] tracking-[0.25em] uppercase text-white/65 group-hover:text-white/90 transition-colors duration-300 flex items-center gap-2"
              >
                Read {TYPE_LABELS[post.type].toLowerCase()}
                <span className="group-hover:translate-x-1 inline-block transition-transform duration-300" aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
