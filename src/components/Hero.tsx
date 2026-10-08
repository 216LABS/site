import { heroNoise, site } from "@/content/site";
import { BookingLink } from "./BookingLink";
import SignalTrace from "./SignalTrace";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <p className="hero-kicker mono">
          <span className="live">Taking first projects</span>
          <span>
            {site.city}, {site.region} · Area code 216
          </span>
        </p>

        <p className="hero-noise" aria-label="AI jargon you can ignore">
          {heroNoise.map((n) => (
            <s key={n}>{n}</s>
          ))}
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
              Phone agents, chatbots and getting found by ChatGPT. Built in {site.city}, explained in plain English.
            </p>
            <div className="hero-cta">
              <BookingLink placement="hero">Book a call</BookingLink>
              <a className="btn btn-ghost" href="#voice">
                Try a live demo
              </a>
            </div>
          </div>
          <SignalTrace />
        </div>
      </div>
    </section>
  );
}
