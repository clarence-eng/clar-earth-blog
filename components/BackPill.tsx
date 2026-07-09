"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackPill() {
  const [show, setShow] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 320);
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // evaluate initial position
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion !== true ? 10 : 0 }}
      animate={{ opacity: show ? 1 : 0, y: reducedMotion !== true ? (show ? 0 : 10) : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      aria-hidden={show ? undefined : true}
      className={`back-pill fixed bottom-7 right-7 z-40 ${show ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <Link
        href="/"
        tabIndex={show ? 0 : -1}
        className="nav-action-label flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--forest)] text-white/90 hover:bg-[var(--forest-mid)] transition-colors duration-300 shadow-lg"
      >
        <span aria-hidden="true">←</span>
        <span>All works</span>
      </Link>
    </motion.div>
  );
}
