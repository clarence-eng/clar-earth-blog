"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/posts";
import { TYPE_LABELS } from "@/lib/config";

interface SearchModalProps {
  posts: PostMeta[];
  onClose: () => void;
}

export default function SearchModal({ posts, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus trap — keep Tab/Shift+Tab within the dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, []);

  const results = query.trim().length < 2 ? [] : posts.filter(p => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      p.dedication?.toLowerCase().includes(q) ||
      (p.mood?.some((m: string) => m.toLowerCase().includes(q)) ?? false)
    );
  });

  const shown = query.trim().length < 2 ? posts.slice(0, 8) : results;

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
            className="flex-1 bg-transparent outline-none focus:ring-1 focus:ring-[var(--sage)] rounded-sm text-[var(--ink)] placeholder:text-[var(--muted-light)]"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
          />
          <kbd className="text-[9px] tracking-wider text-[var(--muted)] border border-[var(--border)] rounded px-1.5 py-0.5" style={{ fontFamily: "var(--font-jost)" }}>ESC</kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex items-center justify-center w-6 h-6 rounded hover:bg-[var(--cream-dark)] transition-colors text-[var(--muted)] hover:text-[var(--ink)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11"/>
            </svg>
          </button>
        </div>

        {/* Results */}
        <p aria-live="polite" aria-atomic="true" className="sr-only">{query.trim().length >= 2 ? `${shown.length} result${shown.length !== 1 ? 's' : ''}` : ''}</p>
        {shown.length === 0 && query.trim().length >= 2 && (
          <p className="px-5 py-8 text-center text-[var(--muted)] italic" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
            No poems match &ldquo;{query}&rdquo;
          </p>
        )}
        <ul className="max-h-80 overflow-y-auto">
          {shown.map((post) => (
            <li key={post.slug}>
            <Link
              href={`/${post.slug}`}
              onClick={onClose}
              className="flex items-start gap-4 px-5 py-3.5 hover:bg-[var(--cream-dark)] transition-colors border-b border-[var(--border)] last:border-0 group"
            >
              <span className="text-[8px] tracking-[0.25em] uppercase text-[var(--muted)] pt-1 w-12 flex-shrink-0" style={{ fontFamily: "var(--font-jost)" }}>
                {TYPE_LABELS[post.type] ?? post.type}
              </span>
              <div>
                <p className="text-[var(--ink)] group-hover:text-[var(--forest)] transition-colors leading-snug" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.1rem" }}>
                  {post.title}
                  {post.lang && <span className="ml-2 text-[10px] not-italic text-[var(--muted)]">{post.lang}</span>}
                </p>
                {post.excerpt && (
                  <p className="text-[var(--muted)] text-xs mt-0.5 line-clamp-1" style={{ fontFamily: "var(--font-jost)" }}>
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
            </li>
          ))}
        </ul>

        {query.trim().length < 2 && (
          <p className="px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase text-[var(--muted-light)]" style={{ fontFamily: "var(--font-jost)" }}>
            All works — {posts.length} {posts.length === 1 ? "work" : "works"}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
