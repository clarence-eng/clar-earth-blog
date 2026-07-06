"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FocusModeToggle() {
  const [focus, setFocus] = useState(false);

  // Clean up focus-mode when navigating away
  useEffect(() => () => { document.documentElement.classList.remove("focus-mode"); }, []);

  const toggle = () => {
    setFocus(f => {
      const next = !f;
      if (next) document.documentElement.classList.add("focus-mode");
      else document.documentElement.classList.remove("focus-mode");
      return next;
    });
  };

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      aria-pressed={focus}
      className="flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--forest)] transition-colors"
      title={focus ? "Exit focus mode" : "Focus mode"}
      style={{ fontFamily: "var(--font-jost)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
    >
      {focus ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M8 3v3H5M21 8h-3V5M3 16h3v3M16 21v-3h3"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
      {focus ? "Exit" : "Focus"}
    </motion.button>
  );
}
