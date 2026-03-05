import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "216Labs | Custom AI Solutions — Cleveland, OH",
  description:
    "We build custom AI phone agents, sales tools, and automation systems for businesses in Cleveland and beyond. Not a template. Not a plugin. Real AI built for your business.",
  keywords: [
    "AI for businesses Cleveland",
    "AI receptionist Cleveland",
    "AI automation Ohio",
    "custom AI solutions",
    "AI phone agent",
    "216Labs",
  ],
  openGraph: {
    title: "216Labs | Custom AI Solutions — Cleveland, OH",
    description:
      "AI phone agents, sales tools, and automation systems for businesses that don't want to miss another customer.",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
