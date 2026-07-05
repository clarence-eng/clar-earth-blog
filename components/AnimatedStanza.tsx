"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StanzaProps {
  children: string;
  index: number;
  align?: "left" | "right" | "center";
  italic?: boolean;
}

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
  // Trigger once when 20% of the stanza enters the viewport
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const textAlign = align === "right" ? "right" : align === "center" ? "center" : "left";

  const lines = children.split("\n").map(line =>
    italic ? line.replace(/^\*|\*$/g, "").trim() : line
  );

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{
        duration: 0.6,
        delay: index < 3 ? index * 0.07 : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="poem-stanza"
      style={{ textAlign, fontStyle: italic ? "italic" : undefined }}
    >
      {lines.map((line, i) => (
        <span key={i}>
          {italic ? line : renderLine(line, i)}
          {i < lines.length - 1 && "\n"}
        </span>
      ))}
    </motion.p>
  );
}
