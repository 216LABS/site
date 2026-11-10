// Single source of truth for site copy. The page, JSON-LD, /llms.txt and the
// "Ask this site" chatbot knowledge base are all generated from this file,
// so a change here updates every surface at once.
//
// Voice: short, plain English. Every heading pairs the industry's noise
// (struck through) with the plain signal.

export const site = {
  name: "216Labs",
  url: "https://www.216labs.dev",
  tagline: "AI is a lot. I'll make it simple.",
  description:
    "216Labs implements AI in small-business workflows: intake, quoting, follow-ups, scheduling, reporting, documents, and the tools you already use. Based in Lakewood, Ohio, in the Cleveland area. Plain English, real engineering.",
  category: "AI engineering and automation consultancy",
  phone: "(330) 604-7380",
  phoneE164: "+13306047380",
  email: "sam@216labs.dev",
  city: "Lakewood",
  region: "OH",
  regionName: "Ohio",
  country: "US",
  // Lakewood city center, not a street address.
  geo: { lat: 41.482, lng: -81.7982 },
  areaServed: ["Lakewood", "Cleveland", "Cuyahoga County", "Northeast Ohio", "Ohio", "United States"],
  // Google Calendar appointment-schedule booking page. Leave empty until you have one:
  // every "Book a call" button then jumps to the contact section instead.
  // Get it from Google Calendar > Create > Appointment schedule > open it > Share > copy link.
  // It looks like https://calendar.app.google/XXXXXXXX
  bookingUrl: "",
  linkedin: "https://www.linkedin.com/in/samuel-filipiak",
  github: "", // add a GitHub profile URL to show it in the footer
};

// Canonical paths for the service and location pages.
export const paths = {
  automation: "/ai-automation",
  consulting: "/ai-consulting-cleveland",
  voice: "/after-hours-voice-agent",
} as const;

export const heroLede =
  "I put AI into the work you already do: intake, quotes, follow-ups, documents, and the tools on your desk. Built in Lakewood, Ohio, explained in plain English.";

export const homeTitle = "AI Consulting & Workflow Automation in Cleveland, Ohio | 216Labs";
export const homeDescription =
  "AI consulting and workflow automation for Cleveland and Lakewood businesses. Intake, follow-ups, documents, scheduling, and the tools you already use. Built in Lakewood, Ohio. Plain English, real engineering.";
export const socialTitle = "AI is a lot. 216Labs makes it simple.";

// The jargon the hero strikes through before the headline.
export const heroNoise = [
  "agentic RAG pipelines",
  "vector embeddings",
  "LLM orchestration",
  "multimodal copilots",
  "fine-tuned foundation models",
  "AI transformation",
];

// Per-section heading pairs: what the industry would say, then what it means.
export const headings = {
  services: { noise: "End-to-end AI transformation solutions", signal: "What I build." },
  process: { noise: "Discovery, ideation and agile delivery framework", signal: "How it works." },
  about: { noise: "Our team of visionary thought leaders", signal: "Who you'll work with." },
  faq: { noise: "Comprehensive knowledge resources", signal: "Straight answers." },
  book: { noise: "Schedule a discovery session with our solutions team", signal: "Let's talk." },
};

export type ServiceId = "voice" | "chatbot" | "visibility" | "mcp" | "custom";

export type Service = {
  id: ServiceId;
  name: string;
  subtitle?: string;
  jargon: string; // what the industry calls it; shown struck through
  outcome: string; // the one concrete promise
  detail: string;
  forWho?: string;
  href?: string;
  hrefLabel?: string;
};

export const services: Service[] = [
  {
    id: "voice",
    name: "After-Hours Voice Agent",
    jargon: "Conversational voice AI with telephony integration and tool calling",
    outcome: "Never miss a call again.",
    detail: "It answers 24/7, books appointments, answers common questions and texts a follow-up.",
    forWho: "Contractors, clinics and small practices.",
    href: paths.voice,
    hrefLabel: "Read how an after-hours agent works",
  },
  {
    id: "chatbot",
    name: "Support & Knowledge Chatbot",
    jargon: "Retrieval-augmented generation with vector search and human-in-the-loop escalation",
    outcome: "Answers from your docs. Hands off the rest.",
    detail: "Trained on your docs, site and catalog. Predictable cost, and I run it for you.",
    forWho: "Software companies, manufacturers, distributors and associations.",
  },
  {
    id: "visibility",
    name: "AI Search Visibility",
    jargon: "Generative engine optimization with schema markup and citation monitoring",
    outcome: "Get recommended when customers ask ChatGPT.",
    detail:
      "Crawler access, structured data, pages shaped like answers, and tracking who gets cited instead of you.",
    forWho: "Any business customers find by searching.",
  },
  {
    id: "mcp",
    name: "MCP Integrations",
    subtitle: "Connect your systems to Claude and ChatGPT.",
    jargon: "Model Context Protocol servers with OAuth and typed tool schemas",
    outcome: "Ask AI about your business. Get your real numbers.",
    detail: "Your ERP, database or spreadsheets, usable by the AI tools your team already has.",
    forWho: "Distributors, manufacturers and software teams.",
  },
  {
    id: "custom",
    name: "Custom Build",
    jargon: "Bespoke agentic workflows and LLM orchestration pipelines",
    outcome: "Tell me the problem.",
    detail:
      "Workflow automation for the work you already do: intake, follow-ups, documents, scheduling, and connecting your tools. Document extraction, order intake, and internal search fit here too.",
    href: paths.automation,
    hrefLabel: "Read how an automation project works",
  },
];

