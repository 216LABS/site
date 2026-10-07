import { founders, headings, site } from "@/content/site";
import { BookingLink, PhoneLink } from "./BookingLink";
import ContactForm from "./ContactForm";
import { RailLabel } from "./SectionHead";

export default function Book() {
  return (
    <section id="book" className="section book" aria-labelledby="book-title">
      <div className="shell section-grid">
        <RailLabel label="Talk to a person" />
        <div className="book-grid">
          <div>
            <p className="noise-line">
              <span className="sr-only">Instead of: </span>
              <s>{headings.book.noise}</s>
            </p>
            <h2 id="book-title" className="display book-title">
              {headings.book.signal}
            </h2>
            <p style={{ fontSize: "1.2rem", maxWidth: "40ch", margin: "0 0 28px" }}>
              Bring the problem, not a spec.
            </p>
            {site.bookingUrl ? (
              <BookingLink placement="book-section">Book a call</BookingLink>
            ) : (
              <PhoneLink className="btn btn-primary" />
            )}
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
                  {site.city}, {site.regionName}
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
