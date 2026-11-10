import type { Metadata } from "next";
import { site } from "@/content/site";

export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "216Labs: AI is a lot. I'll make it simple. AI engineering in Lakewood, Ohio.",
};

type SocialOpts = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  publishedTime?: string;
};

// Child routes that set openGraph replace the root image, so pass the shared card back in.
export function socialMeta({ title, description, url, type = "website", publishedTime }: SocialOpts): Metadata {
  return {
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [ogImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
