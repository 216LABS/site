"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { trackBookingClick } from "@/lib/track";

type Props = {
  service?: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
};

export const SERVICE_EVENT = "216labs:service";

/** Primary CTA. Opens the booking page in a new tab. Until a booking page is set
 *  in site.ts, it jumps to the contact section (with the service preselected). */
export function BookingLink({ service = "", placement, className = "btn btn-primary", children }: Props) {
  const onClick = () => {
    if (site.bookingUrl) trackBookingClick(service, placement);
    else if (service) window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: service }));
  };
  const content = (
    <>
      {children}
      <span className="arrow" aria-hidden="true">
        →
      </span>
      {site.bookingUrl && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  if (!site.bookingUrl) {
    return (
      <Link href="/#book" className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <a href={site.bookingUrl} target="_blank" rel="noopener" className={className} onClick={onClick}>
      {content}
    </a>
  );
}

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
