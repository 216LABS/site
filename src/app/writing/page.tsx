import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingLink } from "@/components/BookingLink";
import { publishedPosts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical notes from 216Labs on getting cited in AI answers, AI crawler access, structured data, and building AI systems that don't make things up.",
  alternates: { canonical: "/writing" },
};

export default function WritingIndex() {
  const posts = publishedPosts();
  return (
    <>
      <Header />
      <main id="main">
        <div className="page-head">
          <div className="shell">
            <p className="mono muted">Writing</p>
            <h1 className="display">Field notes.</h1>
            <p style={{ fontSize: "1.2rem", maxWidth: "56ch", margin: "16px 0 0" }}>
              Technical write-ups on getting your business cited in AI answers, and on building AI that tells the truth.
            </p>
          </div>
        </div>
        <div className="shell" style={{ paddingBlock: "clamp(32px,6vw,72px)" }}>
          {posts.length ? (
            <ul className="post-list">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/writing/${p.slug}`}>
                    <span className="mono muted">
                      <time dateTime={p.date}>{p.date}</time>
                    </span>
                    <h2 className="display">{p.title}</h2>
                    <p style={{ margin: 0, maxWidth: "62ch" }}>{p.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p className="mono muted">Nothing published yet</p>
              <p style={{ fontSize: "1.15rem" }}>
                The first posts are in progress: how AI assistants decide which businesses to recommend, and how to check
                whether AI crawlers can read your site at all.
              </p>
              <p>Want to know where your business stands right now?</p>
              <div>
                <BookingLink service="visibility" placement="writing-empty">
                  Ask about AI search visibility
                </BookingLink>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
