// Single source of truth for site copy. The page, JSON-LD, /llms.txt and the
// "Ask this site" chatbot knowledge base are all generated from this file,
// so a change here updates every surface at once.

export const site = {
  name: "216Labs",
  url: "https://www.216labs.dev",
  tagline: "AI is a lot. I'll make it simple.",
  description:
    "216Labs builds AI phone agents, support chatbots, AI search visibility and MCP integrations for Cleveland businesses. Designed and coded by an engineer who ran a 5-million-message-a-day platform.",
  category: "AI engineering and automation consultancy",
  phone: "(330) 604-7380",
  phoneE164: "+13306047380",
  email: "sam@216labs.dev",
  city: "Cleveland",
  region: "OH",
  regionName: "Ohio",
  country: "US",
  geo: { lat: 41.4993, lng: -81.6944 },
  areaServed: ["Cleveland", "Cuyahoga County", "Ohio", "United States"],
  // Google Calendar appointment-schedule link goes here. The link supplied so far is a
  // calendar subscription link (?cid=), which visitors cannot book from. Swap it for the
  // "Booking page" link from Google Calendar > Appointment schedules > Share.
  bookingUrl:
    "https://calendar.google.com/calendar/u/0?cid=Y181ZmE4OTJmM2VlNTM5ZDVmZTMxZTRiZTNlZTdjY2I2M2VmMDFkNjI3YTJlYTEwZTQ0ZDlmMjdlYzVkYzc1ZTU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
  linkedin: "https://www.linkedin.com/in/samuel-filipiak",
  github: "", // add a GitHub profile URL to show it in the footer
};

export type ServiceId = "voice" | "chatbot" | "visibility" | "mcp" | "custom";

export type Service = {
  id: ServiceId;
  name: string;
  subtitle?: string;
  jargon: string; // what the industry calls it; shown struck through
  outcome: string; // the one concrete promise
  detail: string;
  forWho: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "voice",
    name: "After-Hours Voice Agent",
    jargon: "Conversational voice AI with telephony integration and tool calling",
    outcome: "Never miss a call again.",
    detail:
      "It answers your phone 24/7, books appointments straight onto your calendar, answers the questions you've approved, and texts the caller a follow-up. Home service businesses can miss a quarter to half of their inbound calls. Each one is a job that went to whoever picked up.",
    forWho: "HVAC, plumbing, electrical and roofing contractors. Dental, PT and chiropractic clinics. Small law and accounting practices.",
    deliverables: [
      "A phone line or overflow forwarding that always answers",
      "Booking on your existing calendar",
      "Follow-up texts with what was discussed",
      "A call log you can read in two minutes",
    ],
  },
  {
    id: "chatbot",
    name: "Support & Knowledge Chatbot",
    jargon: "Retrieval-augmented support agent with evaluation and human handoff",
    outcome: "Your docs answer the question before it becomes a ticket.",
    detail:
      "Trained on your documentation, website and product catalog. It answers customer and staff questions, shows where each answer came from, and hands anything it can't handle to a person. The cost is the same every month instead of a per-conversation meter, and I run it so you don't have to babysit it.",
    forWho: "B2B software companies with documentation. Manufacturers and distributors fielding parts and spec questions. Associations answering member questions.",
    deliverables: [
      "A chatbot on your site, help center or intranet",
      "A knowledge base you approve, line by line",
      "Escalation into your existing helpdesk or inbox",
      "A weekly review of what it got asked",
    ],
  },
  {
    id: "visibility",
    name: "AI Search Visibility",
    jargon: "Generative engine optimization, structured data and citation monitoring",
    outcome: "Be the name ChatGPT gives when someone asks who to call.",
    detail:
      "More buyers now ask ChatGPT, Claude, Perplexity or Google's AI Overviews for a recommendation instead of scrolling search results. This is technical work, not content marketing: make sure AI crawlers can read your site, describe your business in structured data, shape your pages so they answer the questions buyers ask, and track whether you get cited compared with your competitors.",
    forWho: "Any business customers find by searching: contractors, professional services firms, manufacturers, local services.",
    deliverables: [
      "Crawler access audit (robots.txt, CDN and firewall rules)",
      "Structured data for your business, services and FAQs",
      "Answer-first page structure and /llms.txt",
      "Monthly citation tracking against named competitors",
    ],
  },
  {
    id: "mcp",
    name: "MCP Integrations",
    subtitle: "Connect your systems to Claude and ChatGPT.",
    jargon: "Model Context Protocol servers with OAuth and typed tool schemas",
    outcome: "Ask Claude about your inventory and get your real numbers back.",
    detail:
      "MCP is the standard way to give AI assistants safe, controlled access to your own tools and data. I build the connector between your ERP, database, ticketing system or spreadsheets and the assistants your team already uses, with permissions that match who should see what.",
    forWho: "Distributors and manufacturers running an ERP. Software companies with an API. Teams whose real data lives in spreadsheets.",
    deliverables: [
      "An MCP server for your system, hosted or on-prem",
      "Read-only by default; write access only where you choose",
      "Per-user permissions and an audit log",
      "Setup for Claude, ChatGPT and your team's tools",
    ],
  },
  {
    id: "custom",
    name: "Custom Build",
    jargon: "Bespoke LLM pipelines and agentic workflows",
    outcome: "Tell me the problem. If it takes real engineering, I'll build it.",
    detail:
      "Some problems don't fit a category. If it involves AI and needs real engineering behind it, bring it here.",
    forWho: "Anyone with a repetitive, document-heavy or search-heavy process that eats hours every week.",
    deliverables: [
      "Document extraction from invoices, POs and spec sheets",
      "Order intake from email into your system",
      "Internal search across files, tickets and wikis",
      "Workflow automation with a person in the loop",
    ],
  },
];

