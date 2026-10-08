import { headings, services, type ServiceId } from "@/content/site";
import { BookingLink, NoteLink } from "./BookingLink";
import AskConsole from "./AskConsole";
import SectionHead, { RailLabel } from "./SectionHead";
import VoiceDemo from "./VoiceDemo";

// Live demos rendered inside their service card.
const demos: Partial<Record<ServiceId, React.ReactNode>> = {
  voice: <VoiceDemo />,
  chatbot: <AskConsole />,
};

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="shell section-grid">
        <RailLabel label="What I build" />
        <div>
          <SectionHead id="services-title" {...headings.services}>
            <p>Examples, not a menu. Most projects start with a problem, not a product.</p>
          </SectionHead>

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
                <p className="svc-detail">{s.detail}</p>
                {s.forWho && <p className="svc-for mono">For: {s.forWho}</p>}
                {demos[s.id]}
                <div className="svc-cta">
                  <BookingLink service={s.id} placement={`service-${s.id}`}>
                    Talk about this
                  </BookingLink>
                  <NoteLink service={s.id}>Or send a note</NoteLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
