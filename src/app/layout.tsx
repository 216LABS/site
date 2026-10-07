import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Atkinson_Hyperlegible_Next, Big_Shoulders, Martian_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "optional", // no metric overrides exist for this face; optional avoids any swap shift
});

const body = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const mono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false, // utility face; keep it off the critical path
});

const title = "216Labs | AI voice agents, chatbots & AI search visibility in Cleveland";
const description =
  "AI phone agents, support chatbots, AI search visibility and MCP integrations for Cleveland businesses. Built and coded by an engineer who ran a 5-million-message-a-day platform. No resold chatbot tools.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | 216Labs" },
  description,
  applicationName: site.name,
  authors: [{ name: "Sam Filipiak", url: site.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "AI is a lot. 216Labs makes it simple.",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI is a lot. 216Labs makes it simple.",
    description,
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  category: site.category,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ece5db" },
    { media: "(prefers-color-scheme: dark)", color: "#17100b" },
  ],
};

// Applies a saved theme choice before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.replace(/\D/g, "");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
