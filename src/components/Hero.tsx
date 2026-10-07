import { proof, site } from "@/content/site";
import { BookingLink } from "./BookingLink";
import SignalTrace from "./SignalTrace";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <p className="hero-kicker mono">
          <span className="live">Taking first projects now</span>
          <span>
            {site.city}, {site.region} · 41.50°N 81.69°W
          </span>
          <span>Area code 216</span>
        </p>

        <h1 id="hero-title" className="hero-title">
          <span className="l1">AI is a lot.</span>
          <span className="l2">
            I&apos;ll make it <span className="hl">simple.</span>
          </span>
        </h1>

        <div className="hero-low">
          <div>
            <p className="hero-lede">
              Phone agents that never miss a call, chatbots that answer from your own docs, and getting your business
              recommended by ChatGPT. Built for Cleveland businesses by an engineer who spent seven years running a
              platform that handled 5 million messages a day.
            </p>
            <div className="hero-cta">
              <BookingLink placement="hero">Book a 20-minute call</BookingLink>
              <a className="btn btn-ghost" href="#ask">
                Try the live demo
              </a>
            </div>
          </div>
          <SignalTrace />
        </div>

        <dl className="proof">
          {proof.map((p) => (
            <div key={p.label}>
              <dt>{p.value}</dt>
              <dd className="mono">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
