"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
      // Derive hover from target — single event, no extra listeners
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [role=button], label"));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY, visible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        opacity: visible ? 1 : 0,
        width: hovered ? 36 : 10,
        height: hovered ? 36 : 10,
        background: hovered ? "transparent" : "#F8F5EF",
        border: hovered ? "1.5px solid #F8F5EF" : "1.5px solid transparent",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}
