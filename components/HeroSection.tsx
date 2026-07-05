"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BotanicalAccent from "./BotanicalAccent";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="hero-gradient relative overflow-hidden min-h-[52vh] flex items-center">
      {/* Parallax content */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 flex items-center pointer-events-none select-none">
        {/* Large botanical right */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] flex items-center justify-end pr-8 opacity-[0.13]">
          <BotanicalAccent className="w-80 h-[440px] text-white" />
        </div>
        {/* Small botanical bottom-left, inverted */}
        <div className="absolute left-10 bottom-4 opacity-[0.07] rotate-[170deg]">
          <BotanicalAccent className="w-24 h-32 text-[var(--sage-light)]" />
        </div>
        {/* Scattered leaf dots */}
        <svg className="absolute top-12 right-[35%] opacity-10" width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="white"/></svg>
        <svg className="absolute top-28 right-[28%] opacity-[0.07]" width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="white"/></svg>
        <svg className="absolute bottom-16 right-[55%] opacity-[0.08]" width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2.5" fill="white"/></svg>
      </motion.div>

      {/* Organic bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 56 }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
          <path d="M0,56 C360,0 1080,0 1440,56 L1440,56 L0,56 Z" fill="var(--cream)" />
        </svg>
      </div>

      {/* Quote */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pt-28 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <blockquote
            className="text-white/88 leading-[1.5] mx-auto"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.55rem, 3.2vw, 2.5rem)",
              maxWidth: "780px",
            }}
          >
            &ldquo;In the shadow of trees, I find my voice.
            <br className="hidden sm:block" />{" "}
            Where the earth listens, and the pen replies.&rdquo;
          </blockquote>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mx-auto mt-7 h-px bg-white/20 origin-center"
            style={{ maxWidth: 120 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
