import { caseStudies, serviceById, type CaseStudy as Study } from "@/content/site";

export function CaseStudyCard({ study }: { study: Study }) {
  const svc = serviceById(study.service);
  return (
    <article className="case reveal" aria-labelledby={`case-${study.service}`}>
      <header className="case-head">
        <div>
          <p className="mono muted" style={{ margin: 0 }}>
            {study.client}
            {svc ? ` · ${svc.name}` : ""}
          </p>
          <h3 id={`case-${study.service}`} className="display" style={{ fontSize: "1.8rem", margin: "6px 0 0" }}>
            {study.title}
          </h3>
        </div>
        {study.illustrative && <span className="mono case-flag">Illustration, not a client result</span>}
      </header>
      <div className="case-nums">
        <div className="case-num">
          <span className="mono muted">Before</span>
          <span className="v">{study.before.value}</span>
          <span className="muted">{study.before.label}</span>
        </div>
        <span className="case-arrow" aria-hidden="true">
          →
        </span>
        <div className="case-num after">
          <span className="mono muted">After</span>
          <span className="v">{study.after.value}</span>
          <span className="muted">{study.after.label}</span>
        </div>
      </div>
      <div className="case-body">
        <p>{study.body}</p>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  const real = caseStudies.filter((c) => !c.illustrative);
  return (
    <section id="results" className="section" aria-labelledby="results-title">
      <div className="shell section-grid">
        <p className="rail-label mono">Results</p>
        <div>
          <div className="section-head reveal">
            <h2 id="results-title" className="display h2">
              {real.length ? "Before and after." : "What changes."}
            </h2>
            {!real.length && (
              <p>
                216Labs is new, so there are no client case studies to show yet, and I won&apos;t invent any. Here is
                the kind of before-and-after number each project is built to move.
              </p>
            )}
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            {caseStudies.map((c) => (
              <CaseStudyCard key={c.title} study={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
