import Link from "next/link";
import InnerPage, { Steps } from "@/components/InnerPage";
import { automationPage, pageMetadata } from "@/content/pages";
import { outOfScope, paths } from "@/content/site";
import { automationServiceNode, pageGraph } from "@/lib/schema";

export const metadata = pageMetadata(automationPage);

const planNote =
  "You test it and approve what it does before it touches real customers. You keep your data and what was built for you if we stop working together. We agree on the handover up front. Timelines depend on the project. You'll get a clear plan before any work starts. Pricing depends on what it needs to do, so it is not listed here. I can give you a real number after we talk.";

export default function AutomationPage() {
  const service = automationServiceNode();
  return (
    <InnerPage
      crumb={automationPage.crumb}
      title={automationPage.h1}
      jsonLd={pageGraph(automationPage, service)}
      faqs={automationPage.faqs}
      lede={
        <>
          <p>
            AI workflow automation is software that does a repeatable step in the work a business already does. It can
            read an intake, draft a follow-up, move the details into a tool you already use, or set the next task on
            rules you approved. It should hand off to a person when it is not sure, and it should never invent a price,
            a policy, or a fact.
          </p>
          <p>
            216Labs builds that kind of automation for small businesses. I am based in Lakewood, Ohio, in the Cleveland
            area. This is custom work, not a self-serve app with a published monthly price.
          </p>
        </>
      }
    >
      <h2>What gets automated</h2>
      <p>These are examples, not a menu. Most projects start with one painful step.</p>
      <ul>
        <li>
          <strong>Intake.</strong> Forms, emails, and calls turned into a complete request in the tool you already use.
        </li>
        <li>
          <strong>Quoting.</strong> Gather the facts a quote needs and draft it for a person to approve. It does not
          invent a price.
        </li>
        <li>
          <strong>Follow-ups.</strong> The reminder, the status note, and the &quot;we got it&quot; message, on rules you
          set.
        </li>
        <li>
          <strong>Scheduling.</strong> Appointments and callbacks on your calendar rules.
        </li>
        <li>
          <strong>Reporting.</strong> A plain summary from the spreadsheet, database, or ERP you already have.
        </li>
        <li>
          <strong>Documents and email.</strong> Pull the fields out of a PDF, an invoice, or a thread and put them where
          they belong.
        </li>
        <li>
          <strong>The handoff between tools.</strong> Connect what you already run so a person is not retyping the same
          details into a second tool.
        </li>
      </ul>

      <h2>What it does not do</h2>
      <ul>
        <li>It does not replace the person who knows the trade or the customer.</li>
        <li>It does not invent prices, availability, or advice you have not approved.</li>
        <li>It does not mean throwing out the helpdesk, inbox, or spreadsheet you already use.</li>
        <li>
          It is not a generic app you switch on in an afternoon and forget. I build it around one workflow, and I keep
          watching it after it is live.
        </li>
      </ul>

      <h2>Where voice and chatbots fit</h2>
      <p>
        A phone agent or a support chatbot is one way into this work, when the problem starts with a missed call or the
        same questions landing in a helpdesk. There is a live sample of an after-hours agent on this site. It is a demo
        for a fictional painting company, not a client. If the problem is the paperwork between the call and the
        invoice, we start there instead.
      </p>
      <p>
        <Link href={paths.voice}>Read how an after-hours agent works</Link>
        {" · "}
        <Link href="/#voice">Talk to the sample</Link>
        {" · "}
        <Link href="/#chatbot">See the support chatbot</Link>
      </p>

      <h2>Who it is for</h2>
      <p>
        Small businesses with a step that repeats: contractors, clinics, distributors, manufacturers, software teams,
        and associations. If your work is different and the same problem applies, say so on the call.
      </p>
      <p>{outOfScope}</p>

      <h2>How an engagement works</h2>
      <Steps note={planNote} />
    </InnerPage>
  );
}
