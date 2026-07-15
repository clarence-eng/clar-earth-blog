"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type React from "react";
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
  // Match single *...* pairs: opening * not followed by *, closing * not preceded by *.
  // Achieved without lookbehind (Safari 14 compat) by capturing the char before/after:
  // we split on runs of consecutive *s first to identify italics vs bold markers.
  const parts: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "*") {
      // Count consecutive asterisks
      let j = i;
      while (j < line.length && line[j] === "*") j++;
      const stars = j - i;
      if (stars === 1) {
        // Single asterisk — find the closing single asterisk
        const close = (() => {
          let k = j;
          while (k < line.length) {
            if (line[k] === "*") {
              const s2 = k; let m = k; while (m < line.length && line[m] === "*") m++;
              if (m - s2 === 1) return s2;
              k = m;
            } else k++;
          }
          return -1;
        })();
        if (close > j) {
          const content = line.slice(j, close);
          // Don't italicise whitespace-only content (e.g. "* *") — CommonMark disallows
          // a left-flanking delimiter immediately followed by whitespace
          if (content.trim().length > 0) {
            parts.push(line.slice(i, j), content, line.slice(close, close + 1));
            i = close + 1;
            continue;
          }
        }
      }
      parts.push(line.slice(i, j));
      i = j;
    } else {
      let j = i;
      while (j < line.length && line[j] !== "*") j++;
      parts.push(line.slice(i, j));
      i = j;
    }
  }
  const nodes: React.ReactNode[] = [];
  let idx = 0;
  while (idx < parts.length) {
    const p = parts[idx];
    if (p === "*" && idx + 2 < parts.length && parts[idx + 2] === "*") {
      nodes.push(<em key={idx}>{parts[idx + 1]}</em>);
      idx += 3;
    } else {
      nodes.push(<span key={idx}>{p}</span>);
      idx++;
    }
  }
  return <span key={key}>{nodes}</span>;
}

export default function AnimatedStanza({ children, index, align = "left", italic = false, lang, isFirstDrop = false }: StanzaProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });

  // Strip italic wrapper: block starts with exactly one * and ends with exactly one *.
  // Regex avoids lookbehind (Safari 14 compat): match *<non-star><content><non-star>*
  const stripped = italic
    ? children.replace(/^\*([^*][\s\S]*[^*])\*$|^\*([^*])\*$/, (_m, a, b) => a ?? b)
    : children;
  const lines = stripped.split("\n").map(line => italic ? line.trim() : line);

  const lineNodes = lines.map((line, i) => (
    <span key={i}>
      {italic ? line : renderLine(line, i)}
      {i < lines.length - 1 && "\n"}
    </span>
  ));

  const suppressDrop = italic || align !== "left" || lang || /^[\s]*[*\d]/.test(children);

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
        delay: Math.min(index, 4) * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {lineNodes}
    </motion.p>
  );
}
