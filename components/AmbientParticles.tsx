"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  rotation: number; rotationSpeed: number;
  type: "leaf" | "spore";
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      size: Math.random() * 5 + 3,
      opacity: Math.random() * 0.18 + 0.05,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      type: Math.random() < 0.5 ? "leaf" : "spore",
    }));

    let animId = 0;

    const drawLeaf = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(0, p.size);
      ctx.stroke();
      ctx.restore();
    };

    const drawSpore = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * p.size * 0.5, Math.sin(angle) * p.size * 0.5);
        ctx.lineTo(Math.cos(angle) * p.size * 1.4, Math.sin(angle) * p.size * 1.4);
        ctx.strokeStyle = `rgba(255,255,255,${p.opacity * 0.6})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx + Math.sin(Date.now() * 0.0005 + p.y * 0.01) * 0.15;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        if (p.y < -20) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -20) p.x = canvas.width + 10;
        if (p.x > canvas.width + 20) p.x = -10;
        if (p.type === "spore") drawSpore(ctx, p);
        else drawLeaf(ctx, p);
      });
      animId = requestAnimationFrame(draw);
    };

    draw();
    const onMqlChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(animId);
      } else {
        // Reduce-motion turned off mid-session — restart
        draw();
      }
    };
    mql.addEventListener("change", onMqlChange);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      mql.removeEventListener("change", onMqlChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
