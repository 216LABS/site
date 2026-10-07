import { headings, process } from "@/content/site";
import SectionHead, { RailLabel } from "./SectionHead";

export default function Process() {
  return (
    <section id="next" className="section" aria-labelledby="next-title">
      <div className="shell section-grid">
        <RailLabel label="How it works" />
        <div>
          <SectionHead id="next-title" {...headings.process}>
            <p>Nothing goes live until you&apos;ve approved what it says.</p>
          </SectionHead>
          <ol className="steps reveal">
            {process.map((p) => (
              <li key={p.when} className="step">
                <span className="mono step-when">{p.when}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
