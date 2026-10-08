// Conversion events. Meta Pixel fires when NEXT_PUBLIC_META_PIXEL_ID is set;
// every event is also pushed to window.dataLayer so GA4, Google Ads or LinkedIn
// can be wired later through Tag Manager without touching components.

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    dataLayer?: Record<string, unknown>[];
  }
}

function emit(event: string, params: Record<string, unknown>, metaEvent?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
  if (metaEvent && window.fbq) window.fbq("track", metaEvent, params);
}

/** Form submitted successfully. This is the primary conversion. */
export function trackLead(service: string) {
  emit("lead_submit", { content_category: service || "unspecified" }, "Lead");
}

/** Visitor clicked through to the booking page or tapped the phone number.
 *  Sent to Meta as "Contact", not "Schedule": a click is intent, not a booked call. */
export function trackBookingClick(service: string, placement: string) {
  emit("booking_click", { content_category: service || "unspecified", placement }, "Contact");
}

/** Visitor asked the demo chatbot a question. */
export function trackChatQuestion() {
  emit("chat_question", {}, undefined);
}

/** Visitor started the in-section voice demo. */
export function trackDemo(demo: string) {
  emit("demo_start", { content_category: demo }, undefined);
}
