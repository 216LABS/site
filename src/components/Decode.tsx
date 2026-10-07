"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_/[]{}=+*^?#01";

// Monospace label that resolves from noise into its text when it scrolls into
// view. The real text is server-rendered and is what screen readers get; the
// effect only runs once, only in monospace (so widths never shift), and not at
// all under prefers-reduced-motion.
export default function Decode({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;
    const total = 16;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const tick = () => {
          frame++;
          const resolved = Math.floor((frame / total) * text.length);
          setShown(
            text
              .split("")
              .map((ch, i) => (i < resolved || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
              .join(""),
          );
          if (frame < total) timer = window.setTimeout(tick, 32);
          else setShown(text);
        };
        tick();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
