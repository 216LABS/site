"use client";

import { useEffect, useRef } from "react";

function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

// Thin trace under the header. At the top of the page it's noise; it cleans up
// into a steady signal as you scroll to the bottom. Redraws only on scroll or
// resize, never on a loop.
export default function ScrollSignal() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let ink = "";
    let accent = "";

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      ink = s.getPropertyValue("--ink-2").trim();
      accent = s.getPropertyValue("--accent").trim();
    };

    const draw = () => {
      raf = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = reduce ? 1 : max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
      const noise = 1 - p;
      const amp = h * 0.38;

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = p > 0.97 ? accent : ink;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const clean = Math.sin((x / 90) * Math.PI) * amp * (0.4 + 0.6 * p);
        const jitter = (hash(x * 0.71) - 0.5) * 2 * amp * noise;
        const y = h / 2 + clean + jitter;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // progress marker
      ctx.fillStyle = accent;
      ctx.fillRect(0, h - 2, w * p, 2);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    readColors();
    draw();
    const ro = new ResizeObserver(schedule);
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      readColors();
      schedule();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readColors();
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    mq.addEventListener("change", onScheme);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", schedule);
      mq.removeEventListener("change", onScheme);
    };
  }, []);

  return <canvas ref={ref} className="scroll-signal" aria-hidden="true" />;
}
