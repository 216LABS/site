"use client";

import { useEffect, useState } from "react";
import { serviceIds, services } from "@/content/site";
import { trackLead } from "@/lib/track";
import { SERVICE_EVENT } from "./BookingLink";

type Status = "idle" | "sending" | "sent" | "error";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];

export default function ContactForm() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  // Preselect the service a visitor arrived for: ?service=voice, a /#voice deep
  // link, or an in-page "send a note" click. Keep the ad attribution too.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.slice(1);
    const fromUrl = params.get("service") ?? (serviceIds.includes(hash as never) ? hash : "");
    if (fromUrl && serviceIds.includes(fromUrl as never)) setService(fromUrl);

    const attr: Record<string, string> = { landing: window.location.pathname + window.location.search + window.location.hash };
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) attr[k] = v.slice(0, 200);
    }
    setAttribution(attr);

    const onService = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (serviceIds.includes(id as never)) setService(id);
    };
    window.addEventListener(SERVICE_EVENT, onService);
    return () => window.removeEventListener(SERVICE_EVENT, onService);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.email && !data.phone) {
      setError("Add an email or a phone number so I can reply.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attribution }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead(data.service);
      setStatus("sent");
      form.reset();
    } catch {
      setError(`That didn't send. Email sam@216labs.dev or call (330) 604-7380 instead.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <h3>Got it.</h3>
        <p style={{ margin: 0 }}>
          Your note is in my inbox. I reply within one business day, usually sooner. If it&apos;s easier, grab a time on
          the calendar too.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false} aria-labelledby="form-title">
      <h3 id="form-title">Or send a note</h3>
      <div className="field">
        <label htmlFor="cf-service">What are you interested in?</label>
        <select id="cf-service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" required autoComplete="name" maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="cf-business">Business</label>
          <input id="cf-business" name="business" autoComplete="organization" maxLength={160} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-message">What&apos;s the problem?</label>
        <textarea
          id="cf-message"
          name="message"
          required
          maxLength={4000}
          placeholder="For example: we miss calls after 5pm, or our team answers the same spec questions all day."
        />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Leave this empty</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      <p className={`form-status${status === "error" ? " err" : ""}`} role="alert">
        {status === "error" ? error : ""}
      </p>
    </form>
  );
}
