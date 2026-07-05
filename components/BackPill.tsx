"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackPill() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 320);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed bottom-7 right-7 z-40 ${show ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--forest)] text-white/90 hover:bg-[var(--forest-mid)] transition-colors shadow-lg"
        style={{ fontFamily: "var(--font-jost)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
      >
        <span>←</span>
        <span>All works</span>
      </Link>
    </motion.div>
  );
}
