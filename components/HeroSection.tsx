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
        {/* ── Decorative elements ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* ── LEFT bloom — centred at 180,200 so it's fully visible ── */}
          <g stroke="white" fill="none">
            <circle cx="180" cy="200" r="60"  strokeWidth="0.9" opacity="0.22"/>
            <circle cx="180" cy="200" r="100" strokeWidth="0.75" opacity="0.18"/>
            <circle cx="180" cy="200" r="145" strokeWidth="0.6" opacity="0.14"/>
            <circle cx="180" cy="200" r="195" strokeWidth="0.5" opacity="0.1"/>
            {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return <line key={i}
                x1={180 + 44 * Math.cos(rad)} y1={200 + 44 * Math.sin(rad)}
                x2={180 + 200 * Math.cos(rad)} y2={200 + 200 * Math.sin(rad)}
                strokeWidth="0.6" opacity="0.18"/>
            })}
            <circle cx="180" cy="200" r="4"  strokeWidth="1.2" opacity="0.35"/>
            <circle cx="180" cy="200" r="14" strokeWidth="0.8" opacity="0.28"/>
            <circle cx="180" cy="200" r="28" strokeWidth="0.7" opacity="0.22"/>
          </g>

          {/* ── RIGHT bloom — centred at 1260,200 ── */}
          <g stroke="white" fill="none">
            <circle cx="1260" cy="200" r="60"  strokeWidth="0.9" opacity="0.22"/>
            <circle cx="1260" cy="200" r="100" strokeWidth="0.75" opacity="0.18"/>
            <circle cx="1260" cy="200" r="145" strokeWidth="0.6" opacity="0.14"/>
            <circle cx="1260" cy="200" r="195" strokeWidth="0.5" opacity="0.1"/>
            {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return <line key={i}
                x1={1260 + 44 * Math.cos(rad)} y1={200 + 44 * Math.sin(rad)}
                x2={1260 + 200 * Math.cos(rad)} y2={200 + 200 * Math.sin(rad)}
                strokeWidth="0.6" opacity="0.18"/>
            })}
            <circle cx="1260" cy="200" r="4"  strokeWidth="1.2" opacity="0.35"/>
            <circle cx="1260" cy="200" r="14" strokeWidth="0.8" opacity="0.28"/>
            <circle cx="1260" cy="200" r="28" strokeWidth="0.7" opacity="0.22"/>
          </g>

          {/* ── Scattered dots ── */}
          {([
            [420, 70, 1.8, 0.32], [380, 170, 1.2, 0.24], [520, 290, 1.4, 0.22],
            [1020, 70, 1.8, 0.32], [1060, 170, 1.2, 0.24], [920, 290, 1.4, 0.22],
            [680, 40, 1.5, 0.2], [760, 360, 1.3, 0.18], [720, 200, 1, 0.12],
          ] as [number,number,number,number][]).map(([cx, cy, r, o], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={o}/>
          ))}

          {/* ── Faint horizontal rules ── */}
          <line x1="0" y1="133" x2="1440" y2="133" stroke="white" strokeWidth="0.4" opacity="0.08"/>
          <line x1="0" y1="267" x2="1440" y2="267" stroke="white" strokeWidth="0.3" opacity="0.06"/>
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
