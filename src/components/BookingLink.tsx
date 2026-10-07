"use client";

import { site } from "@/content/site";
import { trackBookingClick } from "@/lib/track";

type Props = {
  service?: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
};

/** Primary CTA. Opens the booking page in a new tab and records the click. */
export function BookingLink({ service = "", placement, className = "btn btn-primary", children }: Props) {
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() => trackBookingClick(service, placement)}
    >
      {children}
      <span className="arrow" aria-hidden="true">
        →
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export const SERVICE_EVENT = "216labs:service";

/** Secondary CTA. Jumps to the contact form with this service preselected. */
export function NoteLink({ service, children }: { service: string; children: React.ReactNode }) {
  return (
    <a
      href="#book"
      className="link"
      onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: service }))}
    >
      {children}
    </a>
  );
}

export function PhoneLink({ className = "" }: { className?: string }) {
  return (
    <a href={`tel:${site.phoneE164}`} className={className} onClick={() => trackBookingClick("", "phone")}>
      {site.phone}
    </a>
  );
}
