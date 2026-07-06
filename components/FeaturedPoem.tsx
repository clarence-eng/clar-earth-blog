"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";

const TYPE_LABELS: Record<string, string> = {
  poem: "Poem",
  article: "Article",
  "photo-essay": "Photo Essay",
};

export default function FeaturedPoem({ post }: { post: PostMeta }) {
  return (
    <section className="max-w-6xl mx-auto px-8 pt-12 pb-0">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[9px] tracking-[0.35em] uppercase text-[var(--muted)]" style={{ fontFamily: "var(--font-jost)" }}>
          Featured
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <Link href={`/${post.slug}`} className="group block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden rounded-sm"
          style={{ aspectRatio: "21/7", minHeight: 220 }}
        >
          {/* Cover image */}
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          )}

          {/* Dark overlay — deeper for legibility */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(20,26,22,0.88) 0%, rgba(20,26,22,0.55) 50%, rgba(20,26,22,0.2) 100%)" }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-center px-10 md:px-16 py-8">
            <div className="max-w-lg">
              <span
                className="inline-block text-[9px] tracking-[0.3em] uppercase px-2 py-0.5 rounded-full mb-4 bg-white/15 text-white/70"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {TYPE_LABELS[post.type ?? "poem"] ?? "Poem"}
              </span>
              <h2
                className="text-white leading-[1.15] mb-3 group-hover:opacity-90 transition-opacity"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                }}
              >
                {post.title}
              </h2>
              {post.excerpt && (
                <p
                  className="text-white/55 leading-relaxed line-clamp-2 mb-5"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.88rem, 1.5vw, 1rem)" }}
                >
                  {post.excerpt}
                </p>
              )}
              <span
                className="text-[10px] tracking-[0.25em] uppercase text-white/50 group-hover:text-white/80 transition-colors flex items-center gap-2"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Read {(TYPE_LABELS[post.type ?? "poem"] ?? "poem").toLowerCase()}
                <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
