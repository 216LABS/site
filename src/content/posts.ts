// Writing section. Add a post by appending to `posts`. `body` is an array of
// blocks so posts stay server-rendered with no MDX dependency.
// Posts with draft: true are excluded from the index, sitemap and llms.txt.

import { paths } from "@/content/site";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string }
  | { type: "link"; href: string; label: string };

export type Post = {
  slug: string;
  title: string;
  summary: string; // answer-first: the post's conclusion in under 50 words
  date: string; // YYYY-MM-DD
  draft?: boolean;
  cta?: { text: string; label: string; service?: string; href?: string; hrefLabel?: string };
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "what-ai-workflow-automation-can-and-cannot-do",
    title: "What AI workflow automation can and cannot do for a small business",
    summary:
      "It can take a repeatable step: read the intake, draft the follow-up, put the details in the tool you already use. It cannot know your trade, and it should never invent a price or a policy. A plain check before you turn one on.",
    date: "2026-11-10",
    cta: {
      text: "Want this looked at for your own business?",
      label: "Get in touch",
      service: "custom",
      href: paths.automation,
      hrefLabel: "How an automation project works",
    },
    body: [
      {
        type: "p",
        text: "If you run a small business, you already know the retyping problem. A request comes in by email, phone, or a form. Someone copies it into a spreadsheet, a helpdesk, or the software you actually run the job in. Then someone has to remember the follow-up.",
      },
      {
        type: "p",
        text: "AI workflow automation is software that does one of those repeatable steps and stops where a person should decide. Used well, it takes the routine part and leaves a record. Used badly, it guesses a price, writes a policy you never approved, or hides what it did. This is how to tell the difference.",
      },
      { type: "h2", text: "What it can do" },
      {
        type: "ul",
        items: [
          "Read an intake email, form, or note and pull out the fields you care about.",
          "Put those details into the spreadsheet, helpdesk, or other system you already use.",
          "Draft a follow-up, a status note, or a quote for a person to send.",
          "Book a callback or an appointment on rules you set.",
          "Hand the step to a person when the request is off-limits, unusual, or unclear.",
        ],
      },
      { type: "h2", text: "What it should not do" },
      {
        type: "ul",
        items: [
          "Invent a price, a lead time, or a policy you have not approved.",
          "Pretend to be the person who knows the trade or the customer.",
          "Keep going when the customer is upset or the situation is unsafe. That should go to you.",
          "Run with no transcript, no log, and nobody responsible for it.",
        ],
      },
      { type: "h2", text: "A short test before you turn one on" },
      {
        type: "p",
        text: "Take two real examples from your own shop. One ordinary. One slightly unfair: a request you don't even offer, or a customer who wants a number you would never give on the first call. You want three things. It stays inside what you approved. It hands off cleanly. You can read what it did afterward. If you cannot see what it did, do not put it on a customer workflow.",
      },
      {
        type: "p",
        text: "There are self-serve products, and there is custom work built around one business. Either can be fine. The product is faster to switch on. The custom build is for when your steps, your tools, and your handoff rules don't fit a generic script. In both cases you should see it run, approve what it does, and know who is responsible when it is wrong.",
      },
      {
        type: "p",
        text: "I build this kind of automation at 216Labs, from Lakewood, Ohio, in the Cleveland area. An after-hours phone agent is one way in, when the workflow starts with a missed call. It is not the whole practice. There is a live sample on the site, a fictional painting company, not a client, if you want to hear a phone agent before we talk. Pricing depends on the project, so it is not listed here.",
      },
      { type: "link", href: paths.automation, label: "How an automation project works" },
    ],
  },
];

export const publishedPosts = () =>
  posts.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));

export const postBySlug = (slug: string) => publishedPosts().find((p) => p.slug === slug);
