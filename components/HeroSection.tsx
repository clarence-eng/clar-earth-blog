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
          viewBox="0 0 1440 420"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* ═══════════════════════════════════════════════════
              LEFT SIDE — Large fern frond arching inward
          ═══════════════════════════════════════════════════ */}
          <g stroke="white" fill="none" opacity="0.38">
            {/* Main fern rachis — elegant arch from bottom-left upward */}
            <path d="M-10 440 C20 380 60 310 100 250 C140 190 175 150 200 110 C220 78 230 50 225 20"
              strokeWidth="1.6" strokeLinecap="round"/>

            {/* Fern pinnae — paired leaflets, left side of rachis */}
            <path d="M50 335 C34 322 18 305 14 288 C10 271 22 264 34 272 C46 280 50 305 50 335"
              strokeWidth="1" strokeLinecap="round"/>
            <path d="M80 295 C60 280 42 260 40 242 C38 224 52 218 64 228 C76 238 80 265 80 295"
              strokeWidth="0.95" strokeLinecap="round"/>
            <path d="M112 258 C92 242 76 220 76 202 C76 184 90 180 102 190 C114 200 116 228 112 258"
              strokeWidth="0.9" strokeLinecap="round"/>
            <path d="M142 222 C124 206 112 184 114 166 C116 148 130 146 140 158 C150 170 148 196 142 222"
              strokeWidth="0.85" strokeLinecap="round"/>
            <path d="M166 190 C152 174 144 152 148 136 C152 120 164 120 172 132 C180 144 176 168 166 190"
              strokeWidth="0.8" strokeLinecap="round"/>
            <path d="M186 160 C174 146 170 126 175 112 C180 98 192 100 198 112 C204 124 198 144 186 160"
              strokeWidth="0.75" strokeLinecap="round"/>
            <path d="M202 132 C194 118 194 100 200 88 C206 76 216 80 220 92 C224 104 216 120 202 132"
              strokeWidth="0.7" strokeLinecap="round"/>
            <path d="M216 106 C210 94 212 78 218 68 C224 58 234 62 236 74 C238 86 230 100 216 106"
              strokeWidth="0.65" strokeLinecap="round"/>

            {/* Right side pinnae */}
            <path d="M55 328 C72 318 88 304 90 288 C92 272 80 266 68 274 C56 282 55 306 55 328"
              strokeWidth="1" strokeLinecap="round"/>
            <path d="M88 288 C106 276 120 258 120 240 C120 222 108 218 96 228 C84 238 86 266 88 288"
              strokeWidth="0.95" strokeLinecap="round"/>
            <path d="M120 250 C138 236 150 216 148 198 C146 180 134 178 122 190 C110 202 114 228 120 250"
              strokeWidth="0.9" strokeLinecap="round"/>
            <path d="M150 214 C166 200 176 180 172 162 C168 144 156 144 146 156 C136 168 138 194 150 214"
              strokeWidth="0.85" strokeLinecap="round"/>
            <path d="M172 182 C186 170 194 150 190 134 C186 118 174 120 166 132 C158 144 160 166 172 182"
              strokeWidth="0.8" strokeLinecap="round"/>
            <path d="M190 154 C202 142 208 124 204 110 C200 96 188 98 182 110 C176 122 178 140 190 154"
              strokeWidth="0.75" strokeLinecap="round"/>

            {/* Fiddlehead curl at tip */}
            <path d="M225 20 C230 12 240 8 248 14 C256 20 254 32 246 36 C240 38 232 34 228 28"
              strokeWidth="1.2" strokeLinecap="round"/>
          </g>

          {/* ═══════════════════════════════════════════════════
              RIGHT SIDE — Wild grasses + seed heads + small flowers
          ═══════════════════════════════════════════════════ */}
          <g stroke="white" fill="none" opacity="0.38">
            {/* Tall grass blades — varying heights, gently curving */}
            <path d="M1450 440 C1440 390 1420 340 1400 285 C1382 235 1368 190 1362 140 C1356 95 1360 60 1358 30"
              strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M1420 440 C1412 395 1396 348 1380 298 C1366 252 1356 208 1354 165 C1352 125 1356 90 1354 55"
              strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M1390 440 C1384 400 1372 358 1360 315 C1348 274 1340 234 1340 195 C1340 158 1344 128 1344 95"
              strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M1460 440 C1454 405 1444 366 1436 328 C1428 292 1424 258 1426 225 C1428 196 1434 172 1432 145"
              strokeWidth="1.1" strokeLinecap="round"/>
            <path d="M1350 440 C1346 408 1340 374 1334 340 C1328 308 1324 278 1326 250 C1328 224 1334 202 1334 178"
              strokeWidth="1" strokeLinecap="round"/>

            {/* Seed head on tallest blade — drooping panicle */}
            <path d="M1358 30 C1350 22 1342 18 1338 10"
              strokeWidth="0.9" strokeLinecap="round"/>
            <path d="M1358 30 C1358 20 1362 12 1360 4"
              strokeWidth="0.9" strokeLinecap="round"/>
            <path d="M1358 30 C1366 22 1372 18 1374 10"
              strokeWidth="0.9" strokeLinecap="round"/>
            {/* Small seed clusters */}
            <circle cx="1338" cy="9" r="2.5" strokeWidth="0.8"/>
            <circle cx="1360" cy="3" r="2.5" strokeWidth="0.8"/>
            <circle cx="1374" cy="9" r="2.5" strokeWidth="0.8"/>
            <circle cx="1349" cy="18" r="1.8" strokeWidth="0.7"/>
            <circle cx="1368" cy="16" r="1.8" strokeWidth="0.7"/>

            {/* Seed head on second blade */}
            <path d="M1354 55 C1346 46 1340 40 1336 32"
              strokeWidth="0.85" strokeLinecap="round"/>
            <path d="M1354 55 C1356 44 1360 38 1358 28"
              strokeWidth="0.85" strokeLinecap="round"/>
            <path d="M1354 55 C1362 46 1368 42 1370 34"
              strokeWidth="0.85" strokeLinecap="round"/>
            <circle cx="1336" cy="31" r="2.2" strokeWidth="0.75"/>
            <circle cx="1358" cy="27" r="2.2" strokeWidth="0.75"/>
            <circle cx="1370" cy="33" r="2.2" strokeWidth="0.75"/>

            {/* Small wildflower on shorter grass */}
            <path d="M1344 95 C1338 86 1330 80 1324 74"
              strokeWidth="0.8" strokeLinecap="round"/>
            {/* 5 petals */}
            <path d="M1324 74 C1320 68 1316 62 1318 57 C1320 52 1326 53 1326 58 C1326 63 1322 68 1324 74"
              strokeWidth="0.7"/>
            <path d="M1324 74 C1330 70 1336 66 1340 68 C1344 70 1342 76 1337 75 C1332 74 1328 72 1324 74"
              strokeWidth="0.7"/>
            <path d="M1324 74 C1322 80 1320 86 1316 88 C1312 90 1310 85 1314 82 C1318 79 1322 78 1324 74"
              strokeWidth="0.7"/>
            <path d="M1324 74 C1318 78 1312 78 1310 74 C1308 70 1312 66 1316 68 C1320 70 1320 73 1324 74"
              strokeWidth="0.7"/>
            <path d="M1324 74 C1322 68 1324 62 1328 60 C1332 58 1334 62 1332 66 C1330 70 1326 72 1324 74"
              strokeWidth="0.7"/>
            <circle cx="1324" cy="74" r="3" strokeWidth="0.9"/>

            {/* Fine crossing base stems */}
            <path d="M1450 440 C1420 425 1385 418 1350 415" strokeWidth="0.6" opacity="0.6"/>
            <path d="M1440 440 C1408 430 1374 424 1340 422" strokeWidth="0.5" opacity="0.5"/>
          </g>

          {/* ═══════════════════════════════════════════════════
              SCATTERED DOTS — like floating spores / pollen
          ═══════════════════════════════════════════════════ */}
          {([
            [420, 60, 2, 0.28], [500, 150, 1.4, 0.22], [340, 240, 1.8, 0.2],
            [560, 320, 1.2, 0.18], [280, 380, 1.5, 0.16],
            [1020, 60, 2, 0.28], [940, 150, 1.4, 0.22], [1100, 240, 1.8, 0.2],
            [880, 320, 1.2, 0.18], [1160, 380, 1.5, 0.16],
            [700, 30, 1.6, 0.18], [740, 380, 1.3, 0.15],
          ] as [number,number,number,number][]).map(([cx, cy, r, o], i) => (
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
