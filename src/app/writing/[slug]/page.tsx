import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingLink } from "@/components/BookingLink";
import { postBySlug, publishedPosts } from "@/content/posts";
import { site } from "@/content/site";
import { jsonLdString } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Params) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url: `${site.url}/writing/${post.slug}`,
    author: { "@id": `${site.url}/#sam` },
    publisher: { "@id": `${site.url}/#org` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <Header />
      <main id="main">
        <article className="shell article">
          <p className="mono muted">
            <Link href="/writing" className="link">
              Writing
            </Link>{" "}
            · <time dateTime={post.date}>{post.date}</time>
          </p>
          <h1 className="display" style={{ fontSize: "clamp(2.6rem,8vw,6rem)", margin: "12px 0 24px" }}>
            {post.title}
          </h1>
          <div className="article-body">
            <p className="article-summary">{post.summary}</p>
            {post.body.map((b, i) => {
              switch (b.type) {
                case "h2":
                  return <h2 key={i}>{b.text}</h2>;
                case "ul":
                  return (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                case "code":
                  return (
                    <pre key={i}>
                      <code>{b.text}</code>
                    </pre>
                  );
                default:
                  return <p key={i}>{b.text}</p>;
              }
            })}
            <div className="svc-unsure" style={{ marginTop: 48 }}>
              <p>Want this checked on your own site?</p>
              <BookingLink service="visibility" placement={`post-${post.slug}`}>
                Book a call
              </BookingLink>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
