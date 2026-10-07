import { founders, headings, site } from "@/content/site";
import SectionHead, { RailLabel } from "./SectionHead";

export default function Founders() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell section-grid">
        <RailLabel label="Who you'll work with" />
        <div>
          <SectionHead id="about-title" {...headings.about} />
          <div className="people">
            {founders.map((f) => (
              <article key={f.id} className="person reveal" aria-labelledby={`p-${f.id}`}>
                <p className="mono muted" style={{ margin: 0 }}>
                  {f.role}
                </p>
                <h3 id={`p-${f.id}`} className="display person-name">
                  {f.name}
                </h3>
                <div className="prose">
                  {f.bio.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
                {f.pull && (
                  <p className="pull">
                    <em>{f.pull}</em>
                  </p>
                )}
                <p className="mono" style={{ marginTop: 18 }}>
                  <a className="link" href={`mailto:${f.email}`}>
                    {f.email}
                  </a>
                  {f.id === "sam" && (
                    <>
                      {"  ·  "}
                      <a className="link" href={site.linkedin} rel="me noopener" target="_blank">
                        LinkedIn
                      </a>
                    </>
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
