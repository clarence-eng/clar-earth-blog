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
  }, [cursorX, cursorY, visible]);

  return (
    <motion.svg
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y, translateX: "-50%", translateY: "-50%", overflow: "visible" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      viewBox="-14 -20 28 28"
      width={hovered ? 28 : 8}
      height={hovered ? 28 : 8}
    >
      {hovered ? (
        /* Minimalist ladybug — pure line art, no fill */
        <g stroke="#F8F5EF" fill="none" strokeLinecap="round">
          {/* Body outline */}
          <path d="M0 6 C-8 6 -11 0 -9 -6 C-7 -12 7 -12 9 -6 C11 0 8 6 0 6Z" strokeWidth="1.1"/>
          {/* Head */}
          <circle cx="0" cy="-13" r="4" strokeWidth="1"/>
          {/* Centre line */}
          <line x1="0" y1="-9" x2="0" y2="6" strokeWidth="0.8"/>
          {/* Two spots each side */}
          <circle cx="-4.5" cy="-4" r="1.5" strokeWidth="0.8"/>
          <circle cx="4.5" cy="-4" r="1.5" strokeWidth="0.8"/>
          <circle cx="-3" cy="2" r="1.2" strokeWidth="0.75"/>
          <circle cx="3" cy="2" r="1.2" strokeWidth="0.75"/>
          {/* Antennae */}
          <path d="M-2.5 -16 Q-5 -20 -7 -19" strokeWidth="0.8"/>
          <path d="M2.5 -16 Q5 -20 7 -19" strokeWidth="0.8"/>
        </g>
      ) : (
        /* Default — tiny dot */
        <circle cx="0" cy="0" r="3.5" fill="#F8F5EF" opacity="0.9"/>
      )}
    </motion.svg>
  );
}
