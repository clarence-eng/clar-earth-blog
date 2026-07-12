"use client";

import { useEffect, useState, useRef } from "react";

const MOOD_COLORS: Record<string, { dot: string; ladybug: string }> = {
  longing:    { dot: "#7AAABB", ladybug: "#6AAEC8" },
  nature:     { dot: "#5A8A74", ladybug: "#8AC4A0" },
  warmth:     { dot: "#C4882A", ladybug: "#E0B870" },
  love:       { dot: "#B05C6A", ladybug: "#D4899A" },
  nostalgia:  { dot: "#A08850", ladybug: "#D0B880" },
  melancholy: { dot: "#6A6A8A", ladybug: "#A0A0C0" },
  protest:    { dot: "#A04040", ladybug: "#FFFFFF" },
  solidarity: { dot: "#3A7AAA", ladybug: "#70AADA" },
  reverence:  { dot: "#4A8A44", ladybug: "#80C078" },
  bitterness: { dot: "#8A5A38", ladybug: "#C49070" },
  default:    { dot: "#2D4A3E", ladybug: "#FFFFFF" },
};

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  if (!hex || !/^#[0-9A-Fa-f]{6}$/.test(hex)) return [255, 255, 255];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function rgbToCss([r, g, b]: RGB): string {
  return `rgb(${r},${g},${b})`;
}

const DEFAULT_DOT_RGB: RGB = hexToRgb(MOOD_COLORS.default.dot);
const DEFAULT_LADYBUG_RGB: RGB = hexToRgb(MOOD_COLORS.default.ladybug);

export default function CustomCursor() {
  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  const targetDotRef = useRef<RGB>(DEFAULT_DOT_RGB);
  const targetLadybugRef = useRef<RGB>(DEFAULT_LADYBUG_RGB);
  const curDotRef = useRef<RGB>(DEFAULT_DOT_RGB);
  const curLadybugRef = useRef<RGB>(DEFAULT_LADYBUG_RGB);
  const [dotColor, setDotColor] = useState(rgbToCss(DEFAULT_DOT_RGB));
  const [ladybugColor, setLadybugColor] = useState(rgbToCss(DEFAULT_LADYBUG_RGB));

  const moodRef = useRef("default:");
  const animRef = useRef<number>(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mql.matches;
    const onMqlChange = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
    mql.addEventListener("change", onMqlChange);

    const move = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [role=button], label"));
      const moodEl = el.closest("[data-mood]") as HTMLElement | null;
      const newMood = moodEl?.dataset.mood ?? "default";
      const overrideHex = moodEl?.dataset.ladybug || null;
      const newKey = `${newMood}:${overrideHex ?? ""}`;
      if (newKey !== moodRef.current) {
        moodRef.current = newKey;
        const colors = MOOD_COLORS[newMood] ?? MOOD_COLORS.default;
        targetDotRef.current = hexToRgb(colors.dot);
        targetLadybugRef.current = hexToRgb(overrideHex ?? colors.ladybug);
        // When reduced motion: snap colours immediately on mood change
        if (reducedMotion) {
          curDotRef.current = targetDotRef.current;
          curLadybugRef.current = targetLadybugRef.current;
          setDotColor(rgbToCss(targetDotRef.current));
          setLadybugColor(rgbToCss(targetLadybugRef.current));
        }
      }
      // When reduced motion: snap position directly, no lerp
      if (reducedMotion) {
        posRef.current = { x: e.clientX, y: e.clientY };
        setPos({ x: e.clientX, y: e.clientY });
      }
    };
    const leave = () => setHovered(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); mql.removeEventListener("change", onMqlChange); };
  }, []);

  // rAF lerp loop — only runs when reduced motion is OFF
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let loopId = 0; // each startLoop call gets a unique id to avoid stale-loop conflicts

    const startLoop = () => {
      const myId = ++loopId;
      const tick = () => {
        if (myId !== loopId || mql.matches) return;
        const { x: mx, y: my } = mouseRef.current;
        const { x: cx, y: cy } = posRef.current;
        const nx = lerp(cx, mx, 0.18);
        const ny = lerp(cy, my, 0.18);
        posRef.current = { x: nx, y: ny };

        const newDot = lerpRgb(curDotRef.current, targetDotRef.current, 0.06);
        const newLady = lerpRgb(curLadybugRef.current, targetLadybugRef.current, 0.06);
        curDotRef.current = newDot;
        curLadybugRef.current = newLady;

        setPos({ x: nx, y: ny });
        setDotColor(rgbToCss(newDot));
        setLadybugColor(rgbToCss(newLady));
        animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
    };

    if (!mql.matches) startLoop();

    const onMqlChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        loopId++; // invalidate any stale loop before starting new one
        cancelAnimationFrame(animRef.current);
        startLoop();
      } else {
        loopId++; // invalidate running loop
        cancelAnimationFrame(animRef.current);
      }
    };
    mql.addEventListener("change", onMqlChange);
    return () => { loopId++; cancelAnimationFrame(animRef.current); mql.removeEventListener("change", onMqlChange); };
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        overflow: "visible",
      }}
      viewBox={hovered ? "-16 -26 32 34" : "-5 -5 10 10"}
      width={hovered ? 48 : 10}
      height={hovered ? 48 : 10}
    >
      {hovered ? (
        <g stroke={ladybugColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 7 C-10 7 -13 0 -11 -7 C-9 -14 9 -14 11 -7 C13 0 10 7 0 7Z" strokeWidth="2"/>
          <circle cx="0" cy="-16" r="5" strokeWidth="1.8"/>
          <line x1="0" y1="-10" x2="0" y2="7" strokeWidth="1.5"/>
          <circle cx="-5" cy="-5" r="2" strokeWidth="1.5"/>
          <circle cx="5" cy="-5" r="2" strokeWidth="1.5"/>
          <circle cx="-4" cy="2" r="1.6" strokeWidth="1.3"/>
          <circle cx="4" cy="2" r="1.6" strokeWidth="1.3"/>
          <path d="M-3 -20 Q-6 -25 -8 -24" strokeWidth="1.5"/>
          <path d="M3 -20 Q6 -25 8 -24" strokeWidth="1.5"/>
        </g>
      ) : (
        <circle cx="0" cy="0" r="4" fill={dotColor} opacity="0.9"/>
      )}
    </svg>
  );
}
