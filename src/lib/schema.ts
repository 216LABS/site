import { faqs, founders, services, site } from "@/content/site";

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
          "AI voice agents",
          "AI chatbots",
          "Retrieval-augmented generation",
          "Generative engine optimization",
          "Model Context Protocol",
          "Workflow automation",
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
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
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
      ...services.map((s) => ({
        "@type": "Service",
        "@id": `${site.url}/#${s.id}`,
        name: s.name,
        serviceType: s.name,
        description: `${s.outcome} ${s.detail}`,
        audience: { "@type": "BusinessAudience", name: s.forWho },
        provider: { "@id": ORG },
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
        url: `${site.url}/#${s.id}`,
      })),
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
