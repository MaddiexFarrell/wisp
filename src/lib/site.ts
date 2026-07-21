/**
 * Central place for brand + copy. Rename the studio, tweak messaging, or swap
 * links here and it flows through the whole site.
 */
export const site = {
  name: "Nova Studio",
  shortName: "Nova",
  domain: "novastudio.com",
  email: "hello@novastudio.com",
  tagline: "The AI-native website studio",
  description:
    "Nova Studio designs and ships AI-native websites — fast, beautiful, and built to think. Strategy, design, and engineering under one roof.",
  location: "Remote · Working worldwide",
  social: {
    x: "https://x.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    dribbble: "https://dribbble.com",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
  ],
  cta: {
    label: "Start a project",
    href: "#contact",
  },
} as const;

export type Site = typeof site;
