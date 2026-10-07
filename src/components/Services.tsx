import { services } from "@/content/site";
import { BookingLink, NoteLink } from "./BookingLink";

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="shell section-grid">
        <p className="rail-label mono">What I build</p>
        <div>
          <div className="section-head reveal">
            <h2 id="services-title" className="display h2">
              Plain English, <br />
              real engineering.
            </h2>
            <p>
              The AI industry names everything like a research paper. Here is what each thing actually does for you.
              These are examples, not a menu: most projects start with a problem, not a product.
            </p>
          </div>

          <div className="svc-list">
            {services.map((s) => (
              <article key={s.id} id={s.id} className="svc reveal" aria-labelledby={`${s.id}-name`}>
                <div className="svc-tag mono">
                  <a href={`#${s.id}`} aria-label={`Link to ${s.name}`}>
                    #{s.id}
                  </a>
                </div>
                <p className="svc-jargon mono">
                  <span className="sr-only">What the industry calls it: </span>
                  <s>{s.jargon}</s>
                </p>
                <h3 id={`${s.id}-name`} className="display svc-name">
                  {s.name}
                </h3>
                {s.subtitle && <p className="svc-sub">{s.subtitle}</p>}
                <p className="svc-outcome">{s.outcome}</p>
                <div className="svc-detail">
                  <p>{s.detail}</p>
                  <ul aria-label="What you get">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <p className="svc-for">
                  <strong>Good fit for:</strong> {s.forWho}
                </p>
                <div className="svc-cta">
                  <BookingLink service={s.id} placement={`service-${s.id}`}>
                    Talk about this
                  </BookingLink>
                  <NoteLink service={s.id}>Or send a note</NoteLink>
                </div>
              </article>
            ))}
          </div>

          <div className="svc-unsure reveal">
            <p>
              <strong>Not sure which of these you need?</strong> That&apos;s normal. Half of the first call is working it
              out together.
            </p>
            <BookingLink placement="services-unsure">Book a call anyway</BookingLink>
          </div>
        </div>
      </div>
    </section>
  );
}
