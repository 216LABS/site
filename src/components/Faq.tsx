import { faqs } from "@/content/site";

// Answer-first: each question is an H2, the direct answer comes first in
// under 50 words, and supporting detail follows. Mirrors the FAQPage JSON-LD.

export default function Faq() {
  return (
    <section id="faq" className="section" aria-label="Frequently asked questions">
      <div className="shell section-grid">
        <p className="rail-label mono">Questions</p>
        <div>
          <p className="display h2 reveal" style={{ marginBottom: "clamp(24px,4vw,48px)" }} aria-hidden="true">
            Straight answers.
          </p>
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
