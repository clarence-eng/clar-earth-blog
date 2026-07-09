"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function FocusModeToggle() {
  const [focus, setFocus] = useState(false);
  const reducedMotion = useReducedMotion();

  // Sync initial state from DOM after commit (avoids reading stale class from previous page during render)
  useEffect(() => {
    setFocus(document.documentElement.classList.contains("focus-mode"));
  }, []);

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
      type="button"
      onClick={toggle}
      initial={reducedMotion !== false ? {} : { opacity: 0 }}
      animate={reducedMotion !== false ? {} : { opacity: 1 }}
      transition={reducedMotion !== false ? {} : { delay: 0.8 }}
      aria-pressed={focus}
      aria-label={focus ? "Exit focus mode" : "Focus mode"}
      className="post-action-btn"
      title={focus ? "Exit focus mode" : "Focus mode"}
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
