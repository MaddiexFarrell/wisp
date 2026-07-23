"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/lib/site";
import { onIntroComplete } from "@/components/intro";
import { ButtonLink } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Hold the entrance until the intro overlay has finished, so the copy
  // animates in as the overlay clears instead of flashing in behind it.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const off = onIntroComplete(() => setEntered(true));
    // Safety net: never let the copy stay hidden if the signal is missed.
    const fallback = window.setTimeout(() => setEntered(true), 6500);
    return () => {
      off();
      clearTimeout(fallback);
    };
  }, []);

  // Scroll parallax: video drifts down, text lifts and fades away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };

  const materialize: Variants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 26, filter: "blur(18px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease },
    },
  };

  // Headline lines avoid an inline `filter` so the light-sweep text clip renders cleanly.
  const materializeText: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-start overflow-hidden bg-background"
    >
      {/* Looping video background with scroll parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.12]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/herobg2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content — left aligned */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full px-6 pt-32 md:px-12 md:pt-40"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={entered ? "show" : "hidden"}
          className="mx-auto flex max-w-6xl flex-col items-start text-left"
        >
          <h1 className="max-w-4xl font-display text-2xl font-light leading-[1.05] tracking-[-0.01em] text-balance text-[#161310] sm:text-3xl lg:text-4xl">
            <motion.span variants={materializeText} className="block">
              An AI-native design studio
            </motion.span>
            <motion.span variants={materializeText} className="block">
              helping early-stage companies look
            </motion.span>
            <motion.span variants={materializeText} className="block">
              as credible as the ideas behind them.
            </motion.span>
          </h1>

          <motion.div
            variants={materialize}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink
              href={site.cta.href}
              variant="solid-dark"
              size="lg"
              className="h-12"
            >
              {site.cta.label}
            </ButtonLink>
            <ButtonLink
              href="#work"
              variant="outline-dark"
              size="lg"
              className="h-12"
            >
              See our work
            </ButtonLink>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: entered ? 0.9 : 0, ease }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-foreground/70 backdrop-blur-sm"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
