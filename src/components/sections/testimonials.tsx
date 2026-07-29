"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/testimonials";

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-[90vh] overflow-hidden"
    >
      {/* Background image — woman on right, space on left for cards */}
      <motion.div
        className="absolute inset-0"
        style={{ y: reduced ? 0 : bgY }}
      >
        <Image
          src="/footerbackground2.png"
          alt=""
          fill
          className="scale-110 object-cover object-right"
          priority={false}
        />
      </motion.div>

      {/* Gradient overlays for card readability */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-background via-background/85 via-55% to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent via-30% to-background/90"
      />

      {/* Soft ambient glow behind cards area */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[800px] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, color-mix(in oklab, var(--color-brand) 4%, transparent), transparent 70%)",
        }}
      />

      {/* Grain texture */}
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] items-center">
        <div className="w-full px-6 py-20 md:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header with decorative quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="relative mb-14 lg:mb-20"
          >
            {/* Large decorative quote mark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-[120px] leading-none text-brand/[0.08] sm:-left-4 sm:-top-10 sm:text-[160px] lg:-left-6 lg:-top-12 lg:text-[200px]"
            >
              &ldquo;
            </span>
            <h2 className="relative font-display text-3xl font-light leading-[1.1] tracking-[-0.015em] sm:text-4xl lg:text-5xl">
              Client stories.
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm text-muted sm:text-base">
              What founders say about working with us.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {testimonials.map((t, i) => (
              <motion.article
                key={t.company}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease,
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.35, ease },
                }}
                className={cn(
                  "group relative flex flex-col overflow-visible rounded-lg",
                  // Sophisticated dark card with subtle texture
                  "border-l-2 border-y border-r",
                  "border-l-brand/40 border-y-white/[0.04] border-r-white/[0.04]",
                  "bg-gradient-to-br from-surface via-surface/95 to-background",
                  // Dramatic shadows
                  "shadow-[0_1px_0_rgba(240,180,100,0.15)_inset,0_20px_60px_-15px_rgba(0,0,0,0.8),0_8px_20px_-8px_rgba(0,0,0,0.4)]",
                  "transition-all duration-500",
                  // Hover states - intensify brand accent
                  "hover:border-l-brand/70",
                  "hover:shadow-[0_1px_0_rgba(240,180,100,0.3)_inset,0_24px_80px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(240,180,100,0.1),0_0_40px_-10px_rgba(240,180,100,0.15)]",
                )}
              >
                {/* Corner brackets — matches the intro animation's viewfinder
                    frame: pure white arms with a soft luminous glow. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] drop-shadow-[0_0_12px_rgba(255,255,255,0.65)] drop-shadow-[0_0_26px_rgba(255,240,220,0.5)]"
                >
                  {/* Top left */}
                  <span
                    className="absolute -left-2 -top-2 h-[22px] w-[22px] border-l-2 border-t-2"
                    style={{ borderColor: "#fcfbf7" }}
                  />
                  {/* Top right */}
                  <span
                    className="absolute -right-2 -top-2 h-[22px] w-[22px] border-r-2 border-t-2"
                    style={{ borderColor: "#fcfbf7" }}
                  />
                  {/* Bottom left */}
                  <span
                    className="absolute -bottom-2 -left-2 h-[22px] w-[22px] border-b-2 border-l-2"
                    style={{ borderColor: "#fcfbf7" }}
                  />
                  {/* Bottom right */}
                  <span
                    className="absolute -bottom-2 -right-2 h-[22px] w-[22px] border-b-2 border-r-2"
                    style={{ borderColor: "#fcfbf7" }}
                  />
                </div>

                {/* Corner accent - geometric detail */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-20 w-20 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08]"
                  style={{
                    background:
                      "linear-gradient(225deg, var(--color-brand) 0%, transparent 70%)",
                  }}
                />

                {/* Inner content with padding */}
                <div className="relative flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                  {/* Large quote mark */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-2 top-1 select-none font-display text-[64px] leading-none text-brand/[0.12] sm:left-3 sm:top-2 sm:text-[72px] lg:text-[78px]"
                  >
                    &ldquo;
                  </span>

                  {/* Quote */}
                  <blockquote className="relative flex-1">
                    <p className="font-display text-[15.5px] font-light leading-[1.65] tracking-[-0.01em] text-foreground sm:text-base lg:text-[17px]">
                      {t.quote}
                    </p>
                  </blockquote>

                  {/* Attribution */}
                  <div className="mt-8 flex items-center gap-2.5">
                    <span aria-hidden className="h-px w-6 shrink-0 bg-white/20" />
                    <p className="font-sans text-[13px] leading-snug text-muted sm:text-sm">
                      <span className="font-medium text-foreground">{t.name}</span>
                      <span className="text-muted/70">
                        {" "}· {t.role}, {t.company}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Subtle ambient glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle, var(--color-brand-2) 0%, transparent 70%)",
                  }}
                />

                {/* Top edge highlight on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.article>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
