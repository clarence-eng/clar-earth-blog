"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 30, stiffness: 240, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [role=button], label"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <motion.svg
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y, translateX: "-50%", translateY: "-50%", overflow: "visible" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      viewBox={hovered ? "-16 -26 32 34" : "-5 -5 10 10"}
      width={hovered ? 48 : 10}
      height={hovered ? 48 : 10}
    >
      {hovered ? (
        /* Ladybug — elegant outline, white on hover */
        <g stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <path d="M0 7 C-10 7 -13 0 -11 -7 C-9 -14 9 -14 11 -7 C13 0 10 7 0 7Z" strokeWidth="1.4"/>
          {/* Head */}
          <circle cx="0" cy="-16" r="5" strokeWidth="1.3"/>
          {/* Dividing line */}
          <line x1="0" y1="-10" x2="0" y2="7" strokeWidth="1"/>
          {/* Spots — 2 each side */}
          <circle cx="-5" cy="-5" r="2" strokeWidth="1"/>
          <circle cx="5" cy="-5" r="2" strokeWidth="1"/>
          <circle cx="-4" cy="2" r="1.6" strokeWidth="0.9"/>
          <circle cx="4" cy="2" r="1.6" strokeWidth="0.9"/>
          {/* Antennae */}
          <path d="M-3 -20 Q-6 -25 -8 -24" strokeWidth="1"/>
          <path d="M3 -20 Q6 -25 8 -24" strokeWidth="1"/>
        </g>
      ) : (
        /* Default dot — dark forest green, visible on cream background */
        <circle cx="0" cy="0" r="4" fill="#2D4A3E" opacity="0.85"/>
      )}
    </motion.svg>
  );
}
