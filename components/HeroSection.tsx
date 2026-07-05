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
          {/* ── LEFT SIDE: concentric arcs + radiating lines (like a pressed bloom) ── */}
          <g opacity="0.18" stroke="white" fill="none">
            {/* Concentric partial circles — top-left corner bloom */}
            <circle cx="80" cy="80" r="55" strokeWidth="0.6"/>
            <circle cx="80" cy="80" r="90" strokeWidth="0.5"/>
            <circle cx="80" cy="80" r="128" strokeWidth="0.4"/>
            <circle cx="80" cy="80" r="168" strokeWidth="0.35"/>
            {/* Radiating spokes from same centre */}
            {[0,22,45,68,90,112,135,158,180,202,225,248,270,292,315,338].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={80 + 40 * Math.cos(rad)}
                  y1={80 + 40 * Math.sin(rad)}
                  x2={80 + 180 * Math.cos(rad)}
                  y2={80 + 180 * Math.sin(rad)}
                  strokeWidth="0.4"
                />
              );
            })}
            {/* Small centre dot cluster */}
            <circle cx="80" cy="80" r="3" strokeWidth="0.8"/>
            <circle cx="80" cy="80" r="8" strokeWidth="0.5"/>
          </g>

          {/* ── RIGHT SIDE: matching concentric arcs — top-right ── */}
          <g opacity="0.18" stroke="white" fill="none">
            <circle cx="1360" cy="80" r="55" strokeWidth="0.6"/>
            <circle cx="1360" cy="80" r="90" strokeWidth="0.5"/>
            <circle cx="1360" cy="80" r="128" strokeWidth="0.4"/>
            <circle cx="1360" cy="80" r="168" strokeWidth="0.35"/>
            {[0,22,45,68,90,112,135,158,180,202,225,248,270,292,315,338].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={1360 + 40 * Math.cos(rad)}
                  y1={80 + 40 * Math.sin(rad)}
                  x2={1360 + 180 * Math.cos(rad)}
                  y2={80 + 180 * Math.sin(rad)}
                  strokeWidth="0.4"
                />
              );
            })}
            <circle cx="1360" cy="80" r="3" strokeWidth="0.8"/>
            <circle cx="1360" cy="80" r="8" strokeWidth="0.5"/>
          </g>

          {/* ── BOTTOM-LEFT: small secondary bloom ── */}
          <g opacity="0.12" stroke="white" fill="none">
            <circle cx="200" cy="370" r="40" strokeWidth="0.5"/>
            <circle cx="200" cy="370" r="65" strokeWidth="0.4"/>
            <circle cx="200" cy="370" r="92" strokeWidth="0.3"/>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={200 + 28 * Math.cos(rad)}
                  y1={370 + 28 * Math.sin(rad)}
                  x2={200 + 100 * Math.cos(rad)}
                  y2={370 + 100 * Math.sin(rad)}
                  strokeWidth="0.35"
                />
              );
            })}
          </g>

          {/* ── BOTTOM-RIGHT: small secondary bloom ── */}
          <g opacity="0.12" stroke="white" fill="none">
            <circle cx="1240" cy="370" r="40" strokeWidth="0.5"/>
            <circle cx="1240" cy="370" r="65" strokeWidth="0.4"/>
            <circle cx="1240" cy="370" r="92" strokeWidth="0.3"/>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={1240 + 28 * Math.cos(rad)}
                  y1={370 + 28 * Math.sin(rad)}
                  x2={1240 + 100 * Math.cos(rad)}
                  y2={370 + 100 * Math.sin(rad)}
                  strokeWidth="0.35"
                />
              );
            })}
          </g>

          {/* ── Scattered fine dots — depth and texture ── */}
          {[
            [320, 55, 1.2, 0.25], [420, 140, 0.8, 0.2], [150, 220, 1, 0.18],
            [1120, 55, 1.2, 0.25], [1020, 140, 0.8, 0.2], [1290, 220, 1, 0.18],
            [580, 320, 0.9, 0.15], [860, 320, 0.9, 0.15],
            [720, 50, 1, 0.12], [680, 340, 0.7, 0.12],
            [480, 240, 0.7, 0.13], [960, 240, 0.7, 0.13],
          ].map(([cx, cy, r, o], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={o}/>
          ))}

          {/* ── Very faint long horizontal lines — like ruled parchment ── */}
          <line x1="0" y1="130" x2="1440" y2="130" stroke="white" strokeWidth="0.25" opacity="0.06"/>
          <line x1="0" y1="260" x2="1440" y2="260" stroke="white" strokeWidth="0.2" opacity="0.05"/>
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
