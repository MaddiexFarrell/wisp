import {
  Blocks,
  BrainCircuit,
  LineChart,
  Palette,
  Rocket,
  Wand2,
} from "lucide-react";
import { SectionHeading } from "../ui/section-heading";
import { RevealGroup, RevealItem } from "../ui/reveal";

const services = [
  {
    icon: Wand2,
    title: "AI-native design",
    body: "Interfaces designed with generative tooling in the loop — faster iteration, sharper craft, zero template feel.",
  },
  {
    icon: Blocks,
    title: "Web engineering",
    body: "Production Next.js builds that are fast, accessible, and easy to maintain. Type-safe from database to pixel.",
  },
  {
    icon: BrainCircuit,
    title: "Applied intelligence",
    body: "Chat, search, personalization, and agents embedded into your product — grounded in your own content and data.",
  },
  {
    icon: Palette,
    title: "Brand & identity",
    body: "Naming, logo systems, and design languages that make you unmistakable across every surface.",
  },
  {
    icon: LineChart,
    title: "Growth & SEO",
    body: "Technical SEO, analytics, and conversion work so the site you launch keeps compounding.",
  },
  {
    icon: Rocket,
    title: "Launch & scale",
    body: "CI/CD, monitoring, and a handoff your team actually enjoys. We stick around after go-live.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="What we do"
          title="One studio, the whole stack."
          description="From first sketch to shipped product, we cover strategy, design, and engineering — with AI woven through every step."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.title}>
              <article className="group h-full rounded-3xl border border-border bg-surface/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-surface-2/60">
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background/50 text-brand-2 transition-colors group-hover:text-foreground">
                  <s.icon size={22} />
                </span>
                <h3 className="mt-5 text-xl font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
