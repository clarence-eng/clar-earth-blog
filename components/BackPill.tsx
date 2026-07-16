"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackPill() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 320);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      aria-hidden={show ? undefined : true}
      className={`back-pill fixed right-5 z-40 ${show ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{ bottom: "max(1.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/"
        tabIndex={show ? 0 : -1}
        className="font-jost text-[12px] tracking-[0.15em] uppercase flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--forest)] text-white/90 hover:bg-[var(--forest-mid)] transition-colors duration-300 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2 focus-visible:rounded-full"
      >
        <span aria-hidden="true">←</span>
        <span>All works</span>
      </Link>
    </motion.div>
  );
}
