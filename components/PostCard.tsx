"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";
import { TYPE_LABELS, primaryMood, LANG_MAP } from "@/lib/config";
import MoodTag from "./MoodTag";

const NATURE_COLORS = [
  { bg: "#2D4A3E", accent: "#8A9A6A" },
  { bg: "#4A3D2A", accent: "#C4882A" },
  { bg: "#3A4A3A", accent: "#A8C4A0" },
  { bg: "#2A3D4A", accent: "#7AAABB" },
  { bg: "#3D2A3A", accent: "#B57CAA" },
  { bg: "#4A3A2A", accent: "#C4A47C" },
];

function PlaceholderCover({ title, slug }: { title: string; slug: string }) {
  // Hash slug for stable color across filter changes
  const colorIndex = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const { bg, accent } = NATURE_COLORS[colorIndex % NATURE_COLORS.length];
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: bg }}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M100 185C100 150 85 115 65 95C45 75 25 72 30 50C35 28 65 22 85 42C92 50 99 63 100 75C101 63 108 50 115 42C135 22 165 28 170 50C175 72 155 75 135 95C115 115 100 150 100 185Z" fill={accent} opacity="0.3"/>
      </svg>
      <span aria-hidden="true" className="cormorant-italic relative text-6xl select-none" style={{ color: accent, opacity: 0.85 }}>
        {title.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export default function PostCard({ post, index }: { post: PostMeta; index: number }) {
  const reducedMotion = useReducedMotion();

  // Magnetic 3D tilt — disabled when user prefers reduced motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-1, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const shouldAnimate = reducedMotion !== true;

  const cardMood = primaryMood(post.mood);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
      data-mood={cardMood}
      data-ladybug={post.ladybugColor}
    >
      {/* Overlay link — covers the entire card; accessible name comes from aria-labelledby pointing to the h2 */}
      <Link
        href={`/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-labelledby={`post-title-${post.slug}`}
      />
        {/* 3D tilt image box */}
        <motion.div
          className="overflow-hidden rounded-sm aspect-[4/3] relative"
          style={{ rotateX: shouldAnimate ? rotateX : 0, rotateY: shouldAnimate ? rotateY : 0, transformStyle: "preserve-3d", transformPerspective: 800 }}
          onMouseMove={!shouldAnimate ? undefined : (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
            y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
          }}
          onMouseLeave={!shouldAnimate ? undefined : () => { x.set(0); y.set(0); }}
          whileHover={shouldAnimate ? { y: -6, boxShadow: "0 20px 44px rgba(45,74,62,0.22)" } : undefined}
          transition={shouldAnimate ? { y: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }, boxShadow: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } } : undefined}
        >
          <div
            className="relative w-full h-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
          >
            {post.coverImage ? (
              <Image src={post.coverImage} alt="" fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="object-cover" />
            ) : (
              <PlaceholderCover title={post.title} slug={post.slug} />
            )}
          </div>
          {/* Forest overlay on hover */}
          <div aria-hidden="true" className="absolute inset-0 bg-[var(--forest)] opacity-0 group-hover:opacity-[0.14] transition-opacity duration-500" />
          {/* Mood shimmer — top edge glow */}
          {cardMood && (
            <div className="card-mood-shimmer absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" data-mood={cardMood} data-ladybug={post.ladybugColor} />
          )}
        </motion.div>

        {/* Meta */}
        <div className="mt-4 px-0.5">
          <div className="flex items-center flex-wrap gap-2 mb-2.5">
            <span className={`font-jost text-[10px] sm:text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full type-badge-${post.type}`}>
              {TYPE_LABELS[post.type]}
            </span>
            {post.lang && <span className="font-jost text-[10px] text-[var(--ink)]" lang={LANG_MAP[post.lang] ?? post.lang}>{post.lang}</span>}
            <MoodTag mood={post.mood} />
          </div>

          <h2
            id={`post-title-${post.slug}`}
            className="cormorant-italic text-balance leading-tight text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors duration-300 text-lg"
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p
              className="cormorant-italic text-pretty mt-2 text-[var(--muted)] leading-relaxed line-clamp-2"
              style={{ fontSize: "0.97rem" }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Gold underline reveal */}
          <div aria-hidden="true" className="gold-underline-reveal mt-3" />
        </div>
    </motion.article>
  );
}
