"use client";

import { motion } from "framer-motion";

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
  const textAlign = align === "right" ? "right" : align === "center" ? "center" : "left";

  // Strip *asterisks* when whole stanza is italic — avoid double-wrapping
  const lines = children.split("\n").map(line =>
    italic ? line.replace(/^\*|\*$/g, "").trim() : line
  );

  // Simple stagger-in on page load — NO useInView, which leaves off-screen stanzas invisible
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        // First 6 stanzas stagger; rest appear together immediately after
        delay: index < 6 ? 0.05 + index * 0.06 : 0.4,
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
