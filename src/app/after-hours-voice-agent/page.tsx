import Link from "next/link";
import InnerPage, { Steps } from "@/components/InnerPage";
import { pageMetadata, voicePage } from "@/content/pages";
import { outOfScope, paths } from "@/content/site";
import { pageGraph, voiceServiceNode } from "@/lib/schema";

export const metadata = pageMetadata(voicePage);

const planNote =
  "You test it and approve what it says before it answers real customers. You keep your data and what was built for you if we stop working together. We agree on the handover up front.";

export default function VoiceAgentPage() {
  const service = voiceServiceNode();
  return (
    <InnerPage
      crumb={voicePage.crumb}
      title={voicePage.h1}
      jsonLd={pageGraph(voicePage, service)}
      faqs={voicePage.faqs}
      lede={
        <>
          <p>
            An after-hours AI phone agent is a voice assistant on your business line that answers when you cannot. It
            can take the call, ask the questions you would ask, book an appointment or a callback, and text a
            follow-up. It should hand off to a person when it is not sure, and it should only say things you have
            approved.
          </p>
          <p>
            216Labs builds that kind of agent for contractors, clinics, and small practices. I am based in Lakewood,
            Ohio, in the Cleveland area. This is custom work, not a self-serve app with a published monthly price.
          </p>
          <p>
            It is one service, not the whole practice. When the problem is the work around the call, start with{" "}
            <Link href={paths.automation}>AI workflow automation</Link>.
          </p>
        </>
      }
    >
      <h2>What it does</h2>
      <ul>
        <li>Answers 24/7, including nights, weekends, and when you are on a job.</li>
        <li>Books appointments and callbacks on the rules you set.</li>
        <li>Answers common questions from a script and sources you approve.</li>
        <li>Texts a follow-up so the caller is not left hanging.</li>
        <li>Hands off to a person you choose when the request is off-limits or unclear.</li>
        <li>Logs the conversation so mistakes can be found and fixed.</li>
      </ul>

      <h2>What it does not do</h2>
      <ul>
        <li>
          It does not replace a skilled estimator or a clinician. It takes the call and the routine work, then gets the
          rest to you.
        </li>
        <li>It does not invent prices, availability, or advice you have not approved.</li>
        <li>
          It is not a generic AI receptionist you turn on in 10 minutes and forget. I build it around your business and
          I keep watching it after it is live.
        </li>
      </ul>

      <h2>Who it is for</h2>
      <p>
        Contractors (including trades like HVAC, painting, and similar home-service shops), clinics, and small practices
        that miss calls after hours. If your work is different and the same problem applies, say so on the call.
      </p>
      <p>{outOfScope}</p>

      <h2>How this is different</h2>
      <p>
        There are many products that sell an AI receptionist by the month. Some of them are fine. 216Labs is a custom
        build: your hours, your services, your handoff rules, running on your line, with a person (me) responsible for
        what it says. I will tell you if a product is a better fit than a custom agent. Pricing depends on the project,
        so it is not listed here. I can give you a real number after we talk.
      </p>

      <h2>How a project runs</h2>
      <Steps note={planNote} />

      <h2>Hear one</h2>
      <p>
        There is a live demo on this site: a sample after-hours agent for a fictional painting company called Brickline.
        It is a sample, not a client. <Link href="/#voice">Talk to it</Link> (uses your microphone, a few minutes).
        Then <Link href="/#book">get in touch</Link> if you want one built for your line.
      </p>
    </InnerPage>
  );
}
