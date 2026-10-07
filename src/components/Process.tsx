import { process } from "@/content/site";

export default function Process() {
  return (
    <section id="next" className="section" aria-labelledby="next-title">
      <div className="shell section-grid">
        <p className="rail-label mono">How it works</p>
        <div>
          <div className="section-head reveal">
            <h2 id="next-title" className="display h2">
              What happens next.
            </h2>
            <p>
              If you&apos;ve never bought AI work before, this is the whole process. No surprises, and nothing goes
              live until you&apos;ve approved what it says.
            </p>
          </div>
          <ol className="steps reveal">
            {process.map((p) => (
              <li key={p.when} className="step">
                <span className="mono step-when">{p.when}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
          <p className="async-note">
            I work in scheduled blocks, not on call. Most messages get a reply within one business day, everything I
            build is monitored, and anything that&apos;s down gets handled first.
          </p>
        </div>
      </div>
    </section>
  );
}
