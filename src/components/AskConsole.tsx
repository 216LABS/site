import { sampleExchanges, suggestedQuestions } from "@/content/site";
import { kbLabels } from "@/lib/knowledge";
import AskChat from "./AskChat";

// Chatbot demo, rendered inside the #chatbot service card: a live support
// chatbot trained only on this site. The sample exchanges render on the server
// so crawlers and no-JS visitors see what the console does; AskChat hydrates
// the live input on top.

export default function AskConsole() {
  return (
    <div className="svc-demo">
      {/* Keeps old /#ask links (ads, emails, posts) landing on the chatbot. */}
      <span id="ask" aria-hidden="true" />
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
  );
}
