"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedStanza({
  children,
  index,
  isFirst,
}: {
  children: string;
  index: number;
  isFirst: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const lines = children.split("\n");

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index < 3 ? index * 0.08 : 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-10 last:mb-0 leading-[2.05] whitespace-pre-line"
      style={{ fontFamily: "var(--font-cormorant)" }}
    >
      {isFirst && lines[0] ? (
        <>
          <span
            className="float-left mr-1 leading-[0.75] select-none"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "5.2rem",
              color: "var(--sage)",
              lineHeight: "0.78",
              marginTop: "0.12em",
              marginRight: "0.06em",
              fontWeight: 300,
            }}
          >
            {lines[0].charAt(0)}
          </span>
          {lines[0].slice(1)}
          {lines.length > 1 && "\n" + lines.slice(1).join("\n")}
        </>
      ) : (
        children
      )}
    </motion.p>
  );
}
