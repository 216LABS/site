import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { systemPrompt } from "@/lib/knowledge";
import { rateLimit, clientIp, sameOrigin } from "@/lib/guard";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL || "claude-opus-5-5";
const SYSTEM = systemPrompt(); // stable string so the prompt cache hits

type Msg = { role: "user" | "assistant"; content: string };

function validate(body: unknown): Msg[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 9) return null;
  const msgs: Msg[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const limit = role === "user" ? 500 : 1500;
    const text = content.trim().slice(0, limit);
    if (!text) return null;
    msgs.push({ role, content: text });
  }
  if (msgs[0].role !== "user" || msgs[msgs.length - 1].role !== "user") return null;
  return msgs;
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("chat: ANTHROPIC_API_KEY is not set");
    return NextResponse.json({ error: "Chat is not configured" }, { status: 503 });
  }

  const ip = clientIp(req);
  if (!rateLimit(`chat:${ip}`, 12, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many questions" }, { status: 429 });
  }

  const messages = validate(await req.json().catch(() => null));
  if (!messages) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const client = new Anthropic();
  const encoder = new TextEncoder();
  const question = messages[messages.length - 1].content;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = "";
      try {
        const s = client.beta.messages.stream({
          model: MODEL,
          max_tokens: 4096,
          output_config: { effort: "low" },
          // Server-side fallback: if a safety classifier declines, the API
          // re-runs the request on a fallback model inside the same call.
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
          messages,
        });

        for await (const event of s) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            answer += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await s.finalMessage();
        if (final.stop_reason !== "end_turn" && !/\[\[(sources:[^\]]*|handoff)\]\]\s*$/.test(answer)) {
          controller.enqueue(encoder.encode("\n[[handoff]]"));
        }
        // Structured log line for the weekly answer review (Vercel > Logs, filter "chat_log").
        console.log(
          JSON.stringify({
            type: "chat_log",
            q: question,
            a: answer,
            stop: final.stop_reason,
            model: final.model,
            usage: final.usage,
          }),
        );
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) console.error("chat: Anthropic rate limit", err.message);
        else if (err instanceof Anthropic.APIError) console.error(`chat: API error ${err.status}`, err.message);
        else console.error("chat: unexpected error", err);
        controller.enqueue(
          encoder.encode(
            `${answer ? "\n\n" : ""}Something went wrong on my end. Sam can answer this directly on a call.\n[[handoff]]`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
