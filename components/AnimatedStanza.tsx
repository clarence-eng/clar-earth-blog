"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StanzaProps {
  children: string;
  index: number;
  isFirst?: boolean;
  align?: "left" | "right" | "center";
  italic?: boolean;
}

// Render a line that may contain *italic* spans
function renderLine(line: string, key: number) {
  if (!line.includes("*")) return <span key={key}>{line}</span>;
  const parts = line.split(/(\*[^*]+\*)/g);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*")
          ? <em key={i}>{p.slice(1, -1)}</em>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

export default function AnimatedStanza({ children, index, align = "left", italic = false }: StanzaProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  const textAlign = align === "right" ? "right" : align === "center" ? "center" : "left";

  // Split into lines and render each with possible inline italics
  const lines = children.split("\n");

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index < 4 ? index * 0.07 : 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="poem-stanza"
      style={{ textAlign, fontStyle: italic ? "italic" : undefined }}
    >
      {lines.map((line, i) => (
        <span key={i}>
          {renderLine(line, i)}
          {i < lines.length - 1 && "\n"}
        </span>
      ))}
    </motion.p>
  );
}
