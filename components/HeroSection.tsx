"use client";

import { motion } from "framer-motion";
import BotanicalAccent from "./BotanicalAccent";

export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-[38vh] flex items-end px-8 pb-12 pt-24">
      {/* Large background botanical — faint */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-12 opacity-[0.12] pointer-events-none select-none">
        <BotanicalAccent className="w-72 h-96 text-white" />
      </div>

      {/* Second smaller botanical — bottom left corner */}
      <div className="absolute left-8 bottom-0 opacity-[0.08] pointer-events-none select-none rotate-180">
        <BotanicalAccent className="w-28 h-36 text-white" />
      </div>

      {/* Organic bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8"
        style={{
          background: "var(--cream)",
          clipPath: "ellipse(55% 100% at 50% 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          CLAR.EARTH
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/90 leading-[1.25] mb-5"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 300,
          }}
        >
          &ldquo;In the shadow of trees,<br className="hidden sm:block" />
          I find my voice.&rdquo;
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/40 text-sm italic"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Where the earth listens, and the pen replies.
        </motion.p>
      </div>
    </section>
  );
}