export const serviceIds = services.map((s) => s.id);
export const serviceById = (id: string) => services.find((s) => s.id === id);

export type Faq = { id: string; q: string; a: string; detail?: string[] };

export const faqs: Faq[] = [
  {
    id: "wrong-answer",
    q: "What if the AI tells a customer something wrong?",
    a: "It can only answer from a knowledge base you approve, and it hands the conversation to a person when it isn't sure. Businesses have been held liable for what their chatbots say, so I treat wrong answers as an engineering problem, not something a disclaimer fixes.",
    detail: [
      "Grounded answers only. The AI answers from sources you have approved, and it can show which source it used.",
      "Topics it won't touch. Pricing exceptions, legal, medical or anything you list gets handed off, not improvised.",
      "A named escalation path. You decide who gets the handoff, by text, email or your helpdesk, and what the customer is told while they wait.",
      "Tested before launch. It has to pass a set of real questions from your business before it goes live.",
      "Reviewed after launch. Every conversation is logged, and I review them with you weekly for the first month.",
      "The precedent is real. In Moffatt v. Air Canada (2024), a tribunal held the airline responsible for a refund policy its chatbot made up.",
    ],
  },
  {
    id: "data",
    q: "Who owns our data, and is it used to train AI models?",
    a: "You own it. Your documents, call recordings and conversation logs belong to you, and you can take them with you. I build on AI providers' business APIs, which don't train on your data by default, and one client's data is never used for another.",
  },
  {
    id: "existing-tools",
    q: "What if we already use a helpdesk or chat tool?",
    a: "Keep it. The AI can sit in front of the tools you already use, such as Zendesk, Intercom, Freshdesk, HubSpot or a shared inbox, and hand conversations into them with the full history attached. Ripping out working tools is rarely the point.",
  },
  {
    id: "timeline",
    q: "How long until it's live?",
    a: "Most projects go live in two to three weeks. Week one is building the first working version. Week two is you testing it and approving what it says. Larger custom builds get a written timeline before any work starts.",
  },
  {
    id: "cancel",
    q: "What happens if we cancel?",
    a: "You keep your data and everything built specifically for you, including your knowledge base, configuration and call logs. I shut down the hosted pieces on a date we agree on and hand everything over in a format you can use elsewhere.",
  },
  {
    id: "availability",
    q: "Is someone around if something breaks?",
    a: "Yes. Everything I build is monitored, so I usually know about a problem before you do. I work in scheduled blocks rather than on call: most messages get a reply within one business day, and anything that's down is handled first.",
  },
  {
    id: "location",
    q: "Do you only work with Cleveland businesses?",
    a: "No. 216Labs is based in Cleveland and happy to meet in person around Cleveland, but the work itself is remote, so I work with businesses anywhere in the US.",
  },
];

