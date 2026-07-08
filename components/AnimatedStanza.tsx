"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { CSSProperties } from 'react';

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

export default function AnimatedStanza({ children, index, align = "left", italic = false, lang, isFirstDrop = false }: StanzaProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: "some" });

  const textAlign = align;
  const lines = children.split("\n").map(line =>
    italic ? line.replace(/^\*|\*$/g, "").trim() : line
  );

  const lineNodes = lines.map((line, i) => (
    <span key={i}>
      {italic ? line : renderLine(line, i)}
      {i < lines.length - 1 && "\n"}
    </span>
  ));

  const startsWithItalicMark = children.trimStart().startsWith("*");
  const suppressDrop = italic || align !== "left" || lang || startsWithItalicMark;

  const className = [
    "poem-stanza",
    suppressDrop ? "poem-stanza--no-drop" : "",
    isFirstDrop && !suppressDrop ? "poem-stanza--drop" : "",
  ].filter(Boolean).join(" ");

  const sharedProps = {
    ref,
    className,
    style: { textAlign, fontStyle: italic ? "italic" : undefined } as CSSProperties,
    lang,
  };

  return (
    <motion.p
      {...sharedProps}
      initial={reducedMotion === true ? {} : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : reducedMotion === true ? {} : { opacity: 0, y: 12 }}
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
