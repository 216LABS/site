import Link from "next/link";
import InnerPage, { Steps } from "@/components/InnerPage";
import { consultingPage, pageMetadata } from "@/content/pages";
import { outOfScope, paths } from "@/content/site";
import { pageGraph } from "@/lib/schema";

export const metadata = pageMetadata(consultingPage);

const planNote =
  "Timelines depend on the project. You'll get a clear plan before any work starts. Pricing depends on what it needs to do, so it is not listed here. I can give you a real number after we talk.";

export default function ConsultingPage() {
  return (
    <InnerPage
      crumb={consultingPage.crumb}
      title={consultingPage.h1}
      jsonLd={pageGraph(consultingPage)}
      faqs={consultingPage.faqs}
      lede={
        <>
          <p>
            216Labs is an AI engineering practice based in Lakewood, Ohio, in the Cleveland area. I help local
            businesses put AI into the work they already do: intake, follow-ups, documents, scheduling, and the tools
            on the desk. I write the code myself.
          </p>
          <p>
            If you want a strategy slide deck and a six-month roadmap, I am probably not the right fit. If you have a
            concrete problem — a step someone redoes every day, missed after-hours calls, the same support questions
            landing in a helpdesk, or customers asking ChatGPT and never hearing your name — I&apos;ll tell you plainly
            whether AI is the right fix, then build it.
          </p>
        </>
      }
    >
      <h2>What I build here</h2>
      <p>These are examples, not a menu. Most projects start with a problem, not a product.</p>
      <ul>
        <li>
          <strong>Workflow automation.</strong> Intake, quoting, follow-ups, scheduling, reporting, documents, and the
          handoff between tools you already use. <Link href={paths.automation}>See how an automation project works</Link>.
        </li>
        <li>
          <strong>After-hours voice agent.</strong> It answers 24/7, books appointments, answers common questions, and
          texts a follow-up. One way in, for contractors, clinics, and small practices.{" "}
          <Link href={paths.voice}>See how it works</Link>
          {" or "}
          <Link href="/#voice">try a live demo</Link>.
        </li>
        <li>
          <strong>Support and knowledge chatbot.</strong> Trained on your docs, site, and catalog. It answers what it
          can and hands the rest to a person. Built for software companies, manufacturers, distributors, and
          associations. <Link href="/#chatbot">See it on the homepage</Link>.
        </li>
        <li>
          <strong>AI search visibility.</strong> Crawler access, structured data, pages shaped like answers, and
          tracking who gets cited when customers ask ChatGPT.
        </li>
        <li>
          <strong>MCP integrations.</strong> Connect your ERP, database, or spreadsheets to Claude and ChatGPT so your
          team can ask about real numbers in the tools they already have.
        </li>
        <li>
          <strong>Custom work.</strong> If it is AI and it is real engineering, and it does not fit the list above, it
          still fits. Document extraction, order intake, internal search.
        </li>
      </ul>

      <h2>Where I work</h2>
      <p>
        I am based in Lakewood. I meet Cleveland-area clients in person and work remotely with businesses anywhere in
        the United States. I do not have a storefront, and I do not only work with Cleveland companies.
      </p>
      <p>{outOfScope}</p>

      <h2>How a project runs</h2>
      <Steps note={planNote} />

      <h2>Who you work with</h2>
      <p>
        You work with me, Sam Filipiak. I&apos;m a software engineer. I build AI systems that run in production, and I
        keep the explanations simple. Kevin handles what sits underneath: hosting, databases, access, and security.
      </p>
      <p>
        216Labs is new and is taking its first client projects. I do not have past client results to put on this page,
        and I will not invent them. You can{" "}
        <Link href="/#voice">talk to a sample after-hours agent</Link> on this site right now. It is a demo for a
        fictional painting company, not a client.
      </p>
    </InnerPage>
  );
}
