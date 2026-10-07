import { founders, site } from "@/content/site";

export default function Founders() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell section-grid">
        <p className="rail-label mono">Who you&apos;ll work with</p>
        <div>
          <div className="section-head reveal">
            <h2 id="about-title" className="display h2">
              Engineers, not an agency.
            </h2>
          </div>
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
                    I&apos;m not a marketing agency reselling someone else&apos;s tools. <em>I write the code.</em>
                  </p>
                )}
                <ul className="stack" aria-label="Works with">
                  {f.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
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
