/**
 * Central place for brand + copy. Rename the studio, tweak messaging, or swap
 * links here and it flows through the whole site.
 */
const email = "hello@wispstudio.com";

// Primary conversion action — hero, nav, and footer all point here.
const calendly = "https://calendly.com/maddiefarrell7/30min";

export const site = {
  name: "Wisp Studio",
  shortName: "Wisp",
  domain: "wispstudio.com",
  email,
  calendly,
  tagline: "A website design & build studio",
  description:
    "Wisp Studio designs and builds atmospheric websites — cinematic, considered, and quietly unforgettable. Strategy, design, and engineering under one roof.",
  location: "Remote · Working worldwide",
  social: {
    x: "https://x.com",
    linkedin: "https://www.linkedin.com/in/madeline-farrell7/",
    github: "https://github.com",
    dribbble: "https://dribbble.com",
  },
  nav: [{ label: "Work", href: "#work" }],
  cta: {
    label: "Book a call",
    href: calendly,
  },
} as const;

export type Site = typeof site;
