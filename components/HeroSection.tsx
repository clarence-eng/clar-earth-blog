"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import AmbientParticles from "./AmbientParticles";
import { SITE_TAGLINE } from "@/lib/config";

function Sprig({ x, y, size, rotate, opacity }: { x: string; y: string; size: number; rotate: number; opacity: number }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, opacity, transform: `rotate(${rotate}deg)`, width: size, height: size * 1.4 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 34" fill="none" stroke="white" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" width={size} height={size * 1.4}>
        <path d="M12 32 C12 26 11 20 10 14 C9 8 10 4 12 2" strokeWidth="0.9"/>
        <path d="M11 18 C7 15 4 11 6 8 C8 5 12 8 11 13" strokeWidth="0.8"/>
        <path d="M11 12 C15 9 18 6 16 3 C14 1 10 4 11 9" strokeWidth="0.8"/>
        <circle cx="12" cy="2" r="1.2" fill="white" strokeWidth="0"/>
      </svg>
    </div>
  );
}

export default function HeroSection({ titles, gradient }: { titles: string[]; gradient: string }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const quoteY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ornamentsY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const sprigsY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  // Derive marquee text from titles prop — auto-updates when poems are added
  const marqueeText = titles.length > 0
    ? titles.join("  ·  ") + "  ·  "
    : "";

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Site introduction"
        className="relative overflow-hidden min-h-[56vh] flex items-center"
        style={{ background: gradient }}
      >
        {/* Parallax ornament layer */}
        <motion.div className="absolute inset-0 pointer-events-none" style={reducedMotion !== false ? undefined : { y: ornamentsY }}>
          <div className="absolute pointer-events-none select-none leading-none"
            style={{ top: "14%", left: "13%", fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)", color: "white", opacity: 0.26, lineHeight: 1 }}
            aria-hidden="true">&#10047;</div>
          <div className="absolute pointer-events-none select-none leading-none"
            style={{ top: "14%", right: "13%", fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)", color: "white", opacity: 0.26, lineHeight: 1 }}
            aria-hidden="true">&#10048;</div>
          <div className="absolute pointer-events-none select-none leading-none"
            style={{ bottom: "20%", left: "15%", fontSize: "clamp(1.8rem, 3.8vw, 3.6rem)", color: "white", opacity: 0.2, lineHeight: 1 }}
            aria-hidden="true">&#10049;</div>
          <div className="absolute pointer-events-none select-none leading-none"
            style={{ bottom: "20%", right: "15%", fontSize: "clamp(1.8rem, 3.8vw, 3.6rem)", color: "white", opacity: 0.2, lineHeight: 1 }}
            aria-hidden="true">&#10046;</div>
        </motion.div>

        {/* Parallax sprig layer */}
        <motion.div className="absolute inset-0 pointer-events-none" style={reducedMotion !== false ? undefined : { y: sprigsY }}>
          <Sprig x="8.5%" y="28%" size={28} rotate={-12} opacity={0.22} />
          <Sprig x="86%" y="28%" size={28} rotate={14} opacity={0.22} />
          <Sprig x="9%" y="52%" size={22} rotate={15} opacity={0.15} />
          <Sprig x="85.5%" y="52%" size={22} rotate={-18} opacity={0.15} />
          <Sprig x="18%" y="65%" size={18} rotate={25} opacity={0.12} />
          <Sprig x="77%" y="65%" size={18} rotate={-22} opacity={0.12} />
        </motion.div>

        {/* Scattered pollen dots */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" aria-hidden="true">
          {([
            ["27%","10%",1.3,0.18],["35%","32%",0.9,0.12],["20%","55%",1.1,0.14],
            ["73%","10%",1.3,0.18],["65%","32%",0.9,0.12],["80%","55%",1.1,0.14],
            ["50%","7%",1.1,0.13],["44%","78%",0.8,0.1],["56%","78%",0.8,0.1],
          ] as [string,string,number,number][]).map(([cx,cy,r,o],i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={o}/>
          ))}
        </svg>

        <AmbientParticles />
        <div className="absolute inset-0 hero-noise-overlay" aria-hidden="true" />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 56 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
            <path d="M0,56 C360,0 1080,0 1440,56 L1440,56 L0,56 Z" fill="var(--cream)" />
          </svg>
        </div>

        {/* Quote — fades + lifts on scroll */}
        <motion.div
          className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 pt-20 pb-14 sm:pt-28 sm:pb-20 text-center"
          style={reducedMotion !== false ? undefined : { y: quoteY, opacity: quoteOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p
              className="cormorant-italic text-white/90 leading-[1.5] mx-auto"
              style={{
                fontSize: "clamp(1.55rem, 3.2vw, 2.5rem)",
              }}
            >
              &ldquo;{SITE_TAGLINE}&rdquo;
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mx-auto mt-7 h-px bg-white/20 origin-center"
              style={{ maxWidth: 120 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee — derived from poem titles, auto-updates when new poems are added */}
      {marqueeText && (
        <div className="w-full overflow-hidden border-y border-[var(--border)] py-2.5 relative" style={{ background: "var(--cream-dark)" }}>
          <div
            className="marquee-track"
            aria-hidden="true"
            style={{ animationPlayState: marqueePaused ? "paused" : "running" }}
          >
            {[0, 1].map(i => (
              <span key={i} className="marquee-content">{marqueeText.repeat(5)}</span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMarqueePaused(p => !p)}
            aria-label={marqueePaused ? "Resume scrolling poem titles" : "Pause scrolling poem titles"}
            aria-pressed={marqueePaused}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--cream-dark)] text-[var(--muted)] hover:text-[var(--forest)] transition-colors duration-200 z-10"
          >
            {marqueePaused ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <polygon points="2,1 9,5 2,9"/>
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <rect x="1.5" y="1.5" width="2.5" height="7"/>
                <rect x="6" y="1.5" width="2.5" height="7"/>
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
}
