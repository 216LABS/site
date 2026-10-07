"use client";

import { useEffect, useRef, useState } from "react";

// Hero instrument. Left edge is noise, right edge is a clean signal; the
// visitor's cursor (or finger) sets where on that dial the trace sits.
// That is the pitch in one gesture: AI is noisy, 216Labs makes it clean.

function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export default function SignalTrace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clarity, setClarity] = useState(15);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let t = 0;
    let value = reduce ? 1 : 0.08; // current clarity 0..1
    let target = reduce ? 1 : 0.86;
    let raf = 0;
    let visible = true;
    let colors = { ink: "", muted: "", accent: "" };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = {
        ink: s.getPropertyValue("--ink").trim(),
        muted: s.getPropertyValue("--ink-2").trim(),
        accent: s.getPropertyValue("--accent").trim(),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let lastReported = -1;
    const draw = () => {
      value += (target - value) * 0.08;
      const pct = Math.round(value * 100);
      if (pct !== lastReported) {
        lastReported = pct;
        setClarity(pct);
      }

      ctx.clearRect(0, 0, w, h);

      // graticule
      ctx.strokeStyle = colors.muted;
      ctx.globalAlpha = 0.28;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < 10; i++) {
        const x = Math.round((w / 10) * i) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let i = 1; i < 4; i++) {
        const y = Math.round((h / 4) * i) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // trace
      const noise = 1 - value;
      const amp = h * 0.3;
      const frame = Math.floor(t * 2);
      ctx.strokeStyle = value > 0.92 ? colors.accent : colors.ink;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const p = x / w;
        const env = Math.sin(Math.PI * p);
        const clean = Math.sin(p * Math.PI * 6 - t) * amp * env;
        const jitter = (hash(x * 0.37 + frame * 13.7) - 0.5) * 2 * amp * 1.1;
        const wobble = Math.sin(p * 47 + t * 3.1) * amp * 0.35;
        const y = h / 2 + clean * (0.35 + 0.65 * value) + (jitter + wobble) * noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // dial position
      ctx.fillStyle = colors.accent;
      ctx.fillRect(Math.round(value * w) - 1.5, 0, 3, h);

      if (!reduce) {
        t += 0.045;
        if (visible) raf = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      if (reduce) {
        value = target;
        draw();
      }
    };

    readColors();
    resize();
    draw();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !reduce) start();
    });
    io.observe(canvas);

    const onVis = () => {
      visible = !document.hidden;
      if (visible && !reduce) start();
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduce) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readColors();
      if (reduce) draw();
    };

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerdown", onPointer);
    document.addEventListener("visibilitychange", onVis);
    mq.addEventListener("change", onScheme);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onPointer);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onScheme);
    };
  }, []);

  return (
    <figure className="scope">
      <canvas ref={canvasRef} className="scope-canvas" aria-hidden="true" />
      <figcaption className="scope-bar mono">
        <span>Noise ← drag → Signal</span>
        <span aria-live="off">
          Clarity <b>{clarity}%</b>
        </span>
      </figcaption>
    </figure>
  );
}
