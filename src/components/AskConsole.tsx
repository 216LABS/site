import { sampleExchanges, suggestedQuestions } from "@/content/site";
import { kbLabels } from "@/lib/knowledge";
import AskChat from "./AskChat";

// Signature section: a live support chatbot trained only on this site.
// The sample exchanges render on the server so crawlers and no-JS visitors
// see what the console does; AskChat hydrates the live input on top.

export default function AskConsole() {
  return (
    <section id="ask" className="section ask" aria-labelledby="ask-title">
      <div className="shell section-grid">
        <p className="rail-label mono">Live demo</p>
        <div className="ask-grid">
          <div className="section-head reveal" style={{ marginBottom: 0 }}>
            <h2 id="ask-title" className="display h2">
              Ask this site anything.
            </h2>
            <p>
              This is the same kind of support chatbot I build for clients, running live and trained only on this
              website. Watch how it handles the hard part: it shows where each answer came from, and when it
              doesn&apos;t know, it says so and hands you to a person.
            </p>
            <dl className="ask-notes">
              <div>
                <dt>Grounded</dt>
                <dd>Answers only from approved content. Every answer lists its sources.</dd>
              </div>
              <div>
                <dt>Honest about gaps</dt>
                <dd>Out-of-scope questions get a handoff, not a guess. Try asking about pricing.</dd>
              </div>
              <div>
                <dt>Reviewed</dt>
                <dd>Questions are logged so answers can be checked and the content improved.</dd>
              </div>
            </dl>
          </div>

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
                {m.handoff && <p className="handoff">Handed to a person: book a call with Sam.</p>}
              </div>
            ))}
          </AskChat>
        </div>
      </div>
    </section>
  );
}
