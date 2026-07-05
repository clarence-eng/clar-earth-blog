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

// Fern frond — arching up from bottom-left, fully self-contained
function FernLeft() {
  return (
    <svg
      viewBox="0 0 260 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 h-full w-auto pointer-events-none select-none"
      style={{ opacity: 0.42 }}
      preserveAspectRatio="xMinYMax meet"
      aria-hidden="true"
    >
      {/* Rachis — main stem curving up-right */}
      <path d="M10 420 C20 370 40 320 65 272 C90 224 118 185 140 148 C162 112 175 80 172 48 C171 34 168 18 166 8"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>

      {/* Left pinnae (each curves away from rachis to the left) */}
      <path d="M40 345 Q18 330 8 310 Q2 296 10 288 Q18 280 30 290 Q42 302 40 345" stroke="white" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M66 300 Q42 282 34 260 Q28 244 38 238 Q48 232 60 244 Q72 258 66 300" stroke="white" strokeWidth="1.05" fill="none" strokeLinecap="round"/>
      <path d="M94 258 Q70 238 64 216 Q60 200 70 195 Q80 190 92 202 Q104 216 94 258" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M118 220 Q96 200 92 178 Q88 162 100 158 Q112 154 122 168 Q132 182 118 220" stroke="white" strokeWidth="0.95" fill="none" strokeLinecap="round"/>
      <path d="M138 186 Q120 168 118 148 Q116 132 128 130 Q140 128 148 142 Q156 158 138 186" stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M152 154 Q138 138 138 120 Q138 106 148 106 Q158 106 164 120 Q168 134 152 154" stroke="white" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
      <path d="M160 124 Q150 110 152 94 Q154 82 163 84 Q172 86 174 100 Q176 114 160 124" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/>

      {/* Right pinnae (mirror, curves right) */}
      <path d="M52 336 Q74 322 82 302 Q88 286 78 280 Q68 274 56 286 Q44 298 52 336" stroke="white" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M78 292 Q102 274 108 252 Q114 236 104 230 Q94 224 82 238 Q70 252 78 292" stroke="white" strokeWidth="1.05" fill="none" strokeLinecap="round"/>
      <path d="M106 250 Q130 230 134 208 Q138 192 128 188 Q118 184 108 198 Q98 214 106 250" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M128 212 Q150 194 152 174 Q154 158 144 156 Q134 154 126 170 Q118 186 128 212" stroke="white" strokeWidth="0.95" fill="none" strokeLinecap="round"/>
      <path d="M146 178 Q166 162 166 144 Q166 130 156 130 Q146 130 140 144 Q134 158 146 178" stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M158 148 Q176 134 174 118 Q172 104 162 106 Q152 108 148 122 Q144 136 158 148" stroke="white" strokeWidth="0.85" fill="none" strokeLinecap="round"/>

      {/* Fiddlehead curl at top */}
      <path d="M166 8 C168 0 176 -4 182 2 C188 8 184 18 176 20 C172 21 167 16 166 8"
        stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/>

      {/* Tiny leaf vein lines */}
      <line x1="10" y1="310" x2="26" y2="306" stroke="white" strokeWidth="0.4" opacity="0.6"/>
      <line x1="36" y1="260" x2="52" y2="252" stroke="white" strokeWidth="0.4" opacity="0.6"/>
      <line x1="66" y1="216" x2="80" y2="208" stroke="white" strokeWidth="0.35" opacity="0.55"/>
      <line x1="92" y1="180" x2="104" y2="172" stroke="white" strokeWidth="0.35" opacity="0.5"/>
    </svg>
  );
}

