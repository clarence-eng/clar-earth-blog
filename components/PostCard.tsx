"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { PostMeta } from "@/lib/posts";
import MoodTag from "./MoodTag";

const TYPE_LABELS: Record<string, string> = {
  poem: "Poem",
  article: "Article",
  "photo-essay": "Photo Essay",
};

const NATURE_COLORS = [
  { bg: "#2D4A3E", accent: "#8A9A6A" },
  { bg: "#4A3D2A", accent: "#C4882A" },
  { bg: "#3A4A3A", accent: "#A8C4A0" },
  { bg: "#2A3D4A", accent: "#7AAABB" },
  { bg: "#3D2A3A", accent: "#B57CAA" },
  { bg: "#4A3A2A", accent: "#C4A47C" },
];

function PlaceholderCover({ title, index }: { title: string; index: number }) {
  const { bg, accent } = NATURE_COLORS[index % NATURE_COLORS.length];
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: bg }}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path d="M100 185C100 150 85 115 65 95C45 75 25 72 30 50C35 28 65 22 85 42C92 50 99 63 100 75C101 63 108 50 115 42C135 22 165 28 170 50C175 72 155 75 135 95C115 115 100 150 100 185Z" fill={accent} opacity="0.3"/>
      </svg>
      <span className="relative text-6xl font-light select-none" style={{ color: accent, fontFamily: "var(--font-cormorant)", fontStyle: "italic", opacity: 0.85 }}>
        {title.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export default function PostCard({ post, index }: { post: PostMeta; index: number }) {
  const typeLabel = TYPE_LABELS[post.type] ?? "Poem";

  // Magnetic 3D tilt — track pointer within card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-1, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      className="group"
      data-mood={post.mood}
    >
      <Link href={`/${post.slug}`} className="block h-full">
        {/* 3D tilt image box */}
        <motion.div
          className="overflow-hidden rounded-sm aspect-[4/3] relative"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 800 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ y: -6, boxShadow: "0 20px 44px rgba(45,74,62,0.22)" }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          <div
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          >
            {post.coverImage ? (
              <Image src={post.coverImage} alt={post.title} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="object-cover" />
            ) : (
              <PlaceholderCover title={post.title} index={index} />
            )}
          </div>
          {/* Forest overlay on hover */}
          <div className="absolute inset-0 bg-[var(--forest)] opacity-0 group-hover:opacity-[0.14] transition-opacity duration-500" />
          {/* Mood shimmer — top edge glow */}
          {post.mood && (
            <div className="card-mood-shimmer absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" data-mood={post.mood} />
          )}
        </motion.div>

        {/* Meta */}
        <div className="mt-4 px-0.5">
          <div className="flex items-center flex-wrap gap-2 mb-2.5">
            <span className={`text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full type-badge-${post.type ?? "poem"}`} style={{ fontFamily: "var(--font-jost)" }}>
              {typeLabel}
            </span>
            {post.lang && <span className="text-[10px] text-[var(--muted)]" style={{ fontFamily: "var(--font-jost)" }}>{post.lang}</span>}
            <MoodTag mood={post.mood} />
          </div>

          <h2
            className="text-balance leading-tight text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors duration-300 text-lg"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 400 }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p
              className="text-pretty mt-2 text-[var(--muted)] leading-relaxed line-clamp-2"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.97rem", fontStyle: "italic" }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Gold underline reveal */}
          <div className="mt-3 h-px w-0 group-hover:w-10 bg-[var(--gold)] transition-all duration-500 ease-out" />
        </div>
      </Link>
    </motion.article>
  );
}
