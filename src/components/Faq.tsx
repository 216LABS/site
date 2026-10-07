import { faqs, headings } from "@/content/site";
import SectionHead, { RailLabel } from "./SectionHead";

// Answer-first: each question is an H2 and the direct answer comes first.
// Mirrors the FAQPage JSON-LD.

export default function Faq() {
  return (
    <section id="faq" className="section" aria-label="Frequently asked questions">
      <div className="shell section-grid">
        <RailLabel label="Questions" />
        <div>
          <SectionHead id="faq-title" as="p" {...headings.faq} />
          <div className="faq">
            {faqs.map((f) => (
              <div key={f.id} id={`faq-${f.id}`} className="faq-item reveal">
                <h2 className="faq-q">{f.q}</h2>
                <div className="faq-a">
                  <p className="answer">{f.a}</p>
                  {f.detail && (
                    <ul>
                      {f.detail.map((d) => {
                        const [lead, ...rest] = d.split(". ");
                        return (
                          <li key={d}>
                            <strong>{lead}.</strong> {rest.join(". ")}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
