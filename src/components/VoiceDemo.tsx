"use client";

import { useEffect, useRef, useState } from "react";
import { voiceDemo } from "@/content/demos";
import { trackDemo } from "@/lib/track";
import { BookingLink } from "./BookingLink";
import VoiceScope from "./VoiceScope";

// Live demo for the #voice service: a browser call with an xAI voice agent.
// Flow follows xAI's voice-agent-web example: /api/voice-session mints a
// short-lived token, the browser opens the realtime WebSocket with it, streams
// mic audio as PCM16 at the AudioContext's native rate, and plays PCM16 back.

type Line = { role: "caller" | "agent"; text: string; key: string };
type Status = "idle" | "connecting" | "live" | "ended";
type Session = { token: string; agentId: string; instructions: string; voice: string; maxSeconds: number };

const REALTIME_URL = "wss://api.x.ai/v1/realtime";

function toBase64Pcm16(input: Float32Array): string {
  const pcm = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const bytes = new Uint8Array(pcm.buffer);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

function fromBase64Pcm16(b64: string): Float32Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const pcm = new Int16Array(bytes.buffer, 0, bytes.length >> 1);
  const out = new Float32Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) out[i] = pcm[i] / (pcm[i] < 0 ? 0x8000 : 0x7fff);
  return out;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function VoiceDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [lines, setLines] = useState<Line[]>([]);
  const [error, setError] = useState("");
  const [left, setLeft] = useState(voiceDemo.maxSeconds);
  const [speaking, setSpeaking] = useState(false);
  const [talking, setTalking] = useState(false); // caller speech detected by the server

  const ws = useRef<WebSocket | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const mic = useRef<MediaStream | null>(null);
  const proc = useRef<ScriptProcessorNode | null>(null);
  const src = useRef<MediaStreamAudioSourceNode | null>(null);
  const playing = useRef(new Set<AudioBufferSourceNode>());
  const out = useRef<GainNode | null>(null); // agent audio bus: speakers + agent analyser
  const callerAn = useRef<AnalyserNode | null>(null);
  const agentAn = useRef<AnalyserNode | null>(null);
  const nextAt = useRef(0);
  const ready = useRef(false);
  const agentLine = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const attempt = useRef(0); // bumps on every start/hang-up so stale async steps bail out

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function stopPlayback() {
    playing.current.forEach((s) => {
      try {
        s.stop();
      } catch {
        /* already stopped */
      }
    });
    playing.current.clear();
    nextAt.current = 0;
    setSpeaking(false);
  }

  function play(b64: string) {
    const ac = ctx.current;
    if (!ac) return;
    const data = fromBase64Pcm16(b64);
    if (!data.length) return;
    const buf = ac.createBuffer(1, data.length, ac.sampleRate);
    buf.getChannelData(0).set(data);
    const node = ac.createBufferSource();
    node.buffer = buf;
    node.connect(out.current ?? ac.destination);
    const at = Math.max(ac.currentTime + 0.02, nextAt.current);
    node.start(at);
    nextAt.current = at + buf.duration;
    playing.current.add(node);
    setSpeaking(true);
    node.onended = () => {
      playing.current.delete(node);
      if (!playing.current.size) setSpeaking(false);
    };
  }

  function upsert(key: string, role: Line["role"], text: string, append = false) {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.key === key);
      if (i < 0) return [...prev, { key, role, text }];
      const next = [...prev];
      next[i] = { ...next[i], text: append ? next[i].text + text : text };
      return next;
    });
  }

  function teardown() {
    attempt.current++;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    ready.current = false;
    agentLine.current = null;
    const socket = ws.current;
    ws.current = null;
    if (socket && socket.readyState <= WebSocket.OPEN) socket.close();
    proc.current?.disconnect();
    src.current?.disconnect();
    proc.current = null;
    src.current = null;
    out.current?.disconnect();
    out.current = null;
    callerAn.current = null;
    agentAn.current = null;
    mic.current?.getTracks().forEach((t) => t.stop());
    mic.current = null;
    stopPlayback();
    ctx.current?.close().catch(() => {});
    ctx.current = null;
  }

  function end(message = "") {
    teardown();
    setTalking(false);
    if (message) setError(message);
    setStatus("ended");
  }

  useEffect(() => () => teardown(), []); // eslint-disable-line react-hooks/exhaustive-deps

  function handle(msg: Record<string, unknown>, session: Session, rate: number) {
    const socket = ws.current;
    if (!socket) return;
    const send = (o: unknown) => socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(o));

    switch (msg.type) {
      case "conversation.created":
      case "session.created":
        if (ready.current) break;
        send({
          type: "session.update",
          session: {
            ...(session.instructions ? { instructions: session.instructions, voice: session.voice } : {}),
            audio: {
              input: { format: { type: "audio/pcm", rate } },
              output: { format: { type: "audio/pcm", rate } },
            },
            turn_detection: { type: "server_vad" },
          },
        });
        break;
      case "session.updated":
        if (ready.current) break;
        ready.current = true;
        setStatus("live");
        send({ type: "response.create" }); // agent opens the call with its greeting
        break;
      case "response.output_audio.delta":
        if (typeof msg.delta === "string") play(msg.delta);
        break;
      case "response.output_audio_transcript.delta":
        if (typeof msg.delta === "string") {
          if (!agentLine.current) agentLine.current = `a-${Date.now()}`;
          upsert(agentLine.current, "agent", msg.delta, true);
        }
        break;
      case "response.done":
        agentLine.current = null;
        break;
      case "input_audio_buffer.speech_started":
        stopPlayback(); // caller interrupted
        agentLine.current = null;
        setTalking(true);
        break;
      case "input_audio_buffer.speech_stopped":
      case "input_audio_buffer.committed":
        setTalking(false);
        break;
      case "conversation.item.input_audio_transcription.updated":
      case "conversation.item.input_audio_transcription.completed": {
        const id = String(msg.item_id ?? "");
        if (id && typeof msg.transcript === "string" && msg.transcript.trim()) upsert(`u-${id}`, "caller", msg.transcript.trim());
        break;
      }
      case "conversation.item.added":
      case "conversation.item.created": {
        const item = msg.item as { id?: string; role?: string; content?: { type?: string; transcript?: string }[] } | undefined;
        if (item?.role !== "user" || !item.id) break;
        const t = item.content?.find((c) => c.type === "input_audio" && c.transcript)?.transcript?.trim();
        if (t) upsert(`u-${item.id}`, "caller", t);
        break;
      }
      case "error": {
        const e = msg.error as { message?: string } | undefined;
        console.error("voice demo:", e?.message ?? msg);
        if (!ready.current) end("The voice demo couldn't connect. Try again in a moment.");
        break;
      }
    }
  }

  async function start() {
    if (status === "connecting" || status === "live") return;
    setError("");
    setLines([]);
    setStatus("connecting");
    trackDemo("voice");
    const run = ++attempt.current;

    try {
      // Mic first: the permission prompt is the slowest step and needs the click.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      if (run !== attempt.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      mic.current = stream;
    } catch {
      if (run === attempt.current) end("Microphone access was blocked. Allow the mic for this site and try again.");
      return;
    }

    const ac = new AudioContext();
    ctx.current = ac;
    await ac.resume().catch(() => {});
    const rate = ac.sampleRate;

    // Analysers feed the oscilloscope: one on the mic, one on the agent's output bus.
    const agentAnalyser = ac.createAnalyser();
    agentAnalyser.fftSize = 1024;
    const bus = ac.createGain();
    bus.connect(ac.destination);
    bus.connect(agentAnalyser);
    out.current = bus;
    agentAn.current = agentAnalyser;

    let session: Session;
    try {
      const res = await fetch("/api/voice-session", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (run !== attempt.current) return; // hung up while waiting
      if (!res.ok || !data?.token) {
        end(data?.error ?? "The voice demo couldn't start. Try again in a moment.");
        return;
      }
      session = data as Session;
    } catch {
      if (run === attempt.current) end("The connection dropped. Try again.");
      return;
    }

    const url = session.agentId
      ? `${REALTIME_URL}?agent_id=${encodeURIComponent(session.agentId)}`
      : `${REALTIME_URL}?model=grok-voice-latest`;
    const socket = new WebSocket(url, [`xai-client-secret.${session.token}`]);
    ws.current = socket;

    socket.onmessage = (ev) => {
      try {
        handle(JSON.parse(ev.data as string), session, rate);
      } catch {
        /* ignore malformed frames */
      }
    };
    socket.onclose = () => {
      if (ws.current === socket) end(ready.current ? "" : "The voice demo couldn't connect. Try again in a moment.");
    };

    // Stream the mic once the session is configured; audio before that is dropped.
    const source = ac.createMediaStreamSource(mic.current!);
    const callerAnalyser = ac.createAnalyser();
    callerAnalyser.fftSize = 1024;
    source.connect(callerAnalyser);
    callerAn.current = callerAnalyser;
    const node = ac.createScriptProcessor(4096, 1, 1);
    node.onaudioprocess = (e) => {
      if (!ready.current || socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify({ type: "input_audio_buffer.append", audio: toBase64Pcm16(e.inputBuffer.getChannelData(0)) }));
    };
    const mute = ac.createGain();
    mute.gain.value = 0;
    source.connect(node);
    node.connect(mute);
    mute.connect(ac.destination);
    src.current = source;
    proc.current = node;

    const max = Math.min(session.maxSeconds || voiceDemo.maxSeconds, 600);
    setLeft(max);
    const deadline = Date.now() + max * 1000;
    timer.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) end("That's the end of the demo call. Want one answering your phone?");
    }, 1000);
  }

  const live = status === "live";
  const busy = status === "connecting";

  return (
    <div className="demo">
      <div className="console-bar mono">
        <span className={live ? "on" : undefined}>{live ? `Voice demo · on call · ${fmt(left)}` : "Voice demo · ready"}</span>
        <span>{voiceDemo.business} (sample)</span>
      </div>

      <div className="voice-stage">
        <VoiceScope caller={callerAn} agent={agentAn} live={live} />
        <div className="voice-legend mono">
          <span className={`voice-key is-caller${live && talking ? " is-on" : ""}`}>You · noise</span>
          <span className={`voice-key is-agent${speaking ? " is-on" : ""}`}>Jordan · signal</span>
        </div>
      </div>

      <div className="demo-body">
        {status === "idle" && lines.length === 0 && (
          <p className="demo-hint">
            Call an AI receptionist for a sample painting company. Ask for an estimate, push for a price, try to trip it
            up. Uses your microphone, {Math.round(voiceDemo.maxSeconds / 60)} minutes max.
          </p>
        )}
        {busy && (
          <p className="demo-hint mono">
            Connecting<span className="cursor" aria-hidden="true" />
          </p>
        )}

        {lines.length > 0 && (
          <div className="voice-log" ref={logRef} aria-live="polite">
            {lines.map((l) => (
              <p key={l.key} className={`voice-line is-${l.role}`}>
                <span className="mono">{l.role === "agent" ? "Jordan" : "You"}</span>
                {l.text}
              </p>
            ))}
          </div>
        )}

        {error && <p className="demo-error">{error}</p>}

        <div className="demo-cta">
          {live || busy ? (
            <button type="button" className="btn btn-ghost" onClick={() => end()}>
              Hang up
              {live && <span className={`voice-dot${speaking ? " is-speaking" : ""}`} aria-hidden="true" />}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={start}>
              {status === "ended" ? "Call again" : "Talk to it"}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </button>
          )}
          {status === "ended" && (
            <BookingLink service="voice" placement="voice-demo" className="link">
              Get one for your business
            </BookingLink>
          )}
          {voiceDemo.phone && status === "idle" && (
            <span className="mono muted">
              Or call it: <a href={`tel:${voiceDemo.phoneE164}`}>{voiceDemo.phone}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
