import { SectionHeading } from "../ui/section-heading";
import { RevealGroup, RevealItem } from "../ui/reveal";

const steps = [
  {
    no: "01",
    title: "Discover",
    body: "We dig into your goals, users, and market. A week of research and strategy that sets the direction.",
  },
  {
    no: "02",
    title: "Design",
    body: "Rapid, AI-assisted design sprints. You see real, clickable directions in days — not weeks of static mockups.",
  },
  {
    no: "03",
    title: "Build",
    body: "Production engineering in parallel with design. Type-safe, tested, and deployed to a live preview from day one.",
  },
  {
    no: "04",
    title: "Launch & grow",
    body: "We ship, measure, and iterate. Analytics, SEO, and experiments keep the momentum going after go-live.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative border-y border-border bg-surface/20 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="How we work"
          title="A process built for speed."
          description="Small senior team, tight loops, and AI leverage at every step. Most projects go live in 3–6 weeks."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <RevealItem key={step.no}>
              <div className="group h-full bg-background p-8 transition-colors duration-300 hover:bg-surface-2/60">
                <span className="font-mono text-sm text-brand-2">
                  {step.no}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
