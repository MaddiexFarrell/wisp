"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { Aurora } from "../ui/aurora";
import { ButtonLink } from "../ui/button";
import { Magnetic } from "../ui/magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <Aurora />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] opacity-40" />

      <div className="relative mx-auto w-full max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted backdrop-blur">
            <Sparkles size={14} className="text-brand-2" />
            {site.tagline}
          </span>

          <h1 className="mt-7 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Websites that
            <br />
            <span className="text-gradient">think, ship, and sell.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {site.name} is an AI-native studio pairing world-class design with
            engineering and machine intelligence — so your site launches faster
            and works harder.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink href={site.cta.href} size="lg">
                {site.cta.label}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#work" size="lg" variant="outline">
              See our work
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="mt-16 md:mt-20"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Stylized "product" window that mimics an AI website builder in motion.
 * Swap this for a real <video> when brand footage is ready:
 *   <video src="/hero.mp4" autoPlay muted loop playsInline />
 */
function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute -inset-px rounded-4xl bg-[linear-gradient(120deg,var(--color-brand),var(--color-brand-2),var(--color-accent))] opacity-40 blur-md" />
      <div className="relative overflow-hidden rounded-4xl border border-border bg-surface/80 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-4 flex h-7 flex-1 items-center rounded-lg bg-background/60 px-3 font-mono text-xs text-muted">
            {site.domain}
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-[1.4fr_1fr] md:p-7">
          <div className="space-y-4">
            <div className="h-40 rounded-2xl bg-[linear-gradient(120deg,color-mix(in_oklab,var(--color-brand)_40%,transparent),color-mix(in_oklab,var(--color-brand-2)_40%,transparent))]" />
            <div className="space-y-2.5">
              <ShimmerBar className="w-3/4" />
              <ShimmerBar className="w-full" />
              <ShimmerBar className="w-5/6" />
            </div>
            <div className="flex gap-3 pt-1">
              <div className="h-9 w-28 rounded-full bg-foreground/90" />
              <div className="h-9 w-24 rounded-full border border-border" />
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-background/40 p-4">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-2">
              <Sparkles size={13} />
              AI copilot
            </div>
            {[
              "Generating layout…",
              "Writing hero copy…",
              "Optimizing for SEO…",
              "Shipping to production ✓",
            ].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 3,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-lg bg-surface-2/60 px-3 py-2 font-mono text-[11px] text-muted"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShimmerBar({ className }: { className?: string }) {
  return (
    <div
      className={`h-3 rounded-full bg-[linear-gradient(90deg,var(--color-surface-2),color-mix(in_oklab,var(--color-brand)_30%,var(--color-surface-2)),var(--color-surface-2))] bg-[length:200%_100%] animate-shimmer ${className ?? ""}`}
    />
  );
}
