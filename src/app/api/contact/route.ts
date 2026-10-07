import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { serviceById } from "@/content/site";
import { clientIp, rateLimit, sameOrigin } from "@/lib/guard";

export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 60 * 60_000)) {
    return NextResponse.json({ error: "Too many submissions" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // Honeypot: real visitors never fill this field. Pretend success.
  if (str(body.website, 200)) return NextResponse.json({ success: true });

  const name = str(body.name, 120);
  const business = str(body.business, 160);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const message = str(body.message, 4000);
  const serviceId = str(body.service, 20);
  const service = serviceById(serviceId)?.name ?? "Not sure yet";

  if (!name || !message || (!email && !phone)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const attribution =
    body.attribution && typeof body.attribution === "object"
      ? Object.entries(body.attribution as Record<string, unknown>)
          .slice(0, 10)
          .map(([k, v]) => [str(k, 30), str(v, 300)] as const)
          .filter(([k, v]) => k && v)
      : [];

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("contact: Gmail credentials are not set");
    return NextResponse.json({ error: "Email is not configured" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Service", service],
    ["Name", name],
    ["Business", business || "—"],
    ["Email", email || "—"],
    ["Phone", phone || "—"],
    ...attribution.map(([k, v]) => [k, v] as [string, string]),
  ];

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "sam@216labs.dev",
      replyTo: email || undefined,
      subject: `[${service}] ${name}${business ? ` at ${business}` : ""}`.replace(/[\r\n]+/g, " "),
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      html: `<table>${rows
        .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join("")}</table><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("contact: send failed", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
