"use client";

import { useEffect, useRef } from "react";
import type { PostType } from "@/lib/posts";

interface PrintButtonProps {
  title: string;
  type: PostType;
}

export default function PrintButton({ title, type }: PrintButtonProps) {
  const restoreRef = useRef<(() => void) | null>(null);

  useEffect(() => () => { restoreRef.current?.(); }, []);

  const handlePrint = () => {
    if (restoreRef.current) return; // prevent re-entry while print dialog is open
    const prev = document.title;
    document.title = `${title} — clar.earth`;
    const restore = () => {
      document.title = prev;
      window.removeEventListener("afterprint", restore);
      window.removeEventListener("focus", restore);
      restoreRef.current = null;
    };
    restoreRef.current = restore;
    window.addEventListener("afterprint", restore, { once: true });
    window.addEventListener("focus", restore, { once: true });
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="post-action-btn"
      title={`Print ${type}`}
      aria-label={`Print ${type}`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <polyline points="6,9 6,2 18,2 18,9"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print
    </button>
  );
}
