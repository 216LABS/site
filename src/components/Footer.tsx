import Link from "next/link";
import { site } from "@/content/site";
import { PhoneLink } from "./BookingLink";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <p className="mono" style={{ margin: 0 }}>
          <span className="wordmark" style={{ fontSize: "1.3rem", marginRight: 12 }}>
            <b>216</b>Labs
          </span>
          AI engineering · {site.city}, {site.region}
        </p>
        <nav className="footer-links mono" aria-label="Footer">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <PhoneLink />
          <a href={site.linkedin} target="_blank" rel="me noopener">
            LinkedIn
          </a>
          {site.github && (
            <a href={site.github} target="_blank" rel="me noopener">
              GitHub
            </a>
          )}
          <Link href="/writing">Writing</Link>
          <a href="/llms.txt">llms.txt</a>
        </nav>
        <p className="mono muted" style={{ margin: 0 }}>
          © {new Date().getFullYear()} 216Labs
        </p>
      </div>
    </footer>
  );
}