export const process = [
  {
    when: "First call",
    title: "Twenty minutes, no prep",
    body: "You tell me what's eating your time or costing you customers. I tell you plainly whether AI is the right fix. Sometimes it isn't, and I'll say so.",
  },
  {
    when: "Week 1",
    title: "Scope it, then build it",
    body: "You get a one-page scope: what it will do, what it won't, and what it costs. You share the docs, calendar or system access it needs. I build the first working version.",
  },
  {
    when: "Week 2",
    title: "You test it. You approve it.",
    body: "You try it with real questions from your business. You sign off on every source it answers from, and we set the rules for what goes to a person and who that person is.",
  },
  {
    when: "Go-live",
    title: "Switched on, and watched",
    body: "It goes live on your phone line, site or tools. I watch the logs closely and review conversations with you weekly for the first month, in plain English.",
  },
];

export const founders = [
  {
    id: "sam",
    name: "Sam Filipiak",
    role: "Founder, engineer",
    email: "sam@216labs.dev",
    bio: [
      "I spent seven years at Trimble owning an enterprise telematics platform that processed about 5 million messages a day across roughly 50 enterprise accounts. Today I build document-parsing pipelines, MCP servers and agentic workflows that run in production at a fintech company.",
      "216Labs is where I build the same kind of systems for Cleveland businesses, without the enterprise price tag or the enterprise sales process.",
    ],
    pull: "I'm not a marketing agency reselling someone else's tools. I write the code.",
    stack: ["TypeScript", "Python", "Next.js", "Claude & OpenAI APIs", "MCP", "Twilio", "Google Cloud", "Postgres"],
  },
  {
    id: "kevin",
    name: "Kevin",
    role: "Infrastructure & systems",
    email: "kevin@216labs.dev",
    bio: [
      "Kevin's background is IT infrastructure and databases. On 216Labs projects he works on the parts underneath the AI: hosting, access control, backups, and keeping the systems it connects to locked down.",
    ],
    pull: "",
    stack: ["Infrastructure", "Databases", "Access control", "Backups"],
  },
];

export const proof = [
  { value: "5M", label: "messages a day on the platform I owned at Trimble" },
  { value: "7 yrs", label: "running enterprise production systems" },
  { value: "~50", label: "enterprise accounts on that platform" },
  { value: "0", label: "white-label chatbot platforms resold" },
];

// Case study slot. No client results exist yet, so the first entry is explicitly
// labeled as an illustration. Replace with a real project and set illustrative: false.
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
  {
    illustrative: true,
    service: "voice",
    client: "Example: a six-truck HVAC company",
    title: "What the after-hours voice agent is built to change",
    before: { value: "1 in 3", label: "inbound calls unanswered (industry estimates run 25–50%)" },
    after: { value: "Every call", label: "answered, booked or handed to the on-call tech" },
    body: "This is an illustration based on published missed-call rates for home service businesses, not a client result. 216Labs is taking on its first projects now, and the first real before-and-after numbers will replace this one.",
  },
];

// Server-rendered sample exchanges for the "Ask this site" console. They show
// crawlers and no-JS visitors what the live chatbot does.
export const sampleExchanges = [
  {
    q: "We already use Zendesk. Do we have to switch?",
    a: "No. The chatbot can sit in front of Zendesk, answer what it can from your approved knowledge base, and open a ticket with the full conversation attached when it can't.",
    sources: ["FAQ: existing tools", "Support & Knowledge Chatbot"],
    handoff: false,
  },
  {
    q: "What does the voice agent cost?",
    a: "Pricing depends on call volume and what it needs to connect to, so it isn't listed on the site. Sam can give you a real number on a 20-minute call.",
    sources: [],
    handoff: true,
  },
];

export const suggestedQuestions = [
  "What if it tells my customer something wrong?",
  "Can it work with our existing helpdesk?",
  "How would this help a parts distributor?",
  "Who actually writes the code?",
];
