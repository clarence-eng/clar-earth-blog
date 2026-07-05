"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Default dot cursor
function DotCursor() {
  return (
    <circle cx="0" cy="0" r="4" fill="#F8F5EF" />
  );
}

// Ladybug cursor — shown on hover
function LadybugCursor() {
  return (
    <g>
      {/* Body — red dome */}
      <ellipse cx="0" cy="1" rx="10" ry="9" fill="#C0392B" />
      {/* Head — black */}
      <ellipse cx="0" cy="-8" rx="6" ry="5" fill="#1a1a1a" />
      {/* Centre line */}
      <line x1="0" y1="-4" x2="0" y2="9" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Spots */}
      <circle cx="-4.5" cy="-1" r="2.2" fill="#1a1a1a" />
      <circle cx="4.5" cy="-1" r="2.2" fill="#1a1a1a" />
      <circle cx="-3.5" cy="5.5" r="1.8" fill="#1a1a1a" />
      <circle cx="3.5" cy="5.5" r="1.8" fill="#1a1a1a" />
      {/* Antennae */}
      <line x1="-3" y1="-12" x2="-6" y2="-18" stroke="#1a1a1a" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="3" y1="-12" x2="6" y2="-18" stroke="#1a1a1a" strokeWidth="0.9" strokeLinecap="round"/>
      <circle cx="-6" cy="-18" r="1.2" fill="#1a1a1a" />
      <circle cx="6" cy="-18" r="1.2" fill="#1a1a1a" />
    </g>
  );
}

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
      width={hovered ? 44 : 10}
      height={hovered ? 44 : 10}
      viewBox={hovered ? "-12 -22 24 28" : "-5 -5 10 10"}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      {hovered ? <LadybugCursor /> : <DotCursor />}
    </motion.svg>
  );
}
