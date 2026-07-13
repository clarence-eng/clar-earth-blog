"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, useIsPresent } from "framer-motion";
import type { PostMeta } from "@/lib/posts";
import { TYPE_LABELS, LANG_MAP } from "@/lib/config";

interface SearchModalProps {
  posts: PostMeta[];
  onClose: () => void;
}

export default function SearchModal({ posts, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus trap — keep Tab/Shift+Tab within the dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute("aria-hidden"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const shown = useMemo(() => {
    if (query.trim().length < 2) return posts.slice(0, 8);
    const q = query.trim().toLowerCase();
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      p.dedication?.toLowerCase().includes(q) ||
      (p.mood?.some(m => m.toLowerCase().includes(q)))
    );
  }, [query, posts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 search-glass"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-xl rounded-sm overflow-hidden shadow-2xl"
        style={{ background: "var(--cream)" }}
        onClick={e => e.stopPropagation()}
        id="search-modal-dialog"
        data-state={isPresent ? "open" : "closed"}
        role="dialog"
        aria-modal="true"
        aria-label="Search all works"
        ref={dialogRef}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            aria-label="Search query"
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search poems..."
            className="cormorant-serif flex-1 bg-transparent outline-none focus:ring-1 focus:ring-[var(--forest)] rounded-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
            style={{ fontSize: "1.1rem" }}
          />
          <kbd aria-hidden="true" className="font-jost text-[9px] tracking-wider text-[var(--muted)] border border-[var(--border)] rounded px-1.5 py-0.5">ESC</kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex items-center justify-center w-6 h-6 rounded hover:bg-[var(--cream-dark)] transition-colors duration-300 text-[var(--muted)] hover:text-[var(--ink)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11"/>
            </svg>
          </button>
        </div>

        {/* Results */}
        <p aria-live="polite" aria-atomic="true" className="sr-only">{query.trim().length >= 2 ? `${shown.length} result${shown.length !== 1 ? 's' : ''}` : `Showing ${shown.length} of ${posts.length} works`}</p>
        {shown.length === 0 && query.trim().length >= 2 && (
          <p className="cormorant-serif px-5 py-8 text-center text-[var(--muted)] italic" style={{ fontSize: "1rem" }}>
            No poems match &ldquo;{query}&rdquo;
          </p>
        )}
        <ul role="list" className="max-h-80 overflow-y-auto">
          {shown.map((post) => (
            <li key={post.slug}>
            <Link
              href={`/${post.slug}`}
              onClick={onClose}
              className="flex items-start gap-4 px-5 py-3.5 hover:bg-[var(--cream-dark)] transition-colors duration-300 border-b border-[var(--border)] last:border-0 group"
            >
              <span className="font-jost text-[8px] tracking-[0.25em] uppercase text-[var(--muted)] pt-1 w-12 flex-shrink-0">
                {TYPE_LABELS[post.type]}
              </span>
              <div>
                <p className="cormorant-italic text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors duration-300 leading-snug" style={{ fontSize: "1.1rem" }}>
                  {post.title}
                  {post.lang && <span className="ml-2 text-[10px] not-italic text-[var(--muted)]" lang={LANG_MAP[post.lang] ?? undefined}>{post.lang}</span>}
                </p>
                {post.excerpt && (
                  <p className="font-jost text-[var(--muted)] text-xs mt-0.5 line-clamp-1">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
            </li>
          ))}
        </ul>

        {query.trim().length < 2 && (
          <p className="font-jost px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase text-[var(--muted)]">
            Showing {shown.length} of {posts.length} {posts.length === 1 ? "work" : "works"}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
