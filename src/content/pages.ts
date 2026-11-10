import type { Metadata } from "next";
import { faqs, paths, site, type Faq } from "@/content/site";
import { socialMeta } from "@/lib/meta";

// Page copy that has to stay in lockstep with JSON-LD, llms.txt, and the chatbot.
// Body paragraphs live in the page components. Titles, summaries, and FAQs live
// here so the structured data cannot drift from the visible answers.

export type PageFaq = Pick<Faq, "id" | "q" | "a">;

export type ContentPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  crumb: string;
  summary: string;
  priority: number;
  faqs: PageFaq[];
};

function sharedFaq(id: string): PageFaq {
  const found = faqs.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown faq: ${id}`);
  return { id: found.id, q: found.q, a: found.a };
}

const remoteAnswer =
  "No. I am based in Lakewood, in the Cleveland area, and I work remotely with businesses elsewhere in the US.";

const costAnswer =
  "Pricing depends on what it needs to do, so it is not listed here. I can give you a real number after we talk.";

export const automationPage: ContentPage = {
  path: paths.automation,
  title: "AI Workflow Automation for Small Businesses | 216Labs, Cleveland",
  description:
    "AI workflow automation for small businesses: intake, quoting, follow-ups, scheduling, reporting, and document handling, connected to the tools you already use. Lakewood, Ohio, in the Cleveland area.",
  h1: "AI workflow automation for small businesses",
  crumb: "AI workflow automation",
  summary:
    "Custom AI that takes a repeatable step in a small-business workflow: intake, follow-ups, documents, scheduling, and the handoff between tools you already use.",
  priority: 0.9,
  faqs: [
    {
      id: "what-is",
      q: "What is AI workflow automation?",
      a: "Software that does a repeatable step in the work you already do: reading an intake, drafting a follow-up, moving details into a tool you use, or setting the next task on rules you approved. It should hand the rest to a person when it is not sure.",
    },
    {
      id: "replace-staff",
      q: "Will this replace my staff?",
      a: "No. It takes the routine step. The person who knows the job still makes the call that needs judgment.",
    },
    {
      id: "wrong",
      q: "What if it does something wrong?",
      a: "It only acts on rules and content you approve, and it hands off when it is not sure. You can read what it did, and wrong steps get engineered out.",
    },
    {
      id: "replace-tools",
      q: "Do I have to replace the tools I already use?",
      a: "No. The point is to connect them. We look at what you already use and decide. The specifics go in the plan before work starts.",
    },
    {
      id: "where-remote",
      q: "Do you only work with Cleveland-area businesses?",
      a: remoteAnswer,
    },
    {
      id: "cost",
      q: "What does it cost?",
      a: costAnswer,
    },
    {
      id: "receptionist",
      q: "Is this an AI receptionist?",
      a: "Not by itself. An after-hours phone agent is one service, for when the problem is missed calls. Workflow automation is the broader work: intake, follow-ups, documents, and the handoff between tools.",
    },
  ],
};

export const consultingPage: ContentPage = {
  path: paths.consulting,
  title: "AI Consulting in Cleveland, Ohio | Workflow Automation for Small Businesses | 216Labs",
  description:
    "AI consulting for Cleveland and Lakewood businesses. I implement AI in the workflows you already run: intake, follow-ups, documents, scheduling, and the tools on your desk. Built in Lakewood. Plain English.",
  h1: "AI consulting and workflow automation for Cleveland and Lakewood businesses",
  crumb: "AI consulting in Cleveland",
  summary:
    "AI consulting for Cleveland and Lakewood businesses: workflow automation, with phone agents and chatbots as one way in. Built in Lakewood.",
  priority: 0.9,
  faqs: [
    sharedFaq("location"),
    sharedFaq("where"),
    sharedFaq("app-vs-custom"),
    sharedFaq("wrong-answer"),
    sharedFaq("timeline"),
  ],
};

export const voicePage: ContentPage = {
  path: paths.voice,
  title: "After-Hours AI Answering Service for Contractors | 216Labs, Cleveland",
  description:
    "An after-hours AI phone agent that answers calls, books appointments, and texts a follow-up. Built for contractors, clinics, and small practices. Lakewood, Ohio. Try a live demo.",
  h1: "After-hours AI phone agents for contractors, clinics, and small practices",
  crumb: "After-hours voice agent",
  summary:
    "An after-hours AI phone agent that answers, books, and texts a follow-up for contractors, clinics, and small practices. One service, not the whole practice.",
  priority: 0.8,
  faqs: [
    {
      id: "what-is",
      q: "What is an after-hours AI phone agent?",
      a: "A voice assistant on your business line that answers when you cannot. It can take the call, ask your usual questions, book an appointment or callback, and text a follow-up. It should only say what you have approved, and it should hand off to a person when it is not sure.",
    },
    {
      id: "same-as-app",
      q: "Is this the same as an AI receptionist app?",
      a: "No. Those are self-serve products, often priced by the month. I build an agent around your business and run it with you. Pricing depends on the project and is not listed here.",
    },
    {
      id: "wrong",
      q: "Will it tell a customer the wrong thing?",
      a: "It only answers from content you approve, and it hands off when it is not sure. Conversations are logged so mistakes get caught and fixed.",
    },
    {
      id: "replace-phone",
      q: "Do I have to replace my current phone system or answering service?",
      a: "Not necessarily. We will look at what you already use and decide. The specifics go in the plan before work starts.",
    },
    {
      id: "where-remote",
      q: "Do you only work with Cleveland-area businesses?",
      a: remoteAnswer,
    },
    {
      id: "cost",
      q: "What does it cost?",
      a: costAnswer,
    },
  ],
};

export const sitePages: ContentPage[] = [automationPage, consultingPage, voicePage];

export function pageMetadata(page: ContentPage): Metadata {
  const url = `${site.url}${page.path}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    ...socialMeta({ title: page.title, description: page.description, url }),
  };
}
