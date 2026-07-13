"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
interface StanzaProps {
  children: string;
  index: number;
  align?: "left" | "right" | "center";
  italic?: boolean;
  lang?: string;
  isFirstDrop?: boolean;
}

function renderLine(line: string, key: number) {
  if (!line.includes("*")) return <span key={key}>{line}</span>;
  // Split on balanced *...* pairs only. Lone asterisks (e.g. footnote markers) pass through as-is.
  const parts = line.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.length > 1 && p.startsWith("*") && p.endsWith("*")
          ? <em key={i}>{p.slice(1, -1)}</em>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

export default function AnimatedStanza({ children, index, align = "left", italic = false, lang, isFirstDrop = false }: StanzaProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });

  const stripped = italic ? children.replace(/^\*([\s\S]*)\*$/, '$1') : children;
  const lines = stripped.split("\n").map(line => italic ? line.trim() : line);

  const lineNodes = lines.map((line, i) => (
    <span key={i}>
      {italic ? line : renderLine(line, i)}
      {i < lines.length - 1 && "\n"}
    </span>
  ));

  const suppressDrop = italic || align !== "left" || !!lang || children.trimStart().startsWith("*");

  const className = [
    "poem-stanza",
    suppressDrop ? "poem-stanza--no-drop" : "",
    isFirstDrop && !suppressDrop ? "poem-stanza--drop" : "",
  ].filter(Boolean).join(" ");

  return (
    <motion.p
      ref={ref}
      className={className}
      style={{ textAlign: align, fontStyle: italic ? "italic" : undefined }}
      lang={lang}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: 0.55,
        delay: index < 3 ? index * 0.07 : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {lineNodes}
    </motion.p>
  );
}