export const serviceIds = services.map((s) => s.id);
export const serviceById = (id: string) => services.find((s) => s.id === id);

export type Faq = { id: string; q: string; a: string; detail?: string[] };

export const faqs: Faq[] = [
  {
    id: "wrong-answer",
    q: "What if the AI tells a customer something wrong?",
    a: "It only answers from content you approve, and it hands off to a person when it isn't sure. Wrong answers get engineered out, not covered with a disclaimer.",
    detail: [
      "Grounded. It answers from approved sources and can show which one it used.",
      "Escalates. Anything off-limits or uncertain goes to a person you choose.",
      "Reviewed. Conversations are logged so mistakes get caught and fixed.",
    ],
  },
  {
    id: "data",
    q: "Who owns our data?",
    a: "You do, and it isn't used to train AI models. The specifics go in writing before any work starts.",
  },
  {
    id: "existing-tools",
    q: "What if we already use a helpdesk or chat tool?",
    a: "Keep it. The AI can sit in front of what you already use and hand conversations into it.",
  },
  {
    id: "timeline",
    q: "How long until it's live?",
    a: "It depends on the project. You'll get a clear plan before any work starts.",
  },
  {
    id: "cancel",
    q: "What happens if we cancel?",
    a: "You keep your data and what was built for you. We agree on the handover up front.",
  },
  {
    id: "location",
    q: "Do you only work with Cleveland businesses?",
    a: "No. 216Labs is based in Lakewood, Ohio, in the Cleveland area. I meet Cleveland-area clients in person and work remotely with businesses anywhere in the US.",
  },
  {
    id: "where",
    q: "Are you in Cleveland or Lakewood?",
    a: "Lakewood, in the Cleveland area. The 216 area code is the name. I meet people in person around Cleveland and work remotely elsewhere.",
  },
  {
    id: "app-vs-custom",
    q: "How is this different from a monthly AI receptionist app?",
    a: "Those are self-serve products. I build a phone agent around your business: your hours, your services, the questions you actually get, and the handoff to a person when it is not sure. I run it with you. Pricing depends on the project, so it is not listed here.",
  },
];

// Ordered steps. No timeframes: every project gets its own plan.
export const process = [
  { when: "Talk", title: "Tell me the problem", body: "I'll tell you plainly whether AI is the right fix." },
  { when: "Build", title: "I build it", body: "A working version on your docs, calendar or systems." },
  { when: "Approve", title: "You sign off", body: "You test it and approve what it says." },
  { when: "Live", title: "It switches on", body: "And I keep watching it." },
];

export const outOfScope =
  "I do not take on real estate, mortgage, lending, title, or proptech projects.";

export const founders = [
  {
    id: "sam",
    name: "Sam Filipiak",
    role: "Founder, engineer",
    email: "sam@216labs.dev",
    bio: ["I'm a software engineer. I build AI systems that run in production every day, and I keep the explanations simple."],
    pull: "I write the code.",
  },
  {
    id: "kevin",
    name: "Kevin",
    role: "Infrastructure & systems",
    email: "kevin@216labs.dev",
    bio: ["Kevin handles what sits underneath the AI: hosting, databases, access and security."],
    pull: "",
  },
];

// Case studies render only when a real one exists (illustrative: false).
export type CaseStudy = {
  illustrative: boolean;
  service: ServiceId;
  client: string;
  title: string;
  before: { value: string; label: string };
  after: { value: string; label: string };
  body: string;
};

export const caseStudies: CaseStudy[] = [
  // {
  //   illustrative: false,
  //   service: "voice",
  //   client: "Client name or description",
  //   title: "One-line summary of the result",
  //   before: { value: "1 in 3", label: "calls went unanswered after hours" },
  //   after: { value: "0", label: "calls to voicemail" },
  //   body: "Two sentences on what was built.",
  // },
];

// Server-rendered sample exchanges for the "Ask this site" console. They show
// crawlers and no-JS visitors what the live chatbot does.
export const sampleExchanges = [
  {
    q: "We already use Zendesk. Do we have to switch?",
    a: "No. The chatbot can sit in front of Zendesk, answer what it can, and hand the rest into a ticket with the conversation attached.",
    sources: ["FAQ: existing tools", "Support & Knowledge Chatbot"],
    handoff: false,
  },
  {
    q: "What does the voice agent cost?",
    a: "Pricing depends on what it needs to do, so it isn't listed here. Sam can give you a real number.",
    sources: [],
    handoff: true,
  },
];

export const suggestedQuestions = [
  "What if it tells my customer something wrong?",
  "Can it work with our existing helpdesk?",
  "How would this help a parts distributor?",
];
