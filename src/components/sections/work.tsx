"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/projects";
import { Reveal } from "../ui/reveal";

// Clean framed screenshot — bordered card, no browser chrome.
const frame =
  "overflow-hidden rounded-xl border border-white/10 bg-surface-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]";

// Editorial index: a big serif list of names with a screenshot preview that
// floats alongside the cursor on hover. Falls back to inline thumbnails on
// touch / small screens.
export function Work() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  // Keep the last-hovered project so the preview can fade out gracefully.
  const [last, setLast] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.5 });

  function onMove(e: React.MouseEvent) {
    mx.set(e.clientX);
    my.set(e.clientY);
  }

  return (
    <section
      id="work"
      className="relative overflow-hidden py-28"
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={() => setActive(null)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_50%_at_70%_40%,color-mix(in_oklab,var(--color-brand)_10%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-soft-light"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="font-display text-2xl font-light leading-[1.05] tracking-[-0.01em] text-balance sm:text-3xl lg:text-4xl">
            Recent launches.
          </h2>
        </Reveal>

        <ul className="mt-14 border-t border-border">
          {projects.map((p, i) => {
            const dimmed = active !== null && active !== i;
            return (
              <li key={p.name} className="border-b border-border">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => {
                    setActive(i);
                    setLast(i);
                  }}
                  className={cn(
                    "group flex items-center gap-5 py-6 transition-all duration-500 lg:py-8",
                    dimmed ? "opacity-35" : "opacity-100",
                  )}
                >
                  <span className="w-10 shrink-0 font-mono text-xs text-muted transition-colors group-hover:text-brand">
                    0{i + 1}
                  </span>

                  <h3
                    className={cn(
                      "flex-1 font-display text-3xl font-normal tracking-tight transition-all duration-500 sm:text-4xl lg:text-6xl",
                      "group-hover:text-brand group-hover:lg:translate-x-3",
                    )}
                  >
                    {p.name}
                  </h3>

                  <span className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-muted sm:block">
                    {p.category}
                  </span>

                  <ArrowUpRight
                    className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                    size={26}
                  />
                </a>

                {/* Mobile / no-pointer fallback: inline thumbnail.
                    next/image lazy-loads + serves resized WebP so mobile
                    isn't downloading multi-MB source PNGs. */}
                <div className={cn("relative mb-6 aspect-[16/10] lg:hidden", frame)}>
                  <Image
                    src={p.image}
                    alt={`${p.name} website`}
                    fill
                    sizes="(max-width: 640px) 100vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Cursor-following preview (desktop pointer only) */}
      <motion.div
        aria-hidden
        style={{ left: x, top: y }}
        animate={{
          opacity: active !== null ? 1 : 0,
          scale: active !== null ? 1 : 0.92,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-none fixed z-40 hidden aspect-[16/10] w-[26rem] -translate-y-1/2 translate-x-10 lg:block",
          frame,
        )}
      >
        {/* All previews are stacked and crossfaded (like the intro) rather
            than swapping one element's src — that avoids next/image holding
            the previously-decoded image until the new one loads. Desktop
            only (parent is `hidden lg:block`), so mobile never fetches these. */}
        {projects.map((p, i) => (
          <Image
            key={p.image}
            src={p.image}
            alt=""
            fill
            sizes="416px"
            loading="eager"
            className={cn(
              "object-cover object-top transition-opacity duration-300",
              i === last ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </motion.div>
    </section>
  );
}
