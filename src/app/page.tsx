import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AskConsole from "@/components/AskConsole";
import CaseStudies from "@/components/CaseStudy";
import Process from "@/components/Process";
import Founders from "@/components/Founders";
import Faq from "@/components/Faq";
import Book from "@/components/Book";
import Footer from "@/components/Footer";
import { homeJsonLd, jsonLdString } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(homeJsonLd()) }} />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <AskConsole />
        <CaseStudies />
        <Process />
        <Founders />
        <Faq />
        <Book />
      </main>
      <Footer />
    </>
  );
}
