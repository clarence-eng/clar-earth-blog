"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <motion.nav
      variants={container}
      initial="hidden"
      animate="show"
      aria-label="Posts"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={item}>
          <Link
            href={`/${post.slug}`}
            className="group block py-2.5 border-b border-transparent hover:border-[var(--border)] transition-all duration-300"
          >
            <span
              className="tracking-[0.18em] text-[11.5px] font-medium uppercase text-[var(--charcoal)] group-hover:text-[var(--sage)] transition-colors duration-300"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              {post.title}
            </span>
            {post.lang && (
              <span className="ml-3 text-[10px] text-[var(--muted)] tracking-wider">
                {post.lang}
              </span>
            )}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
}
