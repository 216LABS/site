"use client";

import { useEffect, useRef, useState } from "react";
import { trackChatQuestion } from "@/lib/track";
import { BookingLink } from "./BookingLink";

type Turn = {
  q: string;
  a: string;
  sources: string[];
  handoff: boolean;
  status: "streaming" | "done" | "error";
};

const CONTROL = /\[\[(sources:[^\]]*|handoff)\]\]\s*$/;

// Splits the model's trailing control line off the visible answer.
function parse(raw: string) {
  const m = raw.match(CONTROL);
  if (!m) {
    // Hide a control line that is still arriving mid-stream.
    const cut = raw.lastIndexOf("[[");
    return { text: (cut >= 0 ? raw.slice(0, cut) : raw).trim(), sources: [] as string[], handoff: false };
  }
  const text = raw.slice(0, m.index).trim();
  if (m[1] === "handoff") return { text, sources: [], handoff: true };
  const sources = m[1]
    .slice("sources:".length)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return { text, sources, handoff: false };
}

export default function AskChat({
  labels,
  suggestions,
  children,
}: {
  labels: Record<string, string>;
  suggestions: string[];
  children: React.ReactNode;
}) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el && turns.length) el.scrollTop = el.scrollHeight;
  }, [turns]);

  const update = (i: number, patch: Partial<Turn>) =>
    setTurns((prev) => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));

  async function ask(question: string) {
    const q = question.trim().slice(0, 500);
    if (!q || busy) return;
    setBusy(true);
    setInput("");
    trackChatQuestion();

    const index = turns.length;
    const history = turns
      .filter((t) => t.status === "done")
      .slice(-4)
      .flatMap((t) => [
        { role: "user" as const, content: t.q },
        { role: "assistant" as const, content: t.a },
      ]);
    setTurns((prev) => [...prev, { q, a: "", sources: [], handoff: false, status: "streaming" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: q }] }),
      });

      if (!res.ok || !res.body) {
        const msg =
          res.status === 429
            ? "That's a lot of questions in a short time. Give it a few minutes, or book a call and ask Sam directly."
            : "The demo couldn't answer right now. Try again in a moment, or book a call and ask Sam directly.";
        update(index, { a: msg, status: "error", handoff: true });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let raw = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        update(index, { a: parse(raw).text });
      }
      const final = parse(raw);
      update(index, {
        a: final.text || "I don't have an answer for that. Sam can help on a quick call.",
        sources: final.sources,
        handoff: final.handoff || !final.text,
        status: "done",
      });
    } catch {
      update(index, {
        a: "The connection dropped. Try again, or book a call and ask Sam directly.",
        status: "error",
        handoff: true,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="console reveal">
      <div className="console-bar mono">
        <span className="on">Ask 216Labs · live</span>
        <span>Grounded in this site only</span>
      </div>

      <div className="console-log" ref={logRef} aria-live="polite" aria-busy={busy}>
        {children}
        {turns.map((t, i) => (
          <div key={i}>
            <p className="msg-q">{t.q}</p>
            <p className="msg-a">
              {t.a}
              {t.status === "streaming" && <span className="cursor" aria-hidden="true" />}
            </p>
            {t.status === "done" && t.sources.length > 0 && (
              <div className="msg-meta mono">
                Sources:
                {t.sources.map((s) => (
                  <span key={s} className="chip chip-src">
                    {labels[s] ?? s}
                  </span>
                ))}
              </div>
            )}
            {t.status !== "streaming" && t.handoff && (
              <div className="handoff">
                <span>Handed to a person.</span>
                <BookingLink placement="chat-handoff" className="link">
                  Book a call with Sam
                </BookingLink>
              </div>
            )}
          </div>
        ))}
      </div>

      {turns.length === 0 && (
        <div className="suggest" aria-label="Suggested questions">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => ask(s)} disabled={busy}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="console-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor="ask-input" className="sr-only">
          Ask a question about 216Labs
        </label>
        <input
          id="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          maxLength={500}
          autoComplete="off"
          enterKeyHint="send"
        />
        <button type="submit" disabled={busy || !input.trim()}>
          {busy ? "Thinking" : "Ask"}
        </button>
      </form>
    </div>
  );
}
