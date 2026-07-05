"use client";

import { motion } from "framer-motion";
import BotanicalAccent from "./BotanicalAccent";

// Seasonal gradient — computed server-side, no hydration cost
function getSeasonalGradient() {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) {
    // Spring: soft moss + sage
    return "linear-gradient(160deg, #2D4A3E 0%, #3D6154 40%, #4A7A5A 70%, #2A3D34 100%)";
  } else if (month >= 5 && month <= 7) {
    // Summer: warm gold-green
    return "linear-gradient(160deg, #3A4A2A 0%, #4A5E2A 40%, #5A6E38 65%, #2A3D1A 100%)";
  } else if (month >= 8 && month <= 10) {
    // Autumn: amber-forest
    return "linear-gradient(160deg, #4A3A1A 0%, #5A4A2A 40%, #6A5A3A 65%, #3A2A1A 100%)";
  } else {
    // Winter: deep blue-green
    return "linear-gradient(160deg, #1A2D3A 0%, #2A3D4A 40%, #1E3440 65%, #121E28 100%)";
  }
}

const MARQUEE_TEXT = "poetry · nature · earth · clar.earth · in the shadow of trees · where the pen replies · ";

export default function HeroSection() {
  const gradient = getSeasonalGradient();

  return (
    <>
      <section
        className="relative overflow-hidden min-h-[54vh] flex items-center"
        style={{ background: gradient }}
      >
        {/* Parallax botanical accents */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] flex items-center justify-end pr-8 opacity-[0.11] pointer-events-none select-none">
          <BotanicalAccent className="w-80 h-[440px] text-white" />
        </div>
        <div className="absolute left-10 bottom-4 opacity-[0.07] rotate-[170deg] pointer-events-none select-none">
          <BotanicalAccent className="w-24 h-32 text-white" />
        </div>

        {/* Scattered dots */}
        <svg className="absolute top-12 right-[35%] opacity-[0.09] pointer-events-none" width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="white"/></svg>
        <svg className="absolute top-28 right-[28%] opacity-[0.06] pointer-events-none" width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="white"/></svg>
        <svg className="absolute bottom-20 left-[30%] opacity-[0.07] pointer-events-none" width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2.5" fill="white"/></svg>

        {/* Bottom wave */}
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

      {/* Marquee strip */}
      <div
        className="w-full overflow-hidden border-y border-[var(--border)] py-2.5"
        style={{ background: "var(--cream-dark)" }}
      >
        <div className="marquee-track flex whitespace-nowrap">
          {/* Duplicate for seamless loop */}
          <span className="marquee-content">
            {Array(4).fill(MARQUEE_TEXT).join("")}
          </span>
          <span className="marquee-content" aria-hidden="true">
            {Array(4).fill(MARQUEE_TEXT).join("")}
          </span>
        </div>
      </div>
    </>
  );
}
