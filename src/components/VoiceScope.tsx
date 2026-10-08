"use client";

import { useEffect, useRef } from "react";

// Oscilloscope for the voice demo, in the hero's "noise in, signal out" language.
// The caller's mic draws as the raw, jittery waveform (noise); the agent's
// voice draws as a clean orange sine whose height follows its loudness (signal).
// Idle is a flat line with a slow pulse.

function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

type Props = {
  caller: React.RefObject<AnalyserNode | null>;
  agent: React.RefObject<AnalyserNode | null>;
  live: boolean;
};

function rms(data: Float32Array) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
  return Math.sqrt(sum / data.length);
}

export default function VoiceScope({ caller, agent, live }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef(live);
  useEffect(() => {
    liveRef.current = live;
  }, [live]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let visible = true;
    let callerLevel = 0;
    let agentLevel = 0;
    let buf = new Float32Array(1024);
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

    const read = (an: AnalyserNode | null) => {
      if (!an) return null;
      if (buf.length !== an.fftSize) buf = new Float32Array(an.fftSize);
      an.getFloatTimeDomainData(buf);
      return buf;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;

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
      ctx.lineJoin = "round";

      const isLive = liveRef.current;

      // Caller: raw mic waveform plus jitter scaled by loudness. Noise.
      const mic = isLive ? read(caller.current) : null;
      const micLevel = mic ? rms(mic) : 0;
      callerLevel += (micLevel - callerLevel) * 0.3;
      const frame = Math.floor(t * 3);
      ctx.strokeStyle = colors.ink;
      ctx.globalAlpha = isLive ? 0.85 : 0.35;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const p = x / w;
        const env = Math.sin(Math.PI * p);
        const sample = mic ? mic[Math.floor(p * (mic.length - 1))] : 0;
        const jitter = (hash(x * 0.37 + frame * 13.7) - 0.5) * Math.min(1, callerLevel * 14) * h * 0.18;
        const y = mid + (sample * h * 1.6 + jitter) * env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Agent: clean sine, height follows the agent's loudness. Signal.
      const out = isLive ? read(agent.current) : null;
      const outLevel = out ? rms(out) : 0;
      agentLevel += (outLevel - agentLevel) * 0.18;
      const idlePulse = (Math.sin(t * 1.4) + 1) / 2;
      const amp = isLive ? Math.min(h * 0.42, agentLevel * h * 5) + h * 0.015 : h * (0.02 + 0.03 * idlePulse);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const p = x / w;
        const env = Math.sin(Math.PI * p);
        const y = mid + Math.sin(p * Math.PI * 8 - t * 2.2) * amp * env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Sweep marker while on a call.
      if (isLive) {
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(Math.round(((t * 0.12) % 1) * w) - 1, 0, 2, h);
        ctx.globalAlpha = 1;
      }

      if (!reduce) {
        t += 0.045;
        if (visible) raf = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    readColors();
    resize();
    draw();
    // Reduced motion: no continuous animation, just a steady low-rate redraw so levels still show.
    const slow = reduce ? setInterval(draw, 250) : null;

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
      draw();
    });
    ro.observe(canvas);
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", readColors);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      if (slow) clearInterval(slow);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      mq.removeEventListener("change", readColors);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [caller, agent]);

  return <canvas ref={canvasRef} className="voice-scope" aria-hidden="true" />;
}
