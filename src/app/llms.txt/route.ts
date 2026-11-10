import { faqs, founders, outOfScope, process, services, site } from "@/content/site";
import { sitePages } from "@/content/pages";
import { publishedPosts } from "@/content/posts";

export const dynamic = "force-static";

// /llms.txt: a plain-text map of the site for language models, generated from
// the same content the page renders. Format follows llmstxt.org.
export function GET() {
  const posts = publishedPosts();
  const body = `# ${site.name}

> ${site.description}

${site.name} is an AI engineering practice based in Lakewood, Ohio, in the Cleveland area (${site.category}). Founded by Sam Filipiak, a software engineer who implements AI in small-business workflows and writes the code himself. Voice agents and chatbots are one entry service, not the whole practice. It is new and taking on its first client projects. There are no past client results to cite. ${outOfScope} No street address is published.

- Location: ${site.city}, ${site.region}, ${site.country}. In the Cleveland area. Meets Cleveland-area clients in person and works remotely with businesses across the US.
- Phone: ${site.phone}
- Email: ${site.email}
${site.bookingUrl ? `- Book a call: ${site.bookingUrl}\n` : ""}- Pricing: not published; depends on the project.

## Pages

${sitePages.map((p) => `- [${p.h1}](${site.url}${p.path}): ${p.summary}`).join("\n")}

## Services

${services
  .map(
    (s) =>
      `- [${s.name}](${site.url}${s.href ?? `/#${s.id}`}): ${s.outcome} ${s.subtitle ? `${s.subtitle} ` : ""}${s.detail}${s.forWho ? ` For: ${s.forWho}` : ""}`,
  )
  .join("\n")}

## How a project runs

${process.map((p) => `- ${p.when}: ${p.title}. ${p.body}`).join("\n")}

## FAQ

${faqs.map((f) => `- [${f.q}](${site.url}/#faq-${f.id}): ${f.a}`).join("\n")}

## People

${founders.map((f) => `- ${f.name}, ${f.role} (${f.email}): ${f.bio.join(" ")}`).join("\n")}

## Writing

${posts.length ? posts.map((p) => `- [${p.title}](${site.url}/writing/${p.slug}): ${p.summary}`).join("\n") : `- [Writing index](${site.url}/writing): technical notes on AI search visibility. No posts published yet.`}

## Optional

- [LinkedIn: Sam Filipiak](${site.linkedin})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
