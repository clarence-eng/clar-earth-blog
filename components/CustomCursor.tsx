"use client";

import { useEffect, useState, useRef } from "react";

// Mood colours — each poem carries a data-mood attribute
// The cursor dot and ladybug smoothly interpolate toward the mood colour
const MOOD_COLORS: Record<string, { dot: string; ladybug: string }> = {
  longing:    { dot: "#7AAABB", ladybug: "#A8D4E0" },
  nature:     { dot: "#5A8A74", ladybug: "#8AC4A0" },
  grief:      { dot: "#6A5A7A", ladybug: "#A89AB8" },
  warmth:     { dot: "#C4882A", ladybug: "#E0B870" },
  resilience: { dot: "#8A6A4A", ladybug: "#C4A070" },
  defiance:   { dot: "#8A4A4A", ladybug: "#C48080" },
  love:       { dot: "#B05C6A", ladybug: "#D4899A" },
  default:    { dot: "#2D4A3E", ladybug: "white" },
};

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
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

export default function CustomCursor() {
  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mood, setMood] = useState("default");
  const [dotColor, setDotColor] = useState(rgbToCss(hexToRgb(MOOD_COLORS.default.dot)));
  const [ladybugColor, setLadybugColor] = useState(MOOD_COLORS.default.ladybug);
  const animRef = useRef<number>(0);

  // Store current/target colours as RGB tuples so lerpRgb never receives an rgb() string
  const targetDotRef = useRef<RGB>(hexToRgb(MOOD_COLORS.default.dot));
  const targetLadybugRef = useRef<RGB>(hexToRgb(MOOD_COLORS.default.ladybug));
  const curDotRef = useRef<RGB>(hexToRgb(MOOD_COLORS.default.dot));
  const curLadybugRef = useRef<RGB>(hexToRgb(MOOD_COLORS.default.ladybug));

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [role=button], label"));
      const moodEl = el.closest("[data-mood]") as HTMLElement | null;
      const newMood = moodEl?.dataset.mood ?? "default";
      if (newMood !== mood) {
        setMood(newMood);
        const colors = MOOD_COLORS[newMood] ?? MOOD_COLORS.default;
        targetDotRef.current = hexToRgb(colors.dot);
        // ladybug "white" has no hex — fall back gracefully
        targetLadybugRef.current = colors.ladybug.startsWith("#")
          ? hexToRgb(colors.ladybug)
          : hexToRgb("#FFFFFF");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, mood]);

  // rAF loop — lerp position + lerp colour
  useEffect(() => {
    const tick = () => {
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
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  if (!visible) return null;

  return (
    <svg
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        overflow: "visible",
        transition: "width 0.2s, height 0.2s",
      }}
      viewBox={hovered ? "-16 -26 32 34" : "-5 -5 10 10"}
      width={hovered ? 48 : 10}
      height={hovered ? 48 : 10}
    >
      {hovered ? (
        <g stroke={ladybugColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 7 C-10 7 -13 0 -11 -7 C-9 -14 9 -14 11 -7 C13 0 10 7 0 7Z" strokeWidth="1.4"/>
          <circle cx="0" cy="-16" r="5" strokeWidth="1.3"/>
          <line x1="0" y1="-10" x2="0" y2="7" strokeWidth="1"/>
          <circle cx="-5" cy="-5" r="2" strokeWidth="1"/>
          <circle cx="5" cy="-5" r="2" strokeWidth="1"/>
          <circle cx="-4" cy="2" r="1.6" strokeWidth="0.9"/>
          <circle cx="4" cy="2" r="1.6" strokeWidth="0.9"/>
          <path d="M-3 -20 Q-6 -25 -8 -24" strokeWidth="1"/>
          <path d="M3 -20 Q6 -25 8 -24" strokeWidth="1"/>
        </g>
      ) : (
        <circle cx="0" cy="0" r="4" fill={dotColor} opacity="0.9"/>
      )}
    </svg>
  );
}
