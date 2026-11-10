import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaqList } from "@/components/Faq";
import { PhoneLink } from "@/components/BookingLink";
import { process, site, type Faq } from "@/content/site";
import { jsonLdString } from "@/lib/schema";

type Props = {
  crumb: string;
  title: string;
  lede: React.ReactNode;
  jsonLd: unknown;
  faqs: Faq[];
  children: React.ReactNode;
};

export default function InnerPage({ crumb, title, lede, jsonLd, faqs, children }: Props) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <Header />
      <main id="main">
        <div className="page-head">
          <div className="shell">
            <p className="mono muted">
              <Link href="/" className="crumb">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              {crumb}
            </p>
            <h1 className="display is-long">{title}</h1>
            <div className="prose page-lede">{lede}</div>
          </div>
        </div>
        <div className="shell page-body">
          <div className="prose-page">{children}</div>
          <div className="page-faqs">
            <p className="display page-questions">Questions</p>
            <FaqList items={faqs} />
          </div>
          <div className="prose-page page-close">
            <p>
              <Link href="/#book">Get in touch</Link>
              {" or call "}
              <PhoneLink />
              {". Email "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function Steps({ note }: { note?: string }) {
  return (
    <>
      <ol>
        {process.map((step) => (
          <li key={step.when}>
            <strong>{step.when}.</strong> {step.title}. {step.body}
          </li>
        ))}
      </ol>
      {note ? <p>{note}</p> : null}
    </>
  );
}
