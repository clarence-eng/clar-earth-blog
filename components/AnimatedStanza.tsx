"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedStanza({
  children,
  index,
}: {
  children: string;
  index: number;
  isFirst: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index < 4 ? index * 0.07 : 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="poem-stanza"
    >
      {children}
    </motion.p>
  );
}
