import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp, sameOrigin } from "@/lib/guard";
import { voiceDemo } from "@/content/demos";

export const runtime = "nodejs";

// Mints a short-lived xAI token for the browser voice demo. The browser then
// talks to xAI directly; the API key never leaves the server. Cost ceilings:
// the per-IP limit here, the session cap in VoiceDemo, and the monthly spend
// limit set in the xAI console.
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const key = process.env.XAI_API_KEY;
  if (!key) {
    console.error("voice-session: XAI_API_KEY is not set");
    return NextResponse.json({ error: "The voice demo isn't switched on yet." }, { status: 503 });
  }

  const ip = clientIp(req);
  if (!rateLimit(`voice:${ip}`, 4, 15 * 60_000)) {
    return NextResponse.json({ error: "That's a few calls in a row. Try again in a few minutes." }, { status: 429 });
  }

  try {
    const res = await fetch("https://api.x.ai/v1/realtime/client_secrets", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      // Outlives the longest demo session (voiceDemo.maxSeconds) in case expiry also ends live sessions.
      body: JSON.stringify({ expires_after: { seconds: 300 } }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`voice-session: xAI ${res.status}`, await res.text());
      return NextResponse.json({ error: "The voice demo couldn't start. Try again in a moment." }, { status: 502 });
    }
    const data = (await res.json()) as { value?: string; client_secret?: { value?: string } };
    const token = data.value ?? data.client_secret?.value;
    if (!token) {
      console.error("voice-session: no token in xAI response");
      return NextResponse.json({ error: "The voice demo couldn't start. Try again in a moment." }, { status: 502 });
    }

    console.log(JSON.stringify({ type: "voice_demo_start" }));
    const agentId = process.env.XAI_VOICE_AGENT_ID || "";
    return NextResponse.json(
      {
        token,
        agentId,
        // A saved agent brings its own prompt and voice; otherwise the browser sends these.
        instructions: agentId ? "" : voiceDemo.instructions,
        voice: agentId ? "" : voiceDemo.voice,
        maxSeconds: voiceDemo.maxSeconds,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("voice-session: unexpected error", err);
    return NextResponse.json({ error: "The voice demo couldn't start. Try again in a moment." }, { status: 502 });
  }
}
