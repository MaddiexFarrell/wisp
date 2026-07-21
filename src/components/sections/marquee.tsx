const items = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "OpenAI",
  "Vercel",
  "Figma",
  "Sanity",
  "Stripe",
  "Supabase",
  "Render",
];

export function Marquee() {
  return (
    <section className="relative border-y border-border bg-surface/30 py-8">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
        The modern stack we build on
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {[...items, ...items].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-border bg-surface/50 px-5 py-2.5 text-sm text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-2" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