// Wild grasses + seed heads — right side, self-contained
function GrassRight() {
  return (
    <svg
      viewBox="0 0 260 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 right-0 h-full w-auto pointer-events-none select-none"
      style={{ opacity: 0.42 }}
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden="true"
    >
      {/* Grass blade 1 — tallest, gently leaning left */}
      <path d="M210 420 C208 375 200 328 192 280 C184 234 178 190 178 148 C178 108 182 72 180 38 C179 22 176 10 174 2"
        stroke="white" strokeWidth="1.7" strokeLinecap="round" fill="none"/>

      {/* Blade 2 */}
      <path d="M230 420 C228 380 220 336 214 292 C208 250 204 208 206 170 C208 134 214 104 212 72 C211 56 208 42 206 28"
        stroke="white" strokeWidth="1.55" strokeLinecap="round" fill="none"/>

      {/* Blade 3 */}
      <path d="M248 420 C247 384 242 344 238 304 C234 266 232 228 235 194 C238 162 244 136 242 108 C241 94 238 82 236 68"
        stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/>

      {/* Blade 4 — shorter */}
      <path d="M188 420 C188 390 184 356 178 322 C172 290 168 258 170 228 C172 200 178 178 176 154"
        stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>

      {/* Blade 5 — shortest */}
      <path d="M260 420 C258 398 254 372 252 346 C250 320 250 296 253 272 C256 250 262 234 260 214"
        stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none"/>

      {/* Seed head on blade 1 — drooping panicle branches */}
      <path d="M174 2 C168 -6 158 -8 152 -2" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M174 2 C172 -8 168 -14 165 -18" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M174 2 C180 -6 188 -10 192 -4" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <ellipse cx="152" cy="-4" rx="4" ry="6" stroke="white" strokeWidth="0.9" fill="none"/>
      <ellipse cx="165" cy="-20" rx="3.5" ry="5.5" stroke="white" strokeWidth="0.9" fill="none"/>
      <ellipse cx="192" cy="-6" rx="4" ry="6" stroke="white" strokeWidth="0.9" fill="none"/>
      <ellipse cx="174" cy="10" rx="3" ry="5" stroke="white" strokeWidth="0.85" fill="none"/>

      {/* Seed head on blade 2 */}
      <path d="M206 28 C200 18 192 14 186 20" stroke="white" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
      <path d="M206 28 C204 18 200 12 198 8" stroke="white" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
      <path d="M206 28 C212 18 220 14 222 20" stroke="white" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
      <ellipse cx="186" cy="18" rx="3.5" ry="5" stroke="white" strokeWidth="0.8" fill="none"/>
      <ellipse cx="198" cy="6" rx="3" ry="5" stroke="white" strokeWidth="0.8" fill="none"/>
      <ellipse cx="222" cy="18" rx="3.5" ry="5" stroke="white" strokeWidth="0.8" fill="none"/>

      {/* Small wildflower on blade 4 */}
      <path d="M176 154 C172 144 166 138 160 134" stroke="white" strokeWidth="0.85" strokeLinecap="round" fill="none"/>
      {/* 5 petals — simple open flower */}
      <path d="M160 134 C155 126 150 120 152 114 C154 108 161 109 161 116 C161 122 158 128 160 134" stroke="white" strokeWidth="0.75" fill="none"/>
      <path d="M160 134 C166 128 172 124 176 127 C180 130 178 137 172 136 C167 135 163 133 160 134" stroke="white" strokeWidth="0.75" fill="none"/>
      <path d="M160 134 C158 141 156 148 152 150 C148 152 146 146 149 143 C152 140 156 139 160 134" stroke="white" strokeWidth="0.75" fill="none"/>
      <path d="M160 134 C154 140 148 140 146 136 C144 132 147 127 151 129 C155 131 157 133 160 134" stroke="white" strokeWidth="0.75" fill="none"/>
      <path d="M160 134 C157 127 158 120 162 117 C166 114 169 118 167 123 C165 128 162 131 160 134" stroke="white" strokeWidth="0.75" fill="none"/>
      <circle cx="160" cy="134" r="3.5" stroke="white" strokeWidth="1" fill="none"/>

      {/* Fine base crossing stems */}
      <path d="M180 420 C200 412 222 408 248 406" stroke="white" strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.55"/>
      <path d="M190 420 C212 414 234 410 258 408" stroke="white" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.45"/>
    </svg>
  );
}

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
        {/* Fern — left edge, always visible */}
        <FernLeft />

        {/* Grasses — right edge, always visible */}
        <GrassRight />

        {/* Scattered pollen dots */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {([
              [32, 14], [45, 28], [38, 42],
              [92, 8], [88, 22], [94, 36],
              [50, 52], [60, 18], [55, 64],
              [72, 42], [78, 26], [68, 58],
            ] as [number, number][]).map(([cx, cy], i) => (
              <circle
                key={i}
                cx={`${cx}%`} cy={`${cy}%`}
                r={i % 3 === 0 ? "2" : "1.3"}
                fill="white"
                opacity={i % 3 === 0 ? "0.22" : "0.15"}
              />
            ))}
          </svg>
        </div>

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
