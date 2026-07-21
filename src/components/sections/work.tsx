import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { RevealGroup, RevealItem } from "../ui/reveal";

const projects = [
  {
    name: "Helio",
    category: "AI energy platform",
    year: "2026",
    blurb:
      "A marketing site + dashboard for a climate-tech startup, with an AI assistant that explains your usage in plain language.",
    gradient:
      "linear-gradient(135deg,#7c5cff,#21d4fd)",
    span: "lg:col-span-2",
  },
  {
    name: "Atelier",
    category: "Fashion commerce",
    year: "2025",
    blurb: "Editorial storefront with AI styling and instant search.",
    gradient: "linear-gradient(135deg,#ff6ec7,#7c5cff)",
    span: "",
  },
  {
    name: "Northbeam",
    category: "B2B SaaS",
    year: "2025",
    blurb: "Full rebrand and site rebuild that doubled demo requests.",
    gradient: "linear-gradient(135deg,#21d4fd,#0b6efd)",
    span: "",
  },
  {
    name: "Quill",
    category: "AI writing tool",
    year: "2026",
    blurb:
      "Landing, docs, and an interactive playground — shipped in three weeks.",
    gradient: "linear-gradient(135deg,#f7b733,#ff6ec7)",
    span: "lg:col-span-2",
  },
];

export function Work() {
  return (
    <section id="work" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent launches."
            description="A few of the products and brands we've shaped. Yours could be next."
          />
        </div>

        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.name} className={p.span}>
              <a
                href="#contact"
                className="group relative flex h-full min-h-[20rem] flex-col justify-between overflow-hidden rounded-4xl border border-border bg-surface/40 p-7 transition-all duration-500 hover:border-white/15"
              >
                <div
                  className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: p.gradient }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

                <div className="relative flex items-start justify-between">
                  <span className="rounded-full border border-white/15 bg-background/40 px-3 py-1 font-mono text-xs text-foreground/90 backdrop-blur">
                    {p.category}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground"
                  />
                </div>

                <div className="relative">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-3xl font-semibold tracking-tight">
                      {p.name}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {p.year}
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                    {p.blurb}
                  </p>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
