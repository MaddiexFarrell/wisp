import { site } from "@/lib/site";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const stats = [
  { value: "3–6 wk", label: "Typical launch time" },
  { value: "40+", label: "Products shipped" },
  { value: "98%", label: "Client return rate" },
  { value: "∞", label: "Iterations we sweat" },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Who we are"
          title={
            <>
              A senior studio built for the{" "}
              <span className="text-gradient">AI era.</span>
            </>
          }
          description={`${site.name} is a small team of designers and engineers who treat AI as a creative partner, not a gimmick. We take on a handful of projects at a time so every one gets obsessive attention.`}
        />

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-3xl border border-border bg-surface/40 p-7"
              >
                <div className="text-4xl font-semibold tracking-tight text-gradient">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-4xl px-5">
        <blockquote className="rounded-4xl border border-border bg-surface/40 p-10 text-center">
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            “They shipped a site that felt three years ahead of our competitors —
            in a month. The AI features actually work.”
          </p>
          <footer className="mt-6 text-sm text-muted">
            — Founder & CEO, seed-stage AI startup
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}
