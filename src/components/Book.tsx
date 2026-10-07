import { founders, site } from "@/content/site";
import { BookingLink, PhoneLink } from "./BookingLink";
import ContactForm from "./ContactForm";

export default function Book() {
  return (
    <section id="book" className="section book" aria-labelledby="book-title">
      <div className="shell section-grid">
        <p className="rail-label mono">Talk to a person</p>
        <div className="book-grid">
          <div>
            <h2 id="book-title" className="display book-title">
              Start with <br />
              20 minutes.
            </h2>
            <p style={{ fontSize: "1.2rem", maxWidth: "46ch", margin: "0 0 28px" }}>
              Pick a time that works. Bring the problem, not a spec. You&apos;ll leave knowing whether AI is worth it
              for you, even if the answer is no.
            </p>
            <BookingLink placement="book-section">Book a 20-minute call</BookingLink>
            <dl className="contact-lines">
              <div>
                <dt className="mono muted">Phone</dt>
                <dd style={{ margin: 0 }}>
                  <PhoneLink />
                </dd>
              </div>
              {founders.map((f) => (
                <div key={f.id}>
                  <dt className="mono muted">{f.name.split(" ")[0]}</dt>
                  <dd style={{ margin: 0 }}>
                    <a href={`mailto:${f.email}`}>{f.email}</a>
                  </dd>
                </div>
              ))}
              <div>
                <dt className="mono muted">Based in</dt>
                <dd style={{ margin: 0 }}>
                  {site.city}, {site.regionName}. Working with businesses across the US.
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
