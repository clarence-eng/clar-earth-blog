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
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-white/85 leading-[1.45]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            fontWeight: 300,
          }}
        >
          &ldquo;In the shadow of trees, I find my voice.
          <br />
          Where the earth listens, and the pen replies.&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
