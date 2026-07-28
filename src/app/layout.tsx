import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { Intro } from "@/components/intro";
import "./globals.css";

// Söhne-style neo-grotesque (Inter is the closest free match) used across
// the entire site — headlines, body copy, and UI text all share this one
// family now. `--font-display` and `--font-inter` are aliased to it in
// globals.css so every existing font-display / font-sans / font-inter
// utility resolves to the same typeface without touching each component.
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

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
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Intro />
        {children}
      </body>
    </html>
  );
}
