import { headings, sampleExchanges, suggestedQuestions } from "@/content/site";
import { kbLabels } from "@/lib/knowledge";
import AskChat from "./AskChat";
import SectionHead, { RailLabel } from "./SectionHead";

// Signature section: a live support chatbot trained only on this site.
// The sample exchanges render on the server so crawlers and no-JS visitors
// see what the console does; AskChat hydrates the live input on top.

export default function AskConsole() {
  return (
    <section id="ask" className="section ask" aria-labelledby="ask-title">
      <div className="shell section-grid">
        <RailLabel label="Live demo" />
        <div className="ask-grid">
          <SectionHead id="ask-title" {...headings.ask}>
            <p>
              The same kind of chatbot I build for clients, trained only on this site. It shows its sources, and when it
              doesn&apos;t know, it says so.
            </p>
          </SectionHead>

          <AskChat labels={kbLabels()} suggestions={suggestedQuestions}>
            <p className="mono console-sample-label">Sample exchanges</p>
            {sampleExchanges.map((m) => (
              <div key={m.q}>
                <p className="msg-q">{m.q}</p>
                <p className="msg-a">{m.a}</p>
                {m.sources.length > 0 && (
                  <div className="msg-meta mono">
                    Sources:
                    {m.sources.map((s) => (
                      <span key={s} className="chip chip-src">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {m.handoff && <p className="handoff">Handed to a person.</p>}
              </div>
            ))}
          </AskChat>
        </div>
      </div>
    </section>
  );
}
