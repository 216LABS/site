import Link from "next/link";
import { site } from "@/content/site";
import { BookingLink } from "./BookingLink";
import ScrollSignal from "./ScrollSignal";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/#services", label: "What I build" },
  { href: "/#voice", label: "Live demos" },
  { href: "/#next", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/writing", label: "Writing" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell">
        <Link href="/" className="wordmark" aria-label="216Labs home">
          <b>216</b>Labs
        </Link>
        <nav className="nav mono" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <BookingLink placement="header">{site.bookingUrl ? "Book a call" : "Get in touch"}</BookingLink>
        </div>
      </div>
      <ScrollSignal />
    </header>
  );
}
