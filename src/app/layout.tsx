import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { Intro } from "@/components/intro";
import "./globals.css";

// Söhne is self-hosted (see /public/fonts/soehne/ and @font-face in globals.css).
// It's used across the entire site — headlines, body copy, and UI text all share
// this one family. `--font-display`, `--font-sans`, and `--font-inter` are all
// aliased to Söhne in globals.css.

// Small uppercase labels / index numbers keep a distinct monospace accent.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI website studio",
    "AI-native websites",
    "web design",
    "product design",
    "next.js agency",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Intro />
        {children}
      </body>
    </html>
  );
}
