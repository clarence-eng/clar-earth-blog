"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function getSeasonalGradient() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "linear-gradient(160deg, #2D4A3E 0%, #3D6154 40%, #4A7A5A 70%, #2A3D34 100%)";
  if (month >= 5 && month <= 7) return "linear-gradient(160deg, #3A4A2A 0%, #4A5E2A 40%, #5A6E38 65%, #2A3D1A 100%)";
  if (month >= 8 && month <= 10) return "linear-gradient(160deg, #4A3A1A 0%, #5A4A2A 40%, #6A5A3A 65%, #3A2A1A 100%)";
  return "linear-gradient(160deg, #1A2D3A 0%, #2A3D4A 40%, #1E3440 65%, #121E28 100%)";
}

const MARQUEE_TEXT = "A Promise to Protect What Cannot Speak  ·  Daughter of the Tides  ·  Embers  ·  Like Moth to Flame  ·  My Every Sense of You  ·  Nature's Choir  ·  Out of Time  ·  The Glass Between Us  ·  回声  ·  ";

export default function HeroSection() {
  const [gradient, setGradient] = useState(
    "linear-gradient(160deg, #2D4A3E 0%, #3D6154 40%, #4A7A5A 70%, #2A3D34 100%)"
  );
  useEffect(() => { setGradient(getSeasonalGradient()); }, []);

  return (
    <>
      <section
        className="relative overflow-hidden min-h-[56vh] flex items-center"
        style={{ background: gradient }}
      >
        {/* ── Typographic ornamental corners ───────────────────── */}
        {/* These use Unicode/font characters — always crisp, never doodly */}

        {/* Top-left ornament */}
        <div
          className="absolute top-8 left-8 pointer-events-none select-none leading-none hidden sm:block"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "white",
            opacity: 0.13,
            lineHeight: 1,
            fontStyle: "italic",
            fontWeight: 300,
            letterSpacing: "-0.03em",
          }}
          aria-hidden="true"
        >
          ❧
        </div>

        {/* Top-right ornament — mirrored */}
        <div
          className="absolute top-8 right-8 pointer-events-none select-none leading-none hidden sm:block"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "white",
            opacity: 0.13,
            lineHeight: 1,
            fontStyle: "italic",
            fontWeight: 300,
            transform: "scaleX(-1)",
          }}
          aria-hidden="true"
        >
          ❧
        </div>

        {/* Bottom-left — smaller */}
        <div
          className="absolute bottom-16 left-6 pointer-events-none select-none hidden md:block"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            color: "white",
            opacity: 0.1,
            lineHeight: 1,
            transform: "rotate(20deg)",
          }}
          aria-hidden="true"
        >
          ✿
        </div>

        {/* Bottom-right — smaller */}
        <div
          className="absolute bottom-16 right-6 pointer-events-none select-none hidden md:block"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            color: "white",
            opacity: 0.1,
            lineHeight: 1,
            transform: "rotate(-20deg)",
          }}
          aria-hidden="true"
        >
          ✿
        </div>

        {/* Thin rule top and bottom inside section */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10 pointer-events-none" />

        {/* Subtle scattered dots */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" aria-hidden="true">
          {([
            ["22%","18%",1.4,0.18],["30%","38%",1,0.12],["18%","62%",1.2,0.14],
            ["78%","18%",1.4,0.18],["70%","38%",1,0.12],["82%","62%",1.2,0.14],
            ["50%","9%",1.2,0.13],["42%","72%",0.9,0.1],["58%","72%",0.9,0.1],
          ] as [string,string,number,number][]).map(([cx,cy,r,o],i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={o}/>
          ))}
        </svg>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 56 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
            <path d="M0,56 C360,0 1080,0 1440,56 L1440,56 L0,56 Z" fill="var(--cream)" />
          </svg>
        </div>

        {/* Quote */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 pt-28 pb-20 text-center">
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

      {/* Marquee */}
      <div className="w-full overflow-hidden border-y border-[var(--border)] py-2.5" style={{ background: "var(--cream-dark)" }}>
        <div className="marquee-track">
          <span className="marquee-content">{MARQUEE_TEXT.repeat(5)}</span>
          <span className="marquee-content" aria-hidden="true">{MARQUEE_TEXT.repeat(5)}</span>
        </div>
      </div>
    </>
  );
}
