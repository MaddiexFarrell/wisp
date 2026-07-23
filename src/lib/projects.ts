export type Project = {
  name: string;
  url: string;
  image: string;
  category: string;
  year: string;
  blurb: string;
};

// Shared list of the sites shown in the Work section.
export const projects: Project[] = [
  {
    name: "Vultron",
    url: "https://www.vultron.ai/",
    image: "/work/Vultron.png",
    category: "Proposal AI",
    year: "2025",
    blurb:
      "A trusted, security-forward platform site for the #1 AI proposal engine — relied on by 400+ federal contractors.",
  },
  {
    name: "The Automation Company",
    url: "https://theautomationcompany.co/",
    image: "/work/theautomationcompany.png",
    category: "AI operations",
    year: "2026",
    blurb:
      "An editorial brand and site bringing enterprise-grade AI to the businesses that power the real economy.",
  },
  {
    name: "Anthea",
    url: "https://antheatalent.com/",
    image: "/work/AntheaNew.png",
    category: "Talent network",
    year: "2026",
    blurb:
      "A warm, human brand for a curated network hiring growth and marketing talent with real presence.",
  },
  {
    name: "Vector",
    url: "https://govector.ai/",
    image: "/work/Vector.png",
    category: "Startup studio",
    year: "2026",
    blurb:
      "A bold, cinematic identity and site for the startup studio backing founders who sell — high-energy and built to convert.",
  },
  {
    name: "Mira",
    url: "https://mira-site.onrender.com/",
    image: "/work/Mira.png",
    category: "AI chief of staff",
    year: "2026",
    blurb:
      "A calm, atmospheric site for an AI chief of staff that quietly runs your email and calendar.",
  },
];
