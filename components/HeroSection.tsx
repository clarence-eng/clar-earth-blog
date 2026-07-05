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

// Phosphor flower-lotus path (256×256)
const LOTUS_PATH = "M245.83,121.63a15.53,15.53,0,0,0-9.52-7.33,73.51,73.51,0,0,0-22.17-2.22c4-19.85,1-35.55-2.06-44.86a16.15,16.15,0,0,0-18.79-10.88,85.53,85.53,0,0,0-28.55,12.12,94.58,94.58,0,0,0-27.11-33.25,16.05,16.05,0,0,0-19.26,0A94.48,94.48,0,0,0,91.26,68.46,85.53,85.53,0,0,0,62.71,56.34,16.15,16.15,0,0,0,43.92,67.22c-3,9.31-6,25-2.06,44.86a73.51,73.51,0,0,0-22.17,2.22,15.53,15.53,0,0,0-9.52,7.33,16,16,0,0,0-1.6,12.27c3.39,12.57,13.8,36.48,45.33,55.32S113.13,208,128.05,208s42.67,0,74-18.78c31.53-18.84,41.94-42.75,45.33-55.32A16,16,0,0,0,245.83,121.63Z";

// Phosphor flower-tulip path (256×256)
const TULIP_PATH = "M208,48a87.48,87.48,0,0,0-35.36,7.43c-15.1-25.37-39.92-38-41.06-38.59a8,8,0,0,0-7.16,0c-1.14.58-26,13.22-41.06,38.59A87.48,87.48,0,0,0,48,48a8,8,0,0,0-8,8V96a88.11,88.11,0,0,0,80,87.63v35.43L83.58,200.84a8,8,0,1,0-7.16,14.32l48,24a8,8,0,0,0,7.16,0l48-24a8,8,0,0,0-7.16-14.32L136,219.06V183.63A88.11,88.11,0,0,0,216,96V56A8,8,0,0,0,208,48ZM120,167.56A72.1,72.1,0,0,1,56,96V64.44A72.1,72.1,0,0,1,120,136Zm8-68.2A88.4,88.4,0,0,0,97.36,63.19c9.57-15.79,24-25.9,30.64-30,6.65,4.08,21.08,14.19,30.64,30A88.46,88.46,0,0,0,128,99.36ZM200,96a72.1,72.1,0,0,1-64,71.56V136a72.1,72.1,0,0,1,64-71.56Z";

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
        {/* ── LEFT: lotus flower, bottom-left, thin stroke only ── */}
        <svg
          viewBox="0 0 256 256"
          className="absolute bottom-0 left-0 pointer-events-none select-none"
          style={{
            width: "clamp(200px, 24vw, 320px)",
            opacity: 0.28,
            transform: "translate(-8%, 22%) rotate(-12deg)",
          }}
          fill="none"
          stroke="white"
          strokeWidth="4"
          aria-hidden="true"
        >
          <path d={LOTUS_PATH} strokeLinejoin="round"/>
        </svg>

        {/* ── RIGHT: tulip, bottom-right, thin stroke ── */}
        <svg
          viewBox="0 0 256 256"
          className="absolute bottom-0 right-0 pointer-events-none select-none"
          style={{
            width: "clamp(200px, 24vw, 320px)",
            opacity: 0.28,
            transform: "translate(8%, 14%) rotate(8deg)",
          }}
          fill="none"
          stroke="white"
          strokeWidth="4"
          aria-hidden="true"
        >
          <path d={TULIP_PATH} strokeLinejoin="round"/>
        </svg>

        {/* ── Small lotus top-right, very faint ── */}
        <svg
          viewBox="0 0 256 256"
          className="absolute top-0 right-0 pointer-events-none select-none hidden md:block"
          style={{
            width: "clamp(80px, 10vw, 130px)",
            opacity: 0.13,
            transform: "translate(15%, -20%) rotate(20deg)",
          }}
          fill="none"
          stroke="white"
          strokeWidth="5"
          aria-hidden="true"
        >
          <path d={LOTUS_PATH} strokeLinejoin="round"/>
        </svg>

        {/* ── Small tulip top-left, very faint ── */}
        <svg
          viewBox="0 0 256 256"
          className="absolute top-0 left-0 pointer-events-none select-none hidden md:block"
          style={{
            width: "clamp(80px, 10vw, 130px)",
            opacity: 0.13,
            transform: "translate(-15%, -20%) rotate(-20deg)",
          }}
          fill="none"
          stroke="white"
          strokeWidth="5"
          aria-hidden="true"
        >
          <path d={TULIP_PATH} strokeLinejoin="round"/>
        </svg>

        {/* Subtle pollen dots */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" aria-hidden="true">
          {([
            ["38%","14%",1.6,0.2],["44%","28%",1,0.14],["56%","14%",1.6,0.2],
            ["62%","28%",1,0.14],["50%","8%",1.4,0.14],["32%","55%",1.2,0.13],
            ["68%","55%",1.2,0.13],
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
