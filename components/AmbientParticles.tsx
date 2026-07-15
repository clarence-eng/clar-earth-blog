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
    let animId = 0;
    let resizeCleanup: (() => void) | null = null;

    const start = () => {
      resizeCleanup?.();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const particles: Particle[] = [];

      const createParticle = (): Particle => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        size: Math.random() * 5 + 3,
        opacity: Math.random() * 0.18 + 0.05,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        type: Math.random() < 0.5 ? "leaf" : "spore",
      });

      const resize = () => {
        // Guard: skip if layout isn't complete yet (dimensions still 0)
        if (!canvas.offsetWidth || !canvas.offsetHeight) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // Initialise or reposition particles now that we have confirmed real dimensions
        if (particles.length === 0) {
          particles.push(...Array.from({ length: 18 }, () => createParticle()));
        } else {
          particles.forEach(p => {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
          });
        }
      };
      resize();
      // Use ResizeObserver on the canvas element itself so we measure after
      // layout is stable, rather than relying on the window resize event.
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      resizeCleanup = () => ro.disconnect();

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
        ctx.rotate(p.rotation);
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
          ctx.strokeStyle = "rgba(255,255,255,0.6)"; // globalAlpha handles particle-level fade; don't double-encode
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
        ctx.restore();
      };

      const draw = () => {
        if (mql.matches) return;
        const now = Date.now();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx + Math.sin(now * 0.0005 + p.y * 0.01) * 0.15;
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
    };

    const onMqlChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(animId);
        resizeCleanup?.();
        resizeCleanup = null;
        // Clear last frame so particles don't stay frozen on canvas
        const c = canvasRef.current?.getContext("2d");
        if (c && canvasRef.current) c.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      } else {
        start();
      }
    };

    mql.addEventListener("change", onMqlChange);
    if (!mql.matches) start();

    return () => {
      cancelAnimationFrame(animId);
      mql.removeEventListener("change", onMqlChange);
      resizeCleanup?.();
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
