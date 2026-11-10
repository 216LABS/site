import { automationPage } from "@/content/pages";
import { faqs, founders, paths, services, site, type Service } from "@/content/site";

const ORG = `${site.url}/#org`;
const BUSINESS = `${site.url}/#business`;
const SAM = `${site.url}/#sam`;

const address = {
  "@type": "PostalAddress",
  addressLocality: site.city,
  addressRegion: site.region,
  addressCountry: site.country,
};

const sameAs = [site.linkedin, site.github].filter(Boolean);

const areaServed = () => site.areaServed.map((name) => ({ "@type": "Place" as const, name }));

function serviceNode(s: Service, serviceType?: string) {
  return {
    "@type": "Service" as const,
    "@id": `${site.url}/#${s.id}`,
    name: s.name,
    serviceType: serviceType ?? s.name,
    description: `${s.outcome} ${s.detail}`,
    ...(s.forWho ? { audience: { "@type": "BusinessAudience" as const, name: s.forWho } } : {}),
    provider: { "@id": ORG },
    areaServed: areaServed(),
    url: s.id === "voice" ? `${site.url}${paths.voice}` : `${site.url}/#${s.id}`,
  };
}

export function voiceServiceNode() {
  const voice = services.find((s) => s.id === "voice");
  if (!voice) throw new Error("missing voice service");
  return serviceNode(voice, "After-hours AI answering service");
}

export function automationServiceNode() {
  return {
    "@type": "Service" as const,
    "@id": `${site.url}${paths.automation}#service`,
    name: "AI Workflow Automation",
    serviceType: "AI workflow automation for small businesses",
    description: automationPage.summary,
    audience: { "@type": "BusinessAudience" as const, name: "Small businesses" },
    provider: { "@id": ORG },
    areaServed: areaServed(),
    url: `${site.url}${paths.automation}`,
  };
}

type PageSchema = {
  path: string;
  title: string;
  description: string;
  crumb: string;
  faqs: { q: string; a: string }[];
};

export function pageGraph(page: PageSchema, service?: { "@id": string }) {
  const url = `${site.url}${page.path}`;
  const breadcrumbId = `${url}#breadcrumb`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": BUSINESS },
        ...(service ? { mainEntity: { "@id": service["@id"] } } : {}),
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: page.crumb, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      ...(service ? [service] : []),
    ],
  };
}

export function homeJsonLd() {
  const sam = founders[0];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": ORG },
      },
      {
        "@type": "Organization",
        "@id": ORG,
        name: site.name,
        url: site.url,
        logo: `${site.url}/logo.svg`,
        email: site.email,
        telephone: site.phoneE164,
        description: site.description,
        address,
        founder: { "@id": SAM },
        sameAs,
        knowsAbout: [
          "AI workflow automation",
          "AI voice agents",
          "AI chatbots",
          "Retrieval-augmented generation",
          "Generative engine optimization",
          "Model Context Protocol",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS,
        name: site.name,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        telephone: site.phoneE164,
        email: site.email,
        description: site.description,
        address,
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        areaServed: areaServed(),
        parentOrganization: { "@id": ORG },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI engineering services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@id": `${site.url}/#${s.id}` },
          })),
        },
      },
      ...services.map((s) => (s.id === "voice" ? voiceServiceNode() : serviceNode(s))),
      {
        "@type": "Person",
        "@id": SAM,
        name: sam.name,
        jobTitle: "Founder and engineer",
        worksFor: { "@id": ORG },
        email: sam.email,
        sameAs: [site.linkedin],
        address,
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: [f.a, ...(f.detail ?? [])].join(" "),
          },
        })),
      },
    ],
  };
}

// Serialize safely for a <script type="application/ld+json"> tag.
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
